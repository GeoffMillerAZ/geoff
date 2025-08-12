#!/usr/bin/env bash
set -euo pipefail

# Base dir for certification icons
ROOT="src/assets/icons/certifications"

# Create directories
mkdir -p "$ROOT"/{aws,azure,cncf,docker,gcp,hashicorp,istio,kubernetes,linux,redhat,vmware,generic}

download() {
  local url="$1"
  local dest="$2"
  echo "Fetching $url -> $dest"
  curl -fL --retry 3 --retry-delay 1 -o "$dest" "$url"
}

# ---------- Vendor logos (SVG) ----------
echo "Downloading official vendor logos..."

# AWS
download "https://commons.wikimedia.org/wiki/Special:FilePath/Amazon_Web_Services_Logo.svg" "$ROOT/aws/aws.svg"

# Azure (square icon variant)
download "https://commons.wikimedia.org/wiki/Special:FilePath/Microsoft_Azure.svg" "$ROOT/azure/azure.svg"

# Google Cloud
download "https://commons.wikimedia.org/wiki/Special:FilePath/Google_Cloud_logo.svg" "$ROOT/gcp/gcp.svg"

# Docker
download "https://www.vectorlogo.zone/logos/docker/docker-icon.svg" "$ROOT/docker/docker.svg"

# HashiCorp
download "https://www.vectorlogo.zone/logos/hashicorp/hashicorp-icon.svg" "$ROOT/hashicorp/hashicorp.svg"

# Istio
download "https://commons.wikimedia.org/wiki/Special:FilePath/Istio-bluelogo-nobackground-unframed.svg" "$ROOT/istio/istio.svg"

# Linux (Tux)
download "https://commons.wikimedia.org/wiki/Special:FilePath/Tux.svg" "$ROOT/linux/linux.svg"

# Red Hat
download "https://www.vectorlogo.zone/logos/redhat/redhat-icon.svg" "$ROOT/redhat/redhat.svg"

# VMware (using alternative source)
download "https://raw.githubusercontent.com/gilbarbara/logos/master/logos/vmware.svg" "$ROOT/vmware/vmware.svg" || \
  echo "VMware icon failed, using fallback"

# ---------- CNCF artwork: Kubernetes icon + cert badges ----------
# Requires git to copy official square icons from the CNCF repo.
TMP_DIR="$(mktemp -d)"
cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT

echo "Cloning CNCF artwork repo for official badges..."
git -c advice.detachedHead=false clone --depth 1 https://github.com/cncf/artwork.git "$TMP_DIR/cncf-artwork"

# Kubernetes wheel icon (square)
echo "Looking for Kubernetes icon..."
K8S_ICON_SRC=$(find "$TMP_DIR/cncf-artwork" -type f -path "*/projects/kubernetes/icon/*/kubernetes-icon-*.svg" | head -n 1 || true)
if [[ -n "${K8S_ICON_SRC:-}" ]]; then
  cp "$K8S_ICON_SRC" "$ROOT/kubernetes/kubernetes.svg"
  echo "Added Kubernetes icon: $(basename "$K8S_ICON_SRC")"
else
  echo "WARN: Kubernetes icon not found in artwork repo. Trying alternative..."
  download "https://raw.githubusercontent.com/kubernetes/kubernetes/master/logo/logo.svg" "$ROOT/kubernetes/kubernetes.svg"
fi

# CNCF icon
CNCF_ICON_SRC=$(find "$TMP_DIR/cncf-artwork" -type f -path "*/cncf/icon/*/cncf-icon-*.svg" | head -n 1 || true)
if [[ -n "${CNCF_ICON_SRC:-}" ]]; then
  cp "$CNCF_ICON_SRC" "$ROOT/cncf/cncf.svg"
  echo "Added CNCF icon"
fi

# CKA, CKAD, CKS, KCNA badges (square icon variants)
copy_badge() {
  local pattern="$1"    # e.g., "*certified-kubernetes-administrator*icon*color.svg"
  local dest="$2"
  local src
  echo "Searching for $pattern..."
  src=$(find "$TMP_DIR/cncf-artwork" -type f -iname "$pattern" | head -n 1 || true)
  if [[ -n "${src:-}" ]]; then
    cp "$src" "$dest"
    echo "Added $(basename "$dest") from $(basename "$src")"
  else
    echo "WARN: Could not locate $pattern in CNCF artwork repo."
  fi
}

# The CNCF repo uses sensible names; these patterns match current structure.
echo "Copying CNCF certification badges..."
copy_badge "*cka*icon*color*.svg" "$ROOT/kubernetes/cka.svg"
copy_badge "*ckad*icon*color*.svg" "$ROOT/kubernetes/ckad.svg"
copy_badge "*cks*icon*color*.svg" "$ROOT/kubernetes/cks.svg"
copy_badge "*kcna*icon*color*.svg" "$ROOT/cncf/kcna.svg"

# Also try to get PNG versions for better compatibility
copy_badge "*cka*icon*color*.png" "$ROOT/kubernetes/cka.png"
copy_badge "*ckad*icon*color*.png" "$ROOT/kubernetes/ckad.png"
copy_badge "*cks*icon*color*.png" "$ROOT/kubernetes/cks.png"
copy_badge "*kcna*icon*color*.png" "$ROOT/cncf/kcna.png"

# ---------- Generic certification icon ----------
echo "Creating generic certification icon..."
cat > "$ROOT/generic/certification.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm-2 16l-4-4 1.41-1.41L10 15.17l6.59-6.59L18 10l-8 8z"/>
</svg>
EOF

# ---------- Terraform specific icon ----------
echo "Fetching Terraform icon..."
download "https://www.vectorlogo.zone/logos/terraformio/terraformio-icon.svg" "$ROOT/hashicorp/terraform.svg"

# ---------- Certification badges from Credly (manual step) ----------
cat << 'EOF'

================================================================================
IMPORTANT: Certification Badge Notes
================================================================================

Many certification badges are only available through Credly after you've earned
them. The script has downloaded vendor logos, but for actual certification 
badges, you'll need to:

1. Log into your Credly account
2. Find your certification badges
3. Download the PNG files (usually 680x680)
4. Place them in the appropriate directories:
   - AWS certs: src/assets/icons/certifications/aws/
   - Azure certs: src/assets/icons/certifications/azure/
   - GCP certs: src/assets/icons/certifications/gcp/
   - etc.

Example Credly URLs (replace <uuid> with actual ID):
- AWS: https://images.credly.com/size/680x680/images/<uuid>/aws-certified-*.png
- Azure: https://images.credly.com/size/680x680/images/<uuid>/microsoft-certified-*.png
- GCP: https://images.credly.com/size/680x680/images/<uuid>/google-cloud-certified-*.png

For now, the vendor logos will be used as fallbacks.
================================================================================

EOF

echo "Done! Official vendor icons and CNCF badges have been downloaded."
echo "Check the directories in $ROOT for the new icons."