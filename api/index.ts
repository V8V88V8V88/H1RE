import type { IncomingMessage, ServerResponse } from "http";

// Load the Express app lazily so a startup error is reported instead of
// crashing the function with an opaque FUNCTION_INVOCATION_FAILED.
let appPromise: Promise<(req: IncomingMessage, res: ServerResponse) => void> | undefined;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    appPromise ??= import("../server/app.js").then((m) => m.default as any);
    const app = await appPromise;
    return app(req, res);
  } catch (err: any) {
    appPromise = undefined;
    console.error("Failed to load API:", err);
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ message: "API failed to start", error: String(err?.message ?? err) }));
  }
}
