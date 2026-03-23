import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

/** Row order in the shared sheet:
 * Timestamp, Name, Surname, Location, City, Country, Email, Phone, Message, Locale
 *
 * For contact/support forms, Location/City/Country are intentionally left blank.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function legacyResponse(success: boolean, message: string) {
  return NextResponse.json(
    { result: success ? "success" : "error", message },
    { status: 200 }
  );
}

async function verifyRecaptcha(
  token: string | null,
  secret: string
): Promise<boolean> {
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
    const company = String(formData.get("company") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const locale = String(formData.get("locale") ?? "").trim() || "unknown";

    const privacyContact = formData.get("Privacy-Policy");
    const privacySupport = formData.get("privacy-Policy");
    const privacyOk =
      privacyContact === "on" ||
      privacyContact === "true" ||
      privacyContact === "1" ||
      privacySupport === "on" ||
      privacySupport === "true" ||
      privacySupport === "1";

    if (!name || !surname || !email || !phone || !message) {
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
        location: "contact-us/route.ts:recaptcha-state",
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
            location: "contact-us/route.ts:recaptcha-verify-failed",
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
        return legacyResponse(false, "reCAPTCHA verification failed. Please try again.");
      }
    }

    const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
    const spreadsheetId = process.env.MHERO_TEST_DRIVE_SHEET_ID;

    if (!credentials || !spreadsheetId) {
      return legacyResponse(
        false,
        "Server configuration error. Please try again later."
      );
    }

    let auth;
    try {
      const creds = JSON.parse(credentials);
      auth = new google.auth.GoogleAuth({
        credentials: creds,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
    } catch {
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
    const messageWithCompany =
      company.length > 0 ? `${message}\nCompany: ${company}` : message;

    const values = [
      [
        timestamp,
        name,
        surname,
        "", // Location
        "", // City
        "", // Country
        email,
        phone,
        messageWithCompany,
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
        location: "contact-us/route.ts:append-ok",
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

    return legacyResponse(true, "Thank you. Your request has been received.");
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
        location: "contact-us/route.ts:append-catch",
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
    return legacyResponse(
      false,
      error instanceof Error ? error.message : "Failed to submit. Please try again."
    );
  }
}

