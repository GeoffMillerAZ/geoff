---
title: "Kubernetes Platform Blueprint: From Zero to Production"
description: "A comprehensive guide to building production-ready Kubernetes platforms with security, observability, and developer experience in mind"
publishDate: 2024-01-10
updateDate: 2024-01-15
tags: ["kubernetes", "platform-engineering", "devops", "cloud-native", "security"]
category: "platform-engineering"
difficulty: "advanced"
estimatedReadTime: 25
prerequisites: ["kubernetes-basics", "container-fundamentals", "cloud-provider-knowledge"]
relatedGuides: ["eks-security-hardening", "prometheus-monitoring-setup"]
aiSummary: "Complete blueprint for building production Kubernetes platforms including cluster setup, security hardening, observability, and developer tooling"
toc: true
draft: false
featured: true
author: "Geoffrey Miller"
image: "/images/k8s-platform-blueprint.png"
imageAlt: "Kubernetes platform architecture diagram"
downloadable: true
---

# Kubernetes Platform Blueprint: From Zero to Production

This comprehensive guide provides a battle-tested blueprint for building production-ready Kubernetes platforms that prioritize security, observability, and developer experience.

## Architecture Overview

Our platform blueprint consists of several key layers:

1. **Infrastructure Layer**: Cloud provider resources, networking, storage
2. **Kubernetes Layer**: Cluster configuration, node management, cluster services  
3. **Platform Services Layer**: Ingress, service mesh, monitoring, logging
4. **Developer Experience Layer**: CI/CD, deployment tools, self-service capabilities
5. **Security Layer**: RBAC, admission controllers, policy enforcement

## Infrastructure Foundation

### Multi-Account Strategy

Implement account isolation for different environments:

```yaml
# AWS Account Structure
production:
  account_id: "111111111111"
  purpose: "Production workloads"
  
staging:
  account_id: "222222222222"
  purpose: "Pre-production testing"
  
development:
  account_id: "333333333333"
  purpose: "Development and experimentation"

shared-services:
  account_id: "444444444444"
  purpose: "Cross-cutting services, monitoring, logging"
```

### Network Architecture

Design secure, scalable networking:

```terraform
# VPC Configuration
resource "aws_vpc" "platform" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "platform-vpc"
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
  }
}

# Private subnets for worker nodes
resource "aws_subnet" "private" {
  count             = length(var.availability_zones)
  vpc_id            = aws_vpc.platform.id
  cidr_block        = "10.0.${count.index + 1}.0/24"
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "platform-private-${count.index + 1}"
    "kubernetes.io/cluster/${var.cluster_name}" = "owned"
    "kubernetes.io/role/internal-elb" = "1"
  }
}

# Public subnets for load balancers
resource "aws_subnet" "public" {
  count                   = length(var.availability_zones)
  vpc_id                  = aws_vpc.platform.id
  cidr_block              = "10.0.${count.index + 101}.0/24"
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "platform-public-${count.index + 1}"
    "kubernetes.io/cluster/${var.cluster_name}" = "owned"
    "kubernetes.io/role/elb" = "1"
  }
}
```

## Kubernetes Cluster Configuration

### EKS Cluster Setup

Configure a secure, scalable EKS cluster:

```terraform
resource "aws_eks_cluster" "platform" {
  name     = var.cluster_name
  role_arn = aws_iam_role.cluster.arn
  version  = "1.28"

  vpc_config {
    subnet_ids              = aws_subnet.private[*].id
    endpoint_private_access = true
    endpoint_public_access  = true
    public_access_cidrs     = var.allowed_cidr_blocks
  }

  encryption_config {
    provider {
      key_arn = aws_kms_key.eks.arn
    }
    resources = ["secrets"]
  }

  enabled_cluster_log_types = [
    "api",
    "audit",
    "authenticator",
    "controllerManager",
    "scheduler"
  ]

  depends_on = [
    aws_iam_role_policy_attachment.cluster_AmazonEKSClusterPolicy,
    aws_cloudwatch_log_group.cluster,
  ]
}
```

### Node Groups Configuration

Set up managed node groups with proper scaling:

```terraform
resource "aws_eks_node_group" "platform" {
  cluster_name    = aws_eks_cluster.platform.name
  node_group_name = "platform-nodes"
  node_role_arn   = aws_iam_role.node.arn
  subnet_ids      = aws_subnet.private[*].id

  capacity_type  = "ON_DEMAND"
  instance_types = ["m5.large", "m5.xlarge"]

  scaling_config {
    desired_size = 3
    max_size     = 10
    min_size     = 1
  }

  update_config {
    max_unavailable = 1
  }

  # Ensure proper taints for system components
  taint {
    key    = "CriticalAddonsOnly"
    value  = "true"
    effect = "NO_SCHEDULE"
  }

  depends_on = [
    aws_iam_role_policy_attachment.node_AmazonEKSWorkerNodePolicy,
    aws_iam_role_policy_attachment.node_AmazonEKS_CNI_Policy,
    aws_iam_role_policy_attachment.node_AmazonEC2ContainerRegistryReadOnly,
  ]
}
```

## Security Hardening

### Pod Security Standards

Implement Pod Security Standards:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
---
apiVersion: v1
kind: Namespace
metadata:
  name: development
  labels:
    pod-security.kubernetes.io/enforce: baseline
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

### RBAC Configuration

Create least-privilege RBAC policies:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: developer
rules:
- apiGroups: [""]
  resources: ["pods", "services", "configmaps", "secrets"]
  verbs: ["get", "list", "create", "update", "patch", "delete"]
- apiGroups: ["apps"]
  resources: ["deployments", "replicasets"]
  verbs: ["get", "list", "create", "update", "patch", "delete"]
- apiGroups: ["networking.k8s.io"]
  resources: ["ingresses"]
  verbs: ["get", "list", "create", "update", "patch", "delete"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  namespace: development
  name: developers
subjects:
- kind: Group
  name: developers
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: developer
  apiGroup: rbac.authorization.k8s.io
```

### Network Policies

Implement micro-segmentation:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080
```

## Observability Stack

### Prometheus Configuration

Deploy Prometheus with proper configuration:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: monitoring
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
      evaluation_interval: 15s
    
    rule_files:
      - "/etc/prometheus/rules/*.yml"
    
    scrape_configs:
    - job_name: 'kubernetes-apiservers'
      kubernetes_sd_configs:
      - role: endpoints
      scheme: https
      tls_config:
        ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      relabel_configs:
      - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
        action: keep
        regex: default;kubernetes;https
    
    - job_name: 'kubernetes-nodes'
      kubernetes_sd_configs:
      - role: node
      scheme: https
      tls_config:
        ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      relabel_configs:
      - action: labelmap
        regex: __meta_kubernetes_node_label_(.+)
      - target_label: __address__
        replacement: kubernetes.default.svc:443
      - source_labels: [__meta_kubernetes_node_name]
        regex: (.+)
        target_label: __metrics_path__
        replacement: /api/v1/nodes/${1}/proxy/metrics
```

### Grafana Dashboards

Essential dashboards for platform monitoring:

```json
{
  "dashboard": {
    "title": "Kubernetes Cluster Overview",
    "panels": [
      {
        "title": "Cluster CPU Usage",
        "type": "stat",
        "targets": [
          {
            "expr": "100 - (avg by (instance) (rate(node_cpu_seconds_total{mode=\"idle\"}[5m])) * 100)",
            "legendFormat": "CPU Usage %"
          }
        ]
      },
      {
        "title": "Memory Usage",
        "type": "stat",
        "targets": [
          {
            "expr": "(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100",
            "legendFormat": "Memory Usage %"
          }
        ]
      },
      {
        "title": "Pod Count by Namespace",
        "type": "bargauge",
        "targets": [
          {
            "expr": "sum by (namespace) (kube_pod_info)",
            "legendFormat": "{{namespace}}"
          }
        ]
      }
    ]
  }
}
```

## Developer Experience

### GitOps with ArgoCD

Configure ArgoCD for deployment automation:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cmd-params-cm
  namespace: argocd
data:
  server.insecure: "true"
  server.repo.server.timeout.seconds: "60"
  controller.status.processors: "20"
  controller.operation.processors: "20"
---
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: platform-services
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/company/k8s-platform-config
    targetRevision: HEAD
    path: clusters/production
  destination:
    server: https://kubernetes.default.svc
    namespace: platform
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

### Ingress Configuration

Set up ingress with automatic TLS:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: platform-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - api.platform.company.com
    secretName: platform-tls
  rules:
  - host: api.platform.company.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: platform-api
            port:
              number: 80
```

## Backup and Disaster Recovery

### Velero Configuration

Set up cluster backup with Velero:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: cloud-credentials
  namespace: velero
type: Opaque
data:
  cloud: <base64-encoded-credentials>
---
apiVersion: velero.io/v1
kind: BackupStorageLocation
metadata:
  name: default
  namespace: velero
spec:
  provider: aws
  objectStorage:
    bucket: platform-backups
    prefix: production
  config:
    region: us-west-2
---
apiVersion: velero.io/v1
kind: Schedule
metadata:
  name: daily-backup
  namespace: velero
spec:
  schedule: "0 2 * * *"
  template:
    includedNamespaces:
    - production
    - staging
    excludedResources:
    - events
    - events.events.k8s.io
    ttl: "720h0m0s"
```

## Cost Optimization

### Cluster Autoscaler

Configure automatic scaling:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-autoscaler
  namespace: kube-system
spec:
  template:
    spec:
      containers:
      - image: k8s.gcr.io/autoscaling/cluster-autoscaler:v1.28.0
        name: cluster-autoscaler
        command:
        - ./cluster-autoscaler
        - --v=4
        - --stderrthreshold=info
        - --cloud-provider=aws
        - --skip-nodes-with-local-storage=false
        - --expander=least-waste
        - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/platform-cluster
        - --balance-similar-node-groups
        - --skip-nodes-with-system-pods=false
        env:
        - name: AWS_REGION
          value: us-west-2
```

### Resource Quotas

Implement resource governance:

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: production
spec:
  hard:
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    limits.memory: 40Gi
    persistentvolumeclaims: "10"
---
apiVersion: v1
kind: LimitRange
metadata:
  name: mem-limit-range
  namespace: production
spec:
  limits:
  - default:
      memory: "512Mi"
      cpu: "500m"
    defaultRequest:
      memory: "256Mi"
      cpu: "250m"
    type: Container
```

## Testing and Validation

### Cluster Testing

Automated testing with Sonobuoy:

```bash
# Install Sonobuoy
curl -sSL "https://github.com/vmware-tanzu/sonobuoy/releases/download/v0.56.16/sonobuoy_0.56.16_linux_amd64.tar.gz" | tar -xzf -

# Run conformance tests
./sonobuoy run --mode=certified-conformance

# Check status
./sonobuoy status

# Retrieve results
./sonobuoy retrieve
```

### Security Scanning

Regular security assessments:

```bash
# Install kube-bench
kubectl apply -f https://raw.githubusercontent.com/aquasecurity/kube-bench/main/job.yaml

# Install kube-hunter
kubectl create -f https://raw.githubusercontent.com/aquasecurity/kube-hunter/main/job.yaml

# Install Falco for runtime security
helm repo add falcosecurity https://falcosecurity.github.io/charts
helm install falco falcosecurity/falco
```

## Maintenance and Updates

### Automated Updates

Configure automatic security updates:

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: node-security-updates
  namespace: kube-system
spec:
  schedule: "0 2 * * 0"  # Weekly on Sunday at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: updater
            image: amazon/aws-cli:latest
            command:
            - /bin/bash
            - -c
            args:
            - |
              # Update node groups with latest AMI
              aws eks update-nodegroup-version \
                --cluster-name $(CLUSTER_NAME) \
                --nodegroup-name $(NODEGROUP_NAME) \
                --force
          env:
          - name: CLUSTER_NAME
            value: "platform-cluster"
          - name: NODEGROUP_NAME
            value: "platform-nodes"
          restartPolicy: OnFailure
```

## Conclusion

This blueprint provides a solid foundation for building production-ready Kubernetes platforms. Key takeaways:

1. **Start with security** - implement Pod Security Standards and RBAC from day one
2. **Plan for scale** - use autoscaling and resource quotas appropriately
3. **Invest in observability** - comprehensive monitoring is essential
4. **Automate everything** - from deployments to security updates
5. **Test continuously** - regular conformance and security testing

Remember to customize this blueprint based on your specific requirements, compliance needs, and organizational constraints.

## Next Steps

1. **Implement service mesh** for advanced traffic management
2. **Add chaos engineering** with tools like Chaos Monkey
3. **Implement progressive delivery** with Flagger or Argo Rollouts
4. **Add multi-cluster management** with tools like Admiral or Liqo

---

*Download the complete Terraform configuration and Kubernetes manifests from our [GitHub repository](https://github.com/company/k8s-platform-blueprint).*