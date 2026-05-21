# Push with GitHub Desktop (1 minute)

Your project is **committed locally** and ready. You only need to **push** from GitHub Desktop.

## Steps

1. Open **GitHub Desktop**.
2. **File → Add Local Repository…**
3. Choose folder: `/Users/kamalroy/Projects/toll-plaza-app`
4. If asked “create a repository?” click **create** or **add** — it should detect existing git.
5. You should see **2 commits** ready to push to `Toll-Plaza-college-project`.
6. At the top, confirm repository: **Toll-Plaza-college-project** (or set remote if prompted).
7. Click **Push origin** (or **Publish branch**).

## Submit to college

https://github.com/RogerRWT/Toll-Plaza-college-project

Confirm these folders appear on GitHub:

- `frontend/`
- `backend/`
- `README.md`

## Run the app locally

```bash
export PATH="$HOME/.local/node-v22.14.0-darwin-arm64/bin:$PATH"
bash scripts/dev.sh
```

Open http://localhost:4200
