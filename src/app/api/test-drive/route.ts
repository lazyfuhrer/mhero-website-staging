import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

/** Row order: Timestamp, Name, Surname, Location, City, Country, Email, Phone, Message, Locale */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function legacyResponse(success: boolean, message: string) {
  // `mhero_form_submit` expects `$.post` success payload to be a *string* and then runs `$.parseJSON`.
  // Returning `NextResponse.json` can be parsed by jQuery automatically, which makes `$.parseJSON` crash with
  // "[object Object]" not valid JSON. Using `text/plain` forces a string response.
  return new NextResponse(JSON.stringify({ result: success ? "success" : "error", message }), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

async function verifyRecaptcha(token: string | null, secret: string): Promise<boolean> {
  if (!token) return false;
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const honeypot = String(formData.get("mhero_honeypot") ?? "").trim();
    if (honeypot !== "") {
      return legacyResponse(false, "Invalid submission.");
    }

    const name = String(formData.get("name") ?? "").trim();
    const surname = String(formData.get("surname") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const city = String(formData.get("city") ?? "").trim();
    const country = String(formData.get("country") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const locale = String(formData.get("locale") ?? "").trim() || "unknown";

    const privacy = formData.get("Privacy-Policy");
    const privacyOk =
      privacy === "on" || privacy === "true" || privacy === "1";

    if (!name || !surname || !location || !city || !country || !email || !phone) {
      return legacyResponse(false, "Please fill in all required fields.");
    }
    if (!privacyOk) {
      return legacyResponse(false, "You must accept the Privacy Policy.");
    }
    if (!EMAIL_REGEX.test(email)) {
      return legacyResponse(false, "Invalid email format.");
    }

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaTokenRaw = formData.get("g-recaptcha-response");
    const hasRecaptchaTokenField = recaptchaTokenRaw !== null;
    const recaptchaToken = String(recaptchaTokenRaw ?? "");
    const recaptchaSiteKeyExpected = process.env.RECAPTCHA_SITE_KEY ?? "";
    const recaptchaSiteKeyUsedRaw = String(formData.get("recaptcha_site_key_used") ?? "");
    const hasRecaptchaSiteKeyExpected = recaptchaSiteKeyExpected.length > 0;
    const isUsingExpectedRecaptchaSiteKey =
      hasRecaptchaSiteKeyExpected && recaptchaSiteKeyUsedRaw === recaptchaSiteKeyExpected;
    const reqHost = request.headers.get("host") ?? "";
    const origin = request.headers.get("origin") ?? "";
    const referer = request.headers.get("referer") ?? "";
    // #region agent log
    fetch("http://127.0.0.1:7307/ingest/4a970e26-d6d1-4b12-95b0-597a4f8c439c", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "80fc19",
      },
      body: JSON.stringify({
        sessionId: "80fc19",
        location: "test-drive/route.ts:recaptcha-state",
        message: "recaptcha secret + token presence",
        data: {
          hypothesisId: "H1",
          hasRecaptchaSecret: Boolean(recaptchaSecret),
          recaptchaTokenLen: recaptchaToken.length,
          hasRecaptchaTokenField,
          recaptchaTokenIsEmpty: recaptchaToken.length === 0,
          recaptchaSiteKeyExpectedLen: recaptchaSiteKeyExpected.length,
          recaptchaSiteKeyUsedLen: recaptchaSiteKeyUsedRaw.length,
          isUsingExpectedRecaptchaSiteKey,
          reqHost,
          origin,
          referer,
        },
        timestamp: Date.now(),
        runId: "pre-recaptcha",
      }),
    }).catch(() => {});
    // #endregion
    if (recaptchaSecret) {
      const ok = await verifyRecaptcha(recaptchaToken || null, recaptchaSecret);
      if (!ok) {
        // #region agent log
        fetch("http://127.0.0.1:7307/ingest/4a970e26-d6d1-4b12-95b0-597a4f8c439c", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Debug-Session-Id": "80fc19",
          },
          body: JSON.stringify({
            sessionId: "80fc19",
            location: "test-drive/route.ts:recaptcha-verify-failed",
            message: "recaptcha verification failed",
            data: {
              hypothesisId: "H3",
              recaptchaTokenLen: recaptchaToken.length,
            },
            timestamp: Date.now(),
            runId: "verify-failed",
          }),
        }).catch(() => {});
        // #endregion
        return legacyResponse(
          false,
          `reCAPTCHA verification failed. tokenLen=${recaptchaToken.length}, siteKeyMatch=${isUsingExpectedRecaptchaSiteKey}. Please try again.`
        );
      }
    }

    const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
    const spreadsheetId = process.env.MHERO_TEST_DRIVE_SHEET_ID;

    if (!credentials || !spreadsheetId) {
      console.error("POST /api/test-drive - missing GOOGLE_SERVICE_ACCOUNT_CREDENTIALS or MHERO_TEST_DRIVE_SHEET_ID");
      return legacyResponse(false, "Server configuration error. Please try again later.");
    }

    let auth;
    try {
      const creds = JSON.parse(credentials);
      auth = new google.auth.GoogleAuth({
        credentials: creds,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
    } catch {
      console.error("POST /api/test-drive - invalid credentials JSON");
      return legacyResponse(false, "Server configuration error. Please try again later.");
    }

    const sheets = google.sheets({ version: "v4", auth });

    let sheetName = "Sheet1";
    try {
      const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
      if (spreadsheet.data.sheets && spreadsheet.data.sheets.length > 0) {
        sheetName = spreadsheet.data.sheets[0].properties?.title || "Sheet1";
      }
    } catch {
      // use default
    }

    const timestamp = new Date().toISOString();
    const values = [
      [
        timestamp,
        name,
        surname,
        location,
        city,
        country,
        email,
        phone,
        message,
        locale,
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: sheetName,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values },
    });

    // #region agent log
    fetch("http://127.0.0.1:7307/ingest/4a970e26-d6d1-4b12-95b0-597a4f8c439c", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "80fc19",
      },
      body: JSON.stringify({
        sessionId: "80fc19",
        location: "test-drive/route.ts:append-ok",
        message: "Google Sheets append succeeded",
        data: {
          hypothesisId: "H4",
          hasSpreadsheetId: Boolean(spreadsheetId),
          spreadsheetIdLen: spreadsheetId.length,
          sheetName,
        },
        timestamp: Date.now(),
        runId: "append-ok",
      }),
    }).catch(() => {});
    // #endregion

    console.log("POST /api/test-drive - 200");
    return legacyResponse(true, "Thank you. Your test drive request has been received.");
  } catch (error) {
    // #region agent log
    fetch("http://127.0.0.1:7307/ingest/4a970e26-d6d1-4b12-95b0-597a4f8c439c", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "80fc19",
      },
      body: JSON.stringify({
        sessionId: "80fc19",
        location: "test-drive/route.ts:append-catch",
        message: "Google Sheets append failed",
        data: {
          hypothesisId: "H4",
          error: error instanceof Error ? error.message : String(error),
        },
        timestamp: Date.now(),
        runId: "append-failed",
      }),
    }).catch(() => {});
    // #endregion
    console.error("POST /api/test-drive - error", error);
    return legacyResponse(
      false,
      error instanceof Error ? error.message : "Failed to submit. Please try again."
    );
  }
}
