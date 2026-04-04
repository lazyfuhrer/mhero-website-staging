import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

/** Row order in the shared sheet:
 * Timestamp, Name, Surname, Company, City, Country, Email, Phone, Message, Locale
 *
 * City and Country are left blank for contact/support forms.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Tab names inside spreadsheet GOOGLE_SHEET_ID */
function sheetTabForContactOrSupport(locale: string, rawFormType: string): string {
  const isAr = locale === "ar";
  const formType = rawFormType === "support" ? "support" : "contact";
  if (formType === "support") {
    return isAr ? "support-ar" : "support-en";
  }
  return isAr ? "contact-us-ar" : "contact-us-en";
}

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
    const mheroFormType = String(formData.get("mhero_form_type") ?? "").trim();

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

    // reCAPTCHA disabled until client + keys are aligned; use process.env.RECAPTCHA_SECRET_KEY here to re-enable.
    const recaptchaSecret = "";
    const recaptchaToken = String(formData.get("g-recaptcha-response") ?? "");
    if (recaptchaSecret) {
      const ok = await verifyRecaptcha(recaptchaToken || null, recaptchaSecret);
      if (!ok) {
        return legacyResponse(false, "reCAPTCHA verification failed. Please try again.");
      }
    }

    const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

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

    const sheetName = sheetTabForContactOrSupport(locale, mheroFormType);

    const timestamp = new Date().toISOString();

    const values = [
      [
        timestamp,
        name,
        surname,
        company,
        "", // City
        "", // Country
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

    return legacyResponse(true, "Thank you. Your request has been received.");
  } catch (error) {
    return legacyResponse(
      false,
      error instanceof Error ? error.message : "Failed to submit. Please try again."
    );
  }
}

