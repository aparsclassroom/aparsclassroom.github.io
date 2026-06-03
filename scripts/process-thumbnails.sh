#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  scripts/process-thumbnails.sh <google-drive-folder-url|local-image-folder> <course-slug> [target-kb] [max-width]

Examples:
  scripts/process-thumbnails.sh "https://drive.google.com/drive/folders/..." compactbio28
  scripts/process-thumbnails.sh downloads/compactbio28 compactbio28 200 1400

Output:
  Optimized thumbnails are written to:
    shop/assets/images/course-thumbnails/<course-slug>/

Requirements:
  - cwebp for image compression
  - gdown only when the first argument is a Google Drive folder URL

Install hints:
  brew install webp
  python3 -m pip install --user gdown

If your Python blocks user installs, use:
  brew install pipx
  pipx install gdown
USAGE
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" || $# -lt 2 ]]; then
  usage
  exit 0
fi

SOURCE="$1"
COURSE_SLUG="$2"
TARGET_KB="${3:-220}"
MAX_WIDTH="${4:-1400}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORK_DIR="$ROOT_DIR/.thumbnail-work/$COURSE_SLUG"
RAW_DIR="$WORK_DIR/raw"
OUT_DIR="$ROOT_DIR/shop/assets/images/course-thumbnails/$COURSE_SLUG"
SITE_URL="${SITE_URL:-https://aparsclassroom.com}"
BASE_URL="${SITE_URL%/}/shop/assets/images/course-thumbnails/$COURSE_SLUG"
MANIFEST="$OUT_DIR/manifest.csv"
TARGET_BYTES=$((TARGET_KB * 1024))

if ! command -v cwebp >/dev/null 2>&1; then
  echo "Error: cwebp is required. Install it with: brew install webp" >&2
  exit 1
fi

slugify() {
  local name="$1"
  name="${name%.*}"
  printf '%s' "$name" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//; s/-+/-/g'
}

prepare_source() {
  rm -rf "$RAW_DIR"
  mkdir -p "$RAW_DIR"

  if [[ "$SOURCE" =~ ^https?:// ]]; then
    if ! command -v gdown >/dev/null 2>&1; then
      echo "Error: gdown is required for Google Drive folders." >&2
      echo "Install it with: python3 -m pip install --user gdown" >&2
      echo "If that fails, run: brew install pipx && pipx install gdown" >&2
      exit 1
    fi

    gdown --folder "$SOURCE" -O "$RAW_DIR"
    return
  fi

  if [[ ! -d "$SOURCE" ]]; then
    echo "Error: source folder not found: $SOURCE" >&2
    exit 1
  fi

  find "$SOURCE" -type f \( \
    -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o \
    -iname '*.webp' -o -iname '*.tif' -o -iname '*.tiff' \
  \) -print0 | while IFS= read -r -d '' file; do
    cp "$file" "$RAW_DIR/"
  done
}

compress_images() {
  mkdir -p "$OUT_DIR"
  printf 'original_filename,public_url,size\n' > "$MANIFEST"

  local count=0
  find "$RAW_DIR" -type f \( \
    -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o \
    -iname '*.webp' -o -iname '*.tif' -o -iname '*.tiff' \
  \) -print0 | sort -z | while IFS= read -r -d '' file; do
    count=$((count + 1))

    local filename base output
    filename="$(basename "$file")"
    base="$(slugify "$filename")"
    if [[ -z "$base" ]]; then
      base="thumbnail-$count"
    fi
    output="$OUT_DIR/$base.webp"
    if [[ -e "$output" ]]; then
      base="$base-$count"
      output="$OUT_DIR/$base.webp"
    fi

    cwebp -quiet -m 6 -pass 6 -q 82 -size "$TARGET_BYTES" -resize "$MAX_WIDTH" 0 "$file" -o "$output"

    local size_kb
    size_kb="$(du -k "$output" | awk '{print $1}')"
    printf '%s,%s,%sKB\n' "$filename" "$BASE_URL/$base.webp" "$size_kb" | tee -a "$MANIFEST"
  done
}

prepare_source

echo "original_filename,public_url,size"
compress_images

echo
echo "Done. Commit only the optimized files in:"
echo "  shop/assets/images/course-thumbnails/$COURSE_SLUG/"
echo "URL manifest:"
echo "  shop/assets/images/course-thumbnails/$COURSE_SLUG/manifest.csv"
