# Rohan Arunachalam — Portfolio

Personal portfolio site: vanilla HTML, CSS and JavaScript. No build step and no frameworks.

## Run

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

(VS Code's "Live Server" extension also works.)

## Structure

```
index.html          page markup and section copy
css/style.css       theme (CSS variables at the top), layout, responsive rules
js/script.js        config binding, project cards, nav, scroll reveal, contact form
config/portfolio.js name, email, GitHub, LinkedIn, profile image, projects
image/              original profile photo (unchanged)
```

## Common edits

All of these are in `config/portfolio.js`:

- **Email:** `email`
- **GitHub:** `github`
- **LinkedIn:** `linkedin`
- **Project links:** each project's `github` / `demo`. While a link is `""`, its button shows as "· soon".
- **Add a project:** add an object to the `projects` array. Set `visual` to `graph`, `dairy`, `agents` or `cad`, or add a new visual in `js/script.js` (`visuals`). The entry with `featured: true` is shown in the large featured block instead of the grid.
- **Profile photo:** `profileImage`

**Theme:** colours and fonts are the variables in `:root` at the top of `css/style.css` — deep teal `--char` (#205D67), sand gold `--accent` (#D9BF77), pale green `--lime` (#D8EBB5), sage green `--green` (#639A67) and paper `--cream`. Fonts: Big Shoulders Display (headings), Inter (body), Kalam (handwritten labels).

## Photo

The hero uses `image/Cinematic High-Contrast Monochrome Portrait.png`, which is already black & white.
`.hero__photo` in `css/style.css` shows it in a white-edged rounded frame with
`filter: grayscale(100%) brightness(1.12) contrast(1.08)`, a slight lift so the face reads clearly on the dark hero.

## Placeholders to replace

- `email`: `your.email@example.com`
- `github`: `https://github.com/` (generic)
- `linkedin`: `https://www.linkedin.com/` (generic)
- Project GitHub and demo links (all empty)
- `og:image` in `index.html`: use an absolute URL once the site is deployed
