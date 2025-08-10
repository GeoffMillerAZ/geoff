---
title: "Production Kubernetes Security: Best Practices & Implementation Guide"
description: "Comprehensive security hardening guide for production Kubernetes clusters, covering authentication, authorization, network security, workload isolation, and compliance frameworks."
publishDate: 2024-02-05
updateDate: 2024-02-05
tags: ["kubernetes", "security", "production", "best-practices", "compliance"]
category: "best-practices"
difficulty: "advanced"
estimatedReadTime: 18
prerequisites: ["Kubernetes administration experience", "Understanding of networking concepts", "Basic security knowledge"]
aiSummary: "A detailed guide for securing Kubernetes in production environments, covering all layers from cluster hardening to workload security, with practical implementation examples and compliance considerations."
toc: true
draft: false
featured: false
author: "Geoffrey Miller"
downloadable: true
---

# Production Kubernetes Security: Best Practices & Implementation Guide

Kubernetes security is not a single technology or configuration—it's a comprehensive approach that spans multiple layers and requires ongoing attention. This guide provides battle-tested practices for securing Kubernetes in production environments, based on real-world implementations and industry standards.

## Security Architecture Overview

### Defense in Depth Strategy

```
┌─────────────────────────────────────────────────────────────┐
│  Application Security (Code, Dependencies, Secrets)        │
├─────────────────────────────────────────────────────────────┤
│  Workload Security (Pods, Containers, Runtime)             │
├─────────────────────────────────────────────────────────────┤
│  Platform Security (RBAC, Admission Controllers, Policies) │
├─────────────────────────────────────────────────────────────┤
│  Network Security (Segmentation, Encryption, Firewalls)    │
├─────────────────────────────────────────────────────────────┤
│  Infrastructure Security (Nodes, OS, Hardware)             │
└─────────────────────────────────────────────────────────────┘
```

### Security Principles
1. **Zero Trust**: Never trust, always verify
2. **Least Privilege**: Minimal permissions required for function
3. **Defense in Depth**: Multiple security layers
4. **Immutable Infrastructure**: Treat infrastructure as code
5. **Continuous Monitoring**: Real-time threat detection

## Cluster Hardening

### Control Plane Security

**API Server Configuration**
```yaml
# /etc/kubernetes/manifests/kube-apiserver.yaml
apiVersion: v1
kind: Pod
metadata:
  name: kube-apiserver
spec:
  containers:
  - name: kube-apiserver
    command:
    - kube-apiserver
    # Authentication and Authorization
    - --anonymous-auth=false
    - --basic-auth-file=
    - --token-auth-file=
    - --authorization-mode=Node,RBAC
    - --enable-admission-plugins=NamespaceLifecycle,LimitRanger,ServiceAccount,DefaultStorageClass,ResourceQuota,MutatingAdmissionWebhook,ValidatingAdmissionWebhook,PodSecurityPolicy
    
    # Encryption and TLS
    - --tls-cert-file=/etc/kubernetes/pki/apiserver.crt
    - --tls-private-key-file=/etc/kubernetes/pki/apiserver.key
    - --encryption-provider-config=/etc/kubernetes/encryption-config.yaml
    - --tls-cipher-suites=TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
    
    # Auditing
    - --audit-log-path=/var/log/audit.log
    - --audit-log-maxage=30
    - --audit-log-maxbackup=3
    - --audit-log-maxsize=100
    - --audit-policy-file=/etc/kubernetes/audit-policy.yaml
    
    # Security features
    - --enable-bootstrap-token-auth=true
    - --kubelet-certificate-authority=/etc/kubernetes/pki/ca.crt
    - --kubelet-client-certificate=/etc/kubernetes/pki/apiserver-kubelet-client.crt
    - --kubelet-client-key=/etc/kubernetes/pki/apiserver-kubelet-client.key
```

**Etcd Security Configuration**
```yaml
# /etc/kubernetes/manifests/etcd.yaml
spec:
  containers:
  - name: etcd
    command:
    - etcd
    # Client communication
    - --cert-file=/etc/kubernetes/pki/etcd/server.crt
    - --key-file=/etc/kubernetes/pki/etcd/server.key
    - --trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
    - --client-cert-auth=true
    
    # Peer communication
    - --peer-cert-file=/etc/kubernetes/pki/etcd/peer.crt
    - --peer-key-file=/etc/kubernetes/pki/etcd/peer.key
    - --peer-trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
    - --peer-client-cert-auth=true
```

### Node Security

**Kubelet Configuration**
```yaml
# /var/lib/kubelet/config.yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
authentication:
  anonymous:
    enabled: false
  webhook:
    enabled: true
  x509:
    clientCAFile: /etc/kubernetes/pki/ca.crt
authorization:
  mode: Webhook
tlsCertFile: /var/lib/kubelet/pki/kubelet.crt
tlsPrivateKeyFile: /var/lib/kubelet/pki/kubelet.key
rotateCertificates: true
serverTLSBootstrap: true
readOnlyPort: 0
protectKernelDefaults: true
makeIPTablesUtilChains: true
eventRecordQPS: 0
```

**Node OS Hardening**
```bash
#!/bin/bash
# Node hardening script

# Disable unnecessary services
systemctl disable avahi-daemon
systemctl disable cups
systemctl disable bluetooth

# Configure kernel parameters
cat >> /etc/sysctl.d/99-kubernetes-security.conf << EOF
# Network security
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.default.send_redirects = 0
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv4.conf.all.secure_redirects = 0
net.ipv4.conf.default.secure_redirects = 0
net.ipv4.ip_forward = 1
net.bridge.bridge-nf-call-iptables = 1
net.bridge.bridge-nf-call-ip6tables = 1

# Memory protection
kernel.randomize_va_space = 2
kernel.exec-shield = 1
kernel.kptr_restrict = 2
EOF

sysctl --system

# Configure audit logging
cat > /etc/audit/audit.rules << EOF
# Monitor system calls
-a always,exit -F arch=b64 -S execve -k exec
-a always,exit -F arch=b32 -S execve -k exec

# Monitor file access
-w /etc/kubernetes/ -p wa -k kubernetes-config
-w /var/lib/kubelet/ -p wa -k kubelet-config
-w /etc/systemd/system/kubelet.service -p wa -k kubelet-service

# Monitor network
-a always,exit -F arch=b64 -S socket -k network
-a always,exit -F arch=b32 -S socket -k network
EOF

systemctl enable auditd
systemctl start auditd
```

## Identity and Access Management

### RBAC Implementation

**Namespace-based RBAC**
```yaml
# namespace-rbac.yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: production
  name: production-developer
rules:
- apiGroups: [""]
  resources: ["pods", "services", "configmaps", "secrets"]
  verbs: ["get", "list", "create", "update", "patch", "delete"]
- apiGroups: ["apps"]
  resources: ["deployments", "replicasets"]
  verbs: ["get", "list", "create", "update", "patch", "delete"]
- apiGroups: [""]
  resources: ["pods/log", "pods/exec"]
  verbs: ["get", "list"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: production-developers
  namespace: production
subjects:
- kind: User
  name: developer@company.com
  apiGroup: rbac.authorization.k8s.io
- kind: Group
  name: production-team
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: production-developer
  apiGroup: rbac.authorization.k8s.io
```

**Service Account Management**
```yaml
# service-account-security.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: application-service-account
  namespace: production
automountServiceAccountToken: false

---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: production
  name: application-role
rules:
- apiGroups: [""]
  resources: ["configmaps"]
  verbs: ["get", "list"]
  resourceNames: ["app-config"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: application-binding
  namespace: production
subjects:
- kind: ServiceAccount
  name: application-service-account
  namespace: production
roleRef:
  kind: Role
  name: application-role
  apiGroup: rbac.authorization.k8s.io
```

### External Identity Integration

**OIDC Configuration**
```yaml
# api-server-oidc.yaml
apiVersion: v1
kind: Pod
metadata:
  name: kube-apiserver
spec:
  containers:
  - name: kube-apiserver
    command:
    - kube-apiserver
    - --oidc-issuer-url=https://company.okta.com
    - --oidc-client-id=kubernetes-client
    - --oidc-username-claim=email
    - --oidc-groups-claim=groups
    - --oidc-ca-file=/etc/kubernetes/pki/oidc-ca.crt
```

## Network Security

### Network Policies

**Default Deny Policy**
```yaml
# default-deny.yaml
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
```

**Application-Specific Policies**
```yaml
# web-app-network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: web-app-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: web-app
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-system
    ports:
    - protocol: TCP
      port: 8080
  - from:
    - podSelector:
        matchLabels:
          app: api-gateway
    ports:
    - protocol: TCP
      port: 8080
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: database
    ports:
    - protocol: TCP
      port: 5432
  - to:
    - namespaceSelector:
        matchLabels:
          name: kube-system
      podSelector:
        matchLabels:
          k8s-app: kube-dns
    ports:
    - protocol: UDP
      port: 53
```

### Service Mesh Security

**Istio mTLS Configuration**
```yaml
# istio-mtls.yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: production
spec:
  mtls:
    mode: STRICT

---
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: web-app-authz
  namespace: production
spec:
  selector:
    matchLabels:
      app: web-app
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/production/sa/api-gateway"]
  - to:
    - operation:
        methods: ["GET", "POST"]
        paths: ["/api/*"]
```

## Workload Security

### Pod Security Standards

**Pod Security Policy (Deprecated) Alternative**
```yaml
# pod-security-standards.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

**Secure Pod Configuration**
```yaml
# secure-pod.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: secure-app
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: secure-app
  template:
    metadata:
      labels:
        app: secure-app
    spec:
      serviceAccountName: application-service-account
      automountServiceAccountToken: false
      securityContext:
        runAsNonRoot: true
        runAsUser: 10001
        runAsGroup: 10001
        fsGroup: 10001
        seccompProfile:
          type: RuntimeDefault
      containers:
      - name: app
        image: myapp:v1.2.3
        securityContext:
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          runAsNonRoot: true
          runAsUser: 10001
          runAsGroup: 10001
          capabilities:
            drop:
            - ALL
          seccompProfile:
            type: RuntimeDefault
        ports:
        - containerPort: 8080
          protocol: TCP
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        volumeMounts:
        - name: tmp
          mountPath: /tmp
        - name: cache
          mountPath: /app/cache
      volumes:
      - name: tmp
        emptyDir: {}
      - name: cache
        emptyDir: {}
```

### Container Image Security

**Secure Dockerfile Example**
```dockerfile
# Use specific, minimal base image
FROM alpine:3.18.4

# Create non-root user
RUN addgroup -g 10001 appgroup && \
    adduser -D -u 10001 -G appgroup appuser

# Install only necessary packages
RUN apk add --no-cache ca-certificates tzdata && \
    rm -rf /var/cache/apk/*

# Copy application
COPY --chown=appuser:appgroup app /usr/local/bin/app
RUN chmod +x /usr/local/bin/app

# Use non-root user
USER 10001:10001

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Run application
ENTRYPOINT ["/usr/local/bin/app"]
```

**Image Scanning Integration**
```yaml
# .github/workflows/security-scan.yml
name: Container Security Scan
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Build Image
      run: docker build -t myapp:${{ github.sha }} .
    
    - name: Trivy Vulnerability Scan
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: myapp:${{ github.sha }}
        format: 'sarif'
        output: 'trivy-results.sarif'
    
    - name: Upload Trivy Results
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: 'trivy-results.sarif'
    
    - name: Cosign Sign Image
      run: |
        cosign sign --key cosign.key myapp:${{ github.sha }}
      env:
        COSIGN_PASSWORD: ${{ secrets.COSIGN_PASSWORD }}
```

## Secrets Management

### External Secrets Integration

**External Secrets Operator Configuration**
```yaml
# external-secrets.yaml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: vault-backend
  namespace: production
spec:
  provider:
    vault:
      server: "https://vault.company.com"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes"
          role: "production-role"
          serviceAccountRef:
            name: "external-secrets-sa"

---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: app-secrets
  namespace: production
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: vault-backend
    kind: SecretStore
  target:
    name: app-secrets
    creationPolicy: Owner
  data:
  - secretKey: database-password
    remoteRef:
      key: production/database
      property: password
  - secretKey: api-key
    remoteRef:
      key: production/external-api
      property: key
```

### Secret Rotation

**Automatic Secret Rotation**
```yaml
# secret-rotation.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: rotate-secrets
  namespace: production
spec:
  schedule: "0 2 * * 0"  # Weekly at 2 AM Sunday
  jobTemplate:
    spec:
      template:
        spec:
          serviceAccountName: secret-rotator
          containers:
          - name: rotator
            image: secret-rotator:v1.0.0
            command:
            - /bin/sh
            - -c
            - |
              # Rotate database password
              NEW_PASSWORD=$(openssl rand -base64 32)
              vault kv put secret/production/database password="$NEW_PASSWORD"
              
              # Update database with new password
              kubectl patch secret app-secrets -p '{"data":{"database-password":"'$(echo -n "$NEW_PASSWORD" | base64)'"}}'
              
              # Restart pods to pick up new secret
              kubectl rollout restart deployment/web-app
            env:
            - name: VAULT_ADDR
              value: "https://vault.company.com"
            - name: VAULT_TOKEN
              valueFrom:
                secretKeyRef:
                  name: vault-token
                  key: token
          restartPolicy: OnFailure
```

## Monitoring and Incident Response

### Security Monitoring

**Falco Rules for Runtime Security**
```yaml
# falco-rules.yaml
- rule: Suspicious Network Activity
  desc: Detect suspicious network connections
  condition: >
    spawned_process and
    proc.name in (nc, ncat, netcat) and
    not container.image.repository in (allowed_images)
  output: >
    Suspicious network activity detected (user=%user.name container=%container.name
    image=%container.image.repository:%container.image.tag command=%proc.cmdline)
  priority: WARNING

- rule: Privileged Container Spawned
  desc: Detect privileged container
  condition: >
    container.privileged=true and
    not container.image.repository in (system_images)
  output: >
    Privileged container spawned (user=%user.name container=%container.name
    image=%container.image.repository:%container.image.tag)
  priority: ERROR

- rule: Sensitive File Access
  desc: Detect access to sensitive files
  condition: >
    open_read and
    fd.name in (/etc/passwd, /etc/shadow, /etc/hosts) and
    not proc.name in (allowed_processes)
  output: >
    Sensitive file accessed (user=%user.name container=%container.name
    file=%fd.name process=%proc.name)
  priority: WARNING
```

**Security Metrics Collection**
```yaml
# security-monitoring.yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: security-metrics
  namespace: monitoring
spec:
  selector:
    matchLabels:
      app: security-exporter
  endpoints:
  - port: metrics
    path: /metrics
    interval: 30s

---
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: security-alerts
  namespace: monitoring
spec:
  groups:
  - name: security.rules
    rules:
    - alert: PodSecurityViolation
      expr: increase(falco_events_total[5m]) > 0
      for: 0m
      labels:
        severity: warning
      annotations:
        summary: "Security violation detected"
        description: "Falco detected {{ $value }} security violations in the last 5 minutes"
    
    - alert: HighFailedLogins
      expr: rate(kubernetes_audit_failed_logins[5m]) > 0.1
      for: 2m
      labels:
        severity: critical
      annotations:
        summary: "High rate of failed login attempts"
        description: "{{ $value }} failed login attempts per second"
```

### Incident Response Playbook

**Security Incident Response**
```bash
#!/bin/bash
# security-incident-response.sh

# Step 1: Isolate affected workloads
isolate_workload() {
    local namespace=$1
    local pod_name=$2
    
    echo "Isolating workload: $namespace/$pod_name"
    
    # Create network policy to block all traffic
    kubectl apply -f - <<EOF
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: isolate-$pod_name
  namespace: $namespace
spec:
  podSelector:
    matchLabels:
      kubernetes.io/pod-name: $pod_name
  policyTypes:
  - Ingress
  - Egress
EOF
}

# Step 2: Collect forensic data
collect_forensics() {
    local namespace=$1
    local pod_name=$2
    local output_dir="/tmp/forensics-$(date +%Y%m%d-%H%M%S)"
    
    mkdir -p "$output_dir"
    
    # Pod details
    kubectl describe pod "$pod_name" -n "$namespace" > "$output_dir/pod-describe.txt"
    kubectl get pod "$pod_name" -n "$namespace" -o yaml > "$output_dir/pod-manifest.yaml"
    
    # Logs
    kubectl logs "$pod_name" -n "$namespace" --previous > "$output_dir/previous-logs.txt" || true
    kubectl logs "$pod_name" -n "$namespace" > "$output_dir/current-logs.txt"
    
    # Events
    kubectl get events -n "$namespace" --field-selector involvedObject.name="$pod_name" > "$output_dir/events.txt"
    
    # Network info
    kubectl exec "$pod_name" -n "$namespace" -- netstat -tuln > "$output_dir/network-connections.txt" || true
    kubectl exec "$pod_name" -n "$namespace" -- ps aux > "$output_dir/processes.txt" || true
    
    echo "Forensic data collected in: $output_dir"
}

# Step 3: Notification
send_alert() {
    local message=$1
    
    # Send to Slack
    curl -X POST -H 'Content-type: application/json' \
        --data '{"text":"🚨 Security Incident: '"$message"'"}' \
        "$SLACK_WEBHOOK_URL"
    
    # Send to PagerDuty
    curl -X POST 'https://events.pagerduty.com/v2/enqueue' \
        -H 'Content-Type: application/json' \
        -d '{
            "routing_key": "'"$PAGERDUTY_ROUTING_KEY"'",
            "event_action": "trigger",
            "payload": {
                "summary": "Kubernetes Security Incident",
                "source": "kubernetes-security",
                "severity": "critical",
                "custom_details": {
                    "message": "'"$message"'"
                }
            }
        }'
}

# Main incident response workflow
main() {
    local namespace=${1:-default}
    local pod_name=${2:-}
    
    if [[ -z "$pod_name" ]]; then
        echo "Usage: $0 <namespace> <pod_name>"
        exit 1
    fi
    
    echo "Starting security incident response for $namespace/$pod_name"
    
    # Execute response steps
    isolate_workload "$namespace" "$pod_name"
    collect_forensics "$namespace" "$pod_name"
    send_alert "Security incident detected in $namespace/$pod_name. Workload isolated and forensics collected."
    
    echo "Incident response completed. Review forensic data and take further action as needed."
}

main "$@"
```

## Compliance and Governance

### Policy as Code

**Open Policy Agent (OPA) Gatekeeper**
```yaml
# opa-constraint-template.yaml
apiVersion: templates.gatekeeper.sh/v1beta1
kind: ConstraintTemplate
metadata:
  name: k8srequiredsecuritycontext
spec:
  crd:
    spec:
      names:
        kind: K8sRequiredSecurityContext
      validation:
        properties:
          runAsNonRoot:
            type: boolean
          readOnlyRootFilesystem:
            type: boolean
          allowPrivilegeEscalation:
            type: boolean
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8srequiredsecuritycontext
        
        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          not container.securityContext.runAsNonRoot == true
          msg := "Container must run as non-root user"
        }
        
        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          not container.securityContext.readOnlyRootFilesystem == true
          msg := "Container must have read-only root filesystem"
        }
        
        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          not container.securityContext.allowPrivilegeEscalation == false
          msg := "Container must not allow privilege escalation"
        }

---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sRequiredSecurityContext
metadata:
  name: must-have-security-context
spec:
  match:
    kinds:
      - apiGroups: ["apps"]
        kinds: ["Deployment"]
    namespaces: ["production", "staging"]
  parameters:
    runAsNonRoot: true
    readOnlyRootFilesystem: true
    allowPrivilegeEscalation: false
```

### Compliance Reporting

**CIS Kubernetes Benchmark Automation**
```bash
#!/bin/bash
# cis-kubernetes-benchmark.sh

# Run kube-bench for CIS compliance
run_kube_bench() {
    echo "Running CIS Kubernetes Benchmark..."
    
    kubectl apply -f - <<EOF
apiVersion: batch/v1
kind: Job
metadata:
  name: kube-bench-$(date +%s)
  namespace: kube-system
spec:
  template:
    spec:
      hostPID: true
      nodeSelector:
        kubernetes.io/os: linux
      tolerations:
      - key: node-role.kubernetes.io/master
        operator: Exists
        effect: NoSchedule
      containers:
      - name: kube-bench
        image: aquasec/kube-bench:latest
        command: ["kube-bench"]
        args: ["--json"]
        volumeMounts:
        - name: var-lib-etcd
          mountPath: /var/lib/etcd
          readOnly: true
        - name: var-lib-kubelet
          mountPath: /var/lib/kubelet
          readOnly: true
        - name: etc-kubernetes
          mountPath: /etc/kubernetes
          readOnly: true
        - name: usr-bin
          mountPath: /usr/local/mount-from-host/bin
          readOnly: true
      restartPolicy: Never
      volumes:
      - name: var-lib-etcd
        hostPath:
          path: "/var/lib/etcd"
      - name: var-lib-kubelet
        hostPath:
          path: "/var/lib/kubelet"
      - name: etc-kubernetes
        hostPath:
          path: "/etc/kubernetes"
      - name: usr-bin
        hostPath:
          path: "/usr/bin"
EOF
    
    # Wait for job to complete and get results
    kubectl wait --for=condition=complete job/kube-bench-* -n kube-system --timeout=300s
    kubectl logs -l job-name=kube-bench-* -n kube-system > cis-benchmark-results.json
    
    # Clean up
    kubectl delete job -l job-name=kube-bench-* -n kube-system
}

# Generate compliance report
generate_compliance_report() {
    local report_date=$(date +%Y-%m-%d)
    local report_file="compliance-report-$report_date.html"
    
    cat > "$report_file" <<EOF
<!DOCTYPE html>
<html>
<head>
    <title>Kubernetes Security Compliance Report - $report_date</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .pass { color: green; }
        .fail { color: red; }
        .warn { color: orange; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>Kubernetes Security Compliance Report</h1>
    <p>Report Date: $report_date</p>
    <p>Cluster: $(kubectl config current-context)</p>
    
    <h2>CIS Kubernetes Benchmark Results</h2>
    <div id="cis-results">
        <!-- CIS results will be inserted here -->
    </div>
    
    <h2>Security Policy Violations</h2>
    <div id="policy-violations">
        <!-- Policy violations will be inserted here -->
    </div>
</body>
</html>
EOF
    
    echo "Compliance report generated: $report_file"
}

main() {
    run_kube_bench
    generate_compliance_report
}

main "$@"
```

## Conclusion

Kubernetes security is an ongoing journey that requires attention across multiple layers and continuous improvement. This guide provides a comprehensive foundation, but security practices must evolve with your threat landscape and organizational needs.

Key takeaways:
- **Start with the fundamentals**: Secure cluster configuration and RBAC
- **Implement defense in depth**: Multiple security layers provide better protection
- **Automate security practices**: Manual processes don't scale and are error-prone
- **Monitor continuously**: Real-time detection and response are crucial
- **Stay current**: Security is an ongoing process, not a one-time implementation

Remember that security is not just about technology—it requires organizational commitment, proper training, and a culture that values security as an enabler of business objectives, not an impediment to development velocity.