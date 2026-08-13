# Rivera Wijaya Hardware Portfolio

Professional, responsive static portfolio for FPGA/RTL, embedded firmware, RF, analog, and power-electronics projects.

## Important: keep the files together

`index.html` loads `style.css`, `app.js`, `site-data.js`, and files inside `assets/`. Upload the **entire folder contents** to the root of your GitHub repository. Do not upload only `index.html`.

Your repository root should look like this:

```text
index.html
style.css
app.js
site-data.js
digital.html
firmware.html
analog.html
.nojekyll
assets/
  favicon.svg
  images/
    projects/
```

## Preview locally

Open `index.html`, or run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Customize profile and project content

Edit `site-data.js`.

Update the `profile` object near the top:

- `email`
- `github`
- `linkedin`
- `resumeUrl`
- headline, introduction, availability, and location

To enable the resume button, add the PDF to the repository and set:

```js
resumeUrl: "Rivera_Wijaya_Resume.pdf"
```

Each project supports:

- `title`
- `subtitle`
- `summary`
- `description`
- `tags`
- `highlights`
- `metrics`
- `links.github`
- `links.demo`
- `imageAlt`

Set `featured: true` to show a project on the homepage.

## Add project images

Put an image in `assets/images/projects/` and name it after the project's `id` in `site-data.js`. No code changes are needed.

For example, the project with `id: "uart-i2c"` will automatically use the first matching file below:

```text
assets/images/projects/uart-i2c.jpg
assets/images/projects/uart-i2c.jpeg
assets/images/projects/uart-i2c.png
assets/images/projects/uart-i2c.webp
assets/images/projects/uart-i2c.avif
assets/images/projects/uart-i2c.svg
```

Use lowercase file extensions. A 1600 × 900 image is recommended. If no matching file exists, the project is shown without an image area. `imageAlt` is optional and can still be added to a project for custom accessibility text.

## Publish with GitHub Pages

1. Create or open your GitHub repository.
2. Upload every file and folder shown in the structure above to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select your main branch and the `/ (root)` folder.
6. Save.

For a user site named `username.github.io`, the repository itself must be named `username.github.io`.
