# Connect This Project to GitHub

## Can the AI agent log into my GitHub?

**No — and that is intentional for security.**

Cursor cannot use your GitHub password or stay logged in as you. To publish code, **you** do a one-time login on your Mac. After that, scripts (or the agent) can push using your saved credentials.

You do **not** need to "connect Cursor to GitHub" permanently. You only need:

1. Git installed (`xcode-select --install`)
2. One login to GitHub (browser or token)
3. Run `bash scripts/publish-github.sh`

---

## Fastest path (about 5 minutes)

### A. Install Git (one time)

Open **Terminal** and run:

```bash
xcode-select --install
```

Click **Install** and wait until it finishes.

### B. Log in to GitHub CLI (one time)

```bash
brew install gh
```

If you do not have Homebrew, skip to **Option 2** below.

```bash
gh auth login
```

Choose:

- GitHub.com
- HTTPS
- Login with a web browser

### C. Publish automatically

```bash
cd /Users/kamalroy/Projects/toll-plaza-app
bash scripts/publish-github.sh
```

Copy the URL it prints and submit that to your college.

---

## Option 2 — No Homebrew (GitHub website + push)

1. `xcode-select --install`
2. Create repo at https://github.com/new → name `toll-plaza-app` → Public → **no** README
3. Run:

```bash
cd /Users/kamalroy/Projects/toll-plaza-app
bash scripts/publish-github.sh YOUR_GITHUB_USERNAME
```

4. When prompted, run: `git push -u origin main`
5. Sign in with browser or a **Personal Access Token** (Settings → Developer settings → Tokens → `repo` scope)

---

## Option 3 — GitHub Desktop (easiest UI)

1. Install https://desktop.github.com/
2. Sign in to GitHub in the app
3. **File → Add Local Repository** → `/Users/kamalroy/Projects/toll-plaza-app`
4. **Commit to main** → **Publish repository**
5. Submit the URL shown in the browser

---

## After you complete step A

Tell Cursor: **"Git is installed, publish to GitHub"** and the agent can run `publish-github.sh` for you.
