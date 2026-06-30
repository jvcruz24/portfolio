# Jon Vincent Cruz — Portfolio (Vite + React)

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for deployment

```bash
npm run build
```

This outputs a static `dist/` folder you can deploy to Vercel, Netlify, GitHub Pages, or any static host.

## Things to edit before sending to clients

- `src/App.jsx` — LinkedIn/GitHub links in the hero are placeholder text, not real `<a href>` links yet. Add your real URLs.
- `src/components/ProjectShowcase.jsx` — the "Ticketing & Workflow Routing" card is a placeholder description (flagged with a warning badge in the UI). Replace it with the real scope and metrics once confirmed.
- Swap the email/phone in the contact stage if they ever change.

## Structure

```
src/
  App.jsx                     -> all stages + scroll-snap logic
  components/
    ProjectShowcase.jsx       -> the 4-card interactive project tab widget
  index.css                   -> all styling (design tokens at the top)
  main.jsx                    -> React entry point
```
