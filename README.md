# Authorize.Net Wix Velo Integration (Direct On-Site Checkout)

A high-performance, production-ready integration for Authorize.Net within the Wix Velo environment. This project evolved from a redirect-based system to a fully integrated, on-site payment experience.

---

## 🚀 Project Evolution

### Scenario 1: The Redirect Method (Legacy)

Initially, the project used the **Authorize.Net Accept Hosted** flow. 

- **How it worked:** Users were redirected to a secure Authorize.Net-hosted page via a custom "bridge" page (`_functions/authorizeRedirect`).
- **Why it changed:** The client felt that redirecting users to a third-party domain (even for security) broke the premium brand experience and decreased conversion rates.

### Scenario 2: The Direct Method (Final Choice)

We implemented a **Direct API (AIM/XML)** integration that allows the entire transaction to happen on the website.

- **How it works:** A multi-state checkout box collects customer details and card information. The data is sent securely to the Wix backend, processed via Authorize.Net's Direct XML API, and a success/fail response is shown instantly.
- **Result:** **This is what the client finally liked.** It provides a seamless, professional experience where the customer never leaves the `sparkyourinsta.com` domain.

---

## 📂 Key Components

- **`frontend/buyInstaFollwers.js`**: Controls the multi-state checkout UI (Package Selection -> Details -> Card Info). Handles frontend validation and error display.
- **`backend/authorizeIntegration.jsw`**: The consolidated backend service. It handles XML payload construction, `xml2js` response parsing, and database logging.
- **`backend/payment.jsw`**: A legacy wrapper used for testing direct transactions.
- **`frontend/success.js`**: Parses URL query parameters (`status`, `description`, `amount`, `error`) on the Thank You page to dynamically show success or failure details.

---

## 🛠️ Technical Features

- **On-Site Payment Form**: Custom UI for Card Number, CVC, and Expiration Date inside a Wix Multi-State Box.
- **Robust Error Handling**: Real-time feedback for declines, expired cards, or incorrect CVCs displayed via the `#errorText` element.
- **Database Logging**: Every step (Initiated, Result, Exception) is logged to a `logs` CMS collection for audit trails and customer support.
- **PCI Security**: Sensitive card data is processed but **never saved** to the database, ensuring security and compliance.
- **Production Endpoint**: Configured for `api.authorize.net` with live environment toggling.

---

## ⚙️ Setup & Configuration

### 1. Wix Secret Manager
The following production credentials must be stored:

- `apiLoginId`: Your Live Authorize.Net API Login ID.
- `transactionKey`: Your Live Authorize.Net Transaction Key.

### 2. UI Element IDs
The `buyInstaFollwers.js` logic expects the following IDs in the Wix Editor:

- **Details State:** `#userName`, `#emailInput`, `#buyNow` (Continue button).
- **Card State:** `#cardNumber`, `#cardCvc`, `#expirationMonth`, `#expirationYear`, `#payNow`.
- **Feedback:** `#errorText` (Text element for decline messages).
- **Thank You Page:** `#statusHeading`, `#detailsText` (Used by `success.js` to display the final payment status and summary).

### 3. Workflow Flow

1. **Selection:** User picks a package in the repeater.
2. **Details:** User enters Instagram handle and email.
3. **Payment:** User enters card details on the same page.
4. **Completion:** On success or failure, the user is redirected to `/thank-you` with dynamic URL parameters that show the outcome.

---

## ⚖️ License
MIT - Spark Media Integration
