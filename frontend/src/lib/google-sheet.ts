// Server-only: sends a row to the Google Apps Script web app, which writes it to the right tab.

export type SheetForm = "contact" | "order";

export type SheetResult = { ok: true } | { ok: false; detail: string };

const REQUEST_TIMEOUT_MS = 15000;

export async function appendToSheet(form: SheetForm, row: Record<string, unknown>): Promise<SheetResult> {
  const scriptUrl = process.env.NEXT_PUBLIC_SCRIPT_URL;
  const secret = process.env.NEXT_PUBLIC_WEBHOOK_SECRET;
  if (!scriptUrl || !secret) {
    const missing = [!scriptUrl && "NEXT_PUBLIC_SCRIPT_URL", !secret && "NEXT_PUBLIC_WEBHOOK_SECRET"].filter(Boolean);
    return { ok: false, detail: `Missing env values: ${missing.join(", ")}` };
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...row, form, secret }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    const contentType = response.headers.get("content-type") ?? "unknown";
    const body = await response.text();

    if (!contentType.includes("json")) {
      const pageTitle = body.match(/<title>(.*?)<\/title>/i)?.[1] ?? "no title";
      return {
        ok: false,
        detail:
          `Google returned ${response.status} ${contentType} ("${pageTitle}") instead of JSON. ` +
          'The Apps Script web app is not reachable; check its "Who has access" setting is Anyone.',
      };
    }

    const result = JSON.parse(body) as { ok?: boolean; error?: string };
    if (result.ok === true) return { ok: true };
    return {
      ok: false,
      detail: `Apps Script rejected the ${form} row (${response.status}): ${result.error ?? "no error message"}`,
    };
  } catch (error) {
    return {
      ok: false,
      detail: `Could not reach Google Sheet: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
