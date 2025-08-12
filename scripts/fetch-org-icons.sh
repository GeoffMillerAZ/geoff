#!/usr/bin/env bash
set -Eeuo pipefail

BASE="src/assets/icons/organizations"

# map of "slug|filename|url-or-inline"
readarray -t ITEMS <<'EOF'
silicon-valley-bank|svb.svg|INLINE_SVB
first-citizens-bank|fcb.svg|INLINE_FCB
best-buy|best-buy.svg|INLINE_BESTBUY
geek-squad|geek-squad.svg|INLINE_GEEKSQUAD
early-warning|early-warning.svg|INLINE_EWS
zelle|zelle.svg|INLINE_ZELLE
northern-illinois-university|niu.svg|INLINE_NIU
bank-of-america|bank-of-america.svg|INLINE_BOA
state-of-arizona|arizona-flag.svg|INLINE_ARIZONA
ownzones|ownzones.svg|INLINE_OWNZONES
ncr|ncr.svg|INLINE_NCR
valley-of-the-sun|vots.svg|INLINE_VOTS
thinkvine|thinkvine.svg|INLINE_THINKVINE
j-curve-technologies|jcurve.svg|INLINE_JCURVE
smarthealth-phoenix|smarthealth.svg|INLINE_SMARTHEALTH
arizona-doa|arizona-doa.svg|INLINE_ADOA
arizona-dema|arizona-dema.svg|INLINE_AZDEMA
universal-technical-institute|uti.svg|INLINE_UTI
repay|repay.svg|INLINE_REPAY
generic-company|generic-company.svg|INLINE_GENERIC_COMPANY
generic-tech-support|generic-tech-support.svg|INLINE_GENERIC_SUPPORT
generic-bank|generic-bank.svg|INLINE_GENERIC_BANK
generic-education|generic-education.svg|INLINE_GENERIC_EDUCATION
EOF

mkdir -p "$BASE"

download_file() {
  local url="$1" out="$2"
  echo "Fetching $url -> $out"
  curl -fL --retry 3 --connect-timeout 10 --max-time 60 -o "$out" "$url"
}

write_inline_svg() {
  local key="$1" out="$2"
  case "$key" in
    INLINE_SVB)
      # Silicon Valley Bank placeholder
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#0051A5"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, Arial" font-size="140" fill="#ffffff" font-weight="700">SVB</text>
  <path d="M96 340 L256 300 L416 340" stroke="#ffffff" stroke-width="4" fill="none" opacity="0.5"/>
</svg>
SVG
      ;;
    INLINE_BESTBUY)
      # Best Buy placeholder
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#0046BE"/>
  <rect x="96" y="160" width="320" height="192" rx="20" fill="#FFF200"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, Arial" font-size="72" fill="#0046BE" font-weight="900">BEST BUY</text>
</svg>
SVG
      ;;
    INLINE_GEEKSQUAD)
      # Geek Squad placeholder
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#000000"/>
  <circle cx="256" cy="256" r="180" fill="#FF6600" stroke="#ffffff" stroke-width="8"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, Arial" font-size="48" fill="#ffffff" font-weight="700">GEEK SQUAD</text>
</svg>
SVG
      ;;
    INLINE_FCB)
      # First Citizens Bank placeholder
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#004B87"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, Arial" font-size="140" fill="#ffffff" font-weight="700">FCB</text>
  <rect x="96" y="320" width="320" height="4" fill="#ffffff" opacity="0.5"/>
</svg>
SVG
      ;;
    INLINE_EWS)
      # Early Warning Services placeholder
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#005EB8"/>
  <circle cx="256" cy="200" r="80" fill="#ffffff" opacity="0.9"/>
  <path d="M176 200 L256 120 L336 200 L256 280 Z" fill="#005EB8"/>
  <text x="50%" y="75%" text-anchor="middle" font-family="system-ui, Arial" font-size="48" fill="#ffffff" font-weight="700">EARLY WARNING</text>
</svg>
SVG
      ;;
    INLINE_OWNZONES)
      # OWNZONES/Ateliere placeholder
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#1a1a2e"/>
  <circle cx="256" cy="256" r="160" fill="none" stroke="#eab308" stroke-width="8"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, Arial" font-size="60" fill="#eab308" font-weight="700">OWNZONES</text>
</svg>
SVG
      ;;
    INLINE_NCR)
      # NCR Corporation placeholder
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#62B532"/>
  <text x="50%" y="54%" text-anchor="middle" font-family="system-ui, Arial" font-size="160" fill="#ffffff" font-weight="800">NCR</text>
</svg>
SVG
      ;;
    INLINE_VOTS)
      # Valley of the Sun placeholder
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FDB813"/>
      <stop offset="1" stop-color="#F37021"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="#8B4513"/>
  <circle cx="256" cy="200" r="80" fill="url(#sun)"/>
  <path d="M96 300 L256 240 L416 300 L416 400 L96 400 Z" fill="#D2691E" opacity="0.7"/>
  <text x="50%" y="75%" text-anchor="middle" font-family="system-ui, Arial" font-size="48" fill="#ffffff" font-weight="600">VOTS</text>
</svg>
SVG
      ;;
    INLINE_AZDEMA)
      # Arizona DEMA placeholder
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#BF0A30"/>
  <rect x="0" y="0" width="512" height="256" fill="#002868"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, Arial" font-size="100" fill="#FFB300" font-weight="700">AZDEMA</text>
</svg>
SVG
      ;;
    INLINE_THINKVINE)
      # Simple neutral TV monogram in a circle, 1:1
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#0b132b"/>
  <circle cx="256" cy="256" r="200" fill="#1c2541"/>
  <path d="M140 220h232v40H296v132h-40V260H140z" fill="#5bc0eb"/>
  <path d="M310 352l62-132h38l-62 132h-38z" fill="#fde74c"/>
</svg>
SVG
      ;;
    INLINE_JCURVE)
      # J-curve sparkline tile
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="64" ry="64" fill="#0f172a"/>
  <path d="M96 128h48v176c0 58 44 88 100 88 47 0 84-18 120-58l34 30c-44 50-98 78-158 78-96 0-144-56-144-138V128z" fill="#22d3ee"/>
</svg>
SVG
      ;;
    INLINE_SMARTHEALTH)
      # Health cross with SH monogram
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#0b3d2e"/>
  <g transform="translate(64,64)">
    <rect x="120" y="0" width="144" height="144" fill="#34d399"/>
    <rect x="120" y="240" width="144" height="144" fill="#34d399"/>
    <rect x="0" y="120" width="144" height="144" fill="#34d399"/>
    <rect x="240" y="120" width="144" height="144" fill="#34d399"/>
  </g>
  <text x="256" y="282" text-anchor="middle" font-family="system-ui, Arial" font-size="124" fill="#083a2a" font-weight="700">SH</text>
</svg>
SVG
      ;;
    INLINE_ADOA)
      # ADOA neutral initials tile using state colors
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="az" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#002868"/>
      <stop offset="1" stop-color="#bf0a30"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="40" ry="40" fill="url(#az)"/>
  <text x="50%" y="56%" text-anchor="middle" font-family="system-ui, Arial" font-size="180" fill="#ffb300" font-weight="800">ADOA</text>
</svg>
SVG
      ;;
    INLINE_UTI)
      # Neutral UTI tile (not official branding)
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#111827"/>
  <path d="M96 96h96v256c0 18-14 32-32 32h-32c-18 0-32-14-32-32V96z" fill="#ef4444"/>
  <path d="M224 96h192v64H320v256h-64V160h-32z" fill="#3b82f6"/>
  <text x="256" y="470" text-anchor="middle" font-family="system-ui, Arial" font-size="72" fill="#e5e7eb" font-weight="700">UTI</text>
</svg>
SVG
      ;;
    INLINE_REPAY)
      # REPAY placeholder wordmark tile
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#062b21"/>
  <text x="50%" y="54%" text-anchor="middle" font-family="system-ui, Arial" font-size="140" fill="#34d399" font-weight="800">REPAY</text>
</svg>
SVG
      ;;
    INLINE_GENERIC_COMPANY)
      # Generic company building icon
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#1f2937"/>
  <g transform="scale(16,16)">
    <path d="M6 22V8a2 2 0 0 1 2-2h5V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2h5a2 2 0 0 1 2 2v14h-6v-4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v4H6zm4-12h2v2h-2v-2zm0 4h2v2h-2v-2zm10-4h2v2h-2v-2zm0 4h2v2h-2v-2zm-6-8h4v2h-4V6z" fill="#e5e7eb"/>
  </g>
</svg>
SVG
      ;;
    INLINE_GENERIC_SUPPORT)
      # Generic headset support icon
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#0b132b"/>
  <g transform="scale(16,16)">
    <path d="M16 2a10 10 0 0 0-10 10v5a3 3 0 0 0 3 3h3V12H9a7 7 0 0 1 14 0h-3v8h3a3 3 0 0 0 3-3v-5A10 10 0 0 0 16 2z" fill="#5bc0eb"/>
    <rect x="13" y="21" width="6" height="3" rx="1" fill="#fde74c"/>
  </g>
</svg>
SVG
      ;;
    INLINE_GENERIC_BANK)
      # Generic bank/financial institution icon
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#1e3a8a"/>
  <g transform="translate(256,256)">
    <path d="M-160 -120 L0 -180 L160 -120 L160 -80 L-160 -80 Z" fill="#dbeafe"/>
    <rect x="-140" y="-80" width="40" height="120" fill="#dbeafe"/>
    <rect x="-60" y="-80" width="40" height="120" fill="#dbeafe"/>
    <rect x="20" y="-80" width="40" height="120" fill="#dbeafe"/>
    <rect x="100" y="-80" width="40" height="120" fill="#dbeafe"/>
    <rect x="-160" y="40" width="320" height="40" fill="#dbeafe"/>
  </g>
</svg>
SVG
      ;;
    INLINE_GENERIC_EDUCATION)
      # Generic education/university icon
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#7c3aed"/>
  <g transform="translate(256,200)">
    <path d="M-180 -40 L0 -100 L180 -40 L180 20 L0 -40 L-180 20 Z" fill="#f3e8ff"/>
    <path d="M0 -40 L0 120" stroke="#f3e8ff" stroke-width="20" fill="none"/>
    <circle cx="0" cy="140" r="30" fill="#f3e8ff"/>
  </g>
  <text x="50%" y="80%" text-anchor="middle" font-family="system-ui, Arial" font-size="48" fill="#f3e8ff" font-weight="600">EDUCATION</text>
</svg>
SVG
      ;;
    INLINE_ZELLE)
      # Zelle placeholder
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#6D2ED1"/>
  <text x="50%" y="54%" text-anchor="middle" font-family="system-ui, Arial" font-size="140" fill="#ffffff" font-weight="700">ZELLE</text>
</svg>
SVG
      ;;
    INLINE_NIU)
      # Northern Illinois University placeholder
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#BA0C2F"/>
  <rect x="0" y="0" width="512" height="170" fill="#000000"/>
  <text x="50%" y="30%" text-anchor="middle" font-family="system-ui, Arial" font-size="140" fill="#ffffff" font-weight="800">NIU</text>
  <text x="50%" y="70%" text-anchor="middle" font-family="system-ui, Arial" font-size="48" fill="#ffffff" font-weight="400">HUSKIES</text>
</svg>
SVG
      ;;
    INLINE_BOA)
      # Bank of America placeholder
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#012169"/>
  <rect x="206" y="206" width="100" height="100" fill="#E31837"/>
  <rect x="206" y="206" width="50" height="50" fill="#ffffff"/>
  <rect x="256" y="256" width="50" height="50" fill="#ffffff"/>
  <text x="50%" y="80%" text-anchor="middle" font-family="system-ui, Arial" font-size="36" fill="#ffffff" font-weight="600">BANK OF AMERICA</text>
</svg>
SVG
      ;;
    INLINE_ARIZONA)
      # Arizona flag stylized
      cat >"$out" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#002868"/>
  <rect x="0" y="256" width="512" height="256" fill="#BF0A30"/>
  <g transform="translate(256,256)">
    <path d="M0,-100 L23,-31 L95,-31 L37,12 L59,81 L0,38 L-59,81 L-37,12 L-95,-31 L-23,-31 Z" fill="#F7D117"/>
  </g>
</svg>
SVG
      ;;
    *)
      echo "Unknown inline key: $key" >&2
      return 1
      ;;
  esac
}

for row in "${ITEMS[@]}"; do
  IFS='|' read -r slug filename locator <<<"$row"
  dir="$BASE/$slug"
  mkdir -p "$dir"
  out="$dir/$filename"
  if [[ "$locator" == INLINE_* ]]; then
    echo "Writing inline SVG for $slug -> $out"
    write_inline_svg "$locator" "$out"
  else
    download_file "$locator" "$out"
  fi
done

echo "Done. Organization icons stored in $BASE"
echo ""
echo "Icon mapping for your experience entries:"
echo "- First Citizens Bank: first-citizens-bank/fcb.svg"
echo "- REPAY: repay/repay.svg"
echo "- Early Warning Services: early-warning/early-warning.svg"
echo "- Valley of the Sun: valley-of-the-sun/vots.svg"
echo "- NCR Corporation: ncr/ncr.svg"
echo "- Arizona DEMA: arizona-dema/arizona-dema.svg"
echo "- Northern Illinois University: northern-illinois-university/niu.svg"
echo ""
echo "Generic fallbacks available:"
echo "- generic-company/generic-company.svg"
echo "- generic-bank/generic-bank.svg"
echo "- generic-education/generic-education.svg"
echo "- generic-tech-support/generic-tech-support.svg"