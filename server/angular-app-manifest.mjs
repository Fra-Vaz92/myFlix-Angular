
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://fra-vaz92.github.io/myFlix-Angular/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/https://fra-vaz92.github.io/myFlix-Angular/welcome",
    "route": "/https://fra-vaz92.github.io/myFlix-Angular"
  },
  {
    "renderMode": 2,
    "route": "/https://fra-vaz92.github.io/myFlix-Angular/welcome"
  },
  {
    "renderMode": 2,
    "route": "/https://fra-vaz92.github.io/myFlix-Angular/movies"
  },
  {
    "renderMode": 2,
    "route": "/https://fra-vaz92.github.io/myFlix-Angular/profile"
  }
],
  assets: {
    'index.csr.html': {size: 70878, hash: '75c531415832d32fbdb1c71cc54546a31ee094ad1bdb81cccfcea5b7ab22bf11', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17253, hash: 'd1921dedda4c4d37db2a88f8d3028f5639c3c3a3eb929711c2b2e0283b8c98bb', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'movies/index.html': {size: 71267, hash: '3f332a0d6f1b52863242fcef02afa27b49b1723f99fd793190960a7f50103637', text: () => import('./assets-chunks/movies_index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 71267, hash: '3f332a0d6f1b52863242fcef02afa27b49b1723f99fd793190960a7f50103637', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'welcome/index.html': {size: 71267, hash: '3f332a0d6f1b52863242fcef02afa27b49b1723f99fd793190960a7f50103637', text: () => import('./assets-chunks/welcome_index_html.mjs').then(m => m.default)},
    'styles-GDHIXXDX.css': {size: 95424, hash: 'rJUbJbDiSAg', text: () => import('./assets-chunks/styles-GDHIXXDX_css.mjs').then(m => m.default)}
  },
};
