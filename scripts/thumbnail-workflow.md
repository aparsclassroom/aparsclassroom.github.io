# Course Thumbnail Workflow

Use `scripts/process-thumbnails.sh` to turn teacher-provided thumbnails into optimized files hosted by this GitHub Pages repo.

## One-time setup

Install the image compressor:

```sh
brew install webp
```

If you want to download directly from a Google Drive folder URL, also install:

```sh
pipx install gdown
```

## Recommended flow

For a Google Drive folder:

```sh
scripts/process-thumbnails.sh "https://drive.google.com/drive/folders/..." compactbio28
```

For a local folder you already downloaded:

```sh
scripts/process-thumbnails.sh downloads/compactbio28 compactbio28
```

Optional arguments:

```sh
scripts/process-thumbnails.sh <source> <course-slug> <target-kb> <max-width>
```

Defaults:

- `target-kb`: `220`
- `max-width`: `1400`

Optimized thumbnails are saved in:

```text
shop/assets/images/course-thumbnails/<course-slug>/
```

After pushing to GitHub Pages, the public URLs follow this pattern:

```text
https://aparsclassroom.github.io/shop/assets/images/course-thumbnails/<course-slug>/<filename>.webp
```

Raw downloads stay in `.thumbnail-work/` or `downloads/`, which are ignored by git.
