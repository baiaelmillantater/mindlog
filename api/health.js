export default {
  async fetch() {
    return new Response(JSON.stringify({
      ok: true,
      storage: process.env.DATABASE_URL ? "postgres" : "github-fallback",
      timestamp: new Date().toISOString()
    }), {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store"
      }
    });
  }
};
