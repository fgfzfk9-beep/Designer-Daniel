# TODO - Connect front-end to Express backend (CORS) & persist to database.json

- [ ] Update `server.js`: tighten CORS config and ensure API endpoints work with browser preflight.
- [ ] Update `script.js`: remove duplicate functions, load content from backend, and sync saves to backend reliably.
- [ ] Verify `database.json` structure matches API (title, desc, phone, projects).
- [ ] Manual test steps:
  - [ ] Start backend: `node server.js`
  - [ ] Open `index.html` in browser
  - [ ] Verify page loads data from `GET /api/site-data`
  - [ ] Login as admin and save content/projects
  - [ ] Confirm `database.json` is updated

