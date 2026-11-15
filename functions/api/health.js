function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export function onRequestGet(context) {
  return json({
    ok: true,
    authRequired: false,
    byok: true,
    openaiConfigured: false,
    model: context.env.OPENAI_MODEL || "gpt-4.1-mini",
  });
}
