// Production: Netlify proxies /api → Render backend (see netlify.toml at repo root)
export const environment = {
  production: true,
  apiUrl: '/api/logs',
};
