# Authorize.Net Wix Velo Integration (Checkout & Cart System)

A high-performance, production-ready integration for Authorize.Net within the Wix Velo environment. This project features a session-based shopping cart and a dedicated, on-site secure checkout experience.

---

## 🚀 Project Architecture

### 1. The Cart System
- **How it works:** Users browse services on `frontend/buyInstaFollwers.js`. Clicking "Add to Cart" or "Continue" saves their selected packages into a `sessionStorage` array (`serviceCart`) and triggers a Wix Lightbox (`ServiceCart`).
- **Benefit:** Allows for multiple packages to be purchased in a single transaction.

### 2. The Direct Checkout Page
- **How it works:** Users proceed to a dedicated `/checkout` page managed by `frontend/checkout.js`. The page loads all session items and calculates the total.
- **Processing:** The page securely collects Card Number, CVC, and Expiry Date. The data is securely sent to the Wix backend (`backend/authorizeIntegration.jsw`), processed via Authorize.Net's Direct XML API, and a success/fail response is returned instantly without the user ever leaving the domain.

### 3. The Thank You / Order Details Page
- **How it works:** Upon a successful transaction, the user is redirected to the `/thank-you` page (`frontend/thankYou.js`). The checkout page constructs a URL with detailed query parameters (Order Number, Name, Email, Packages, Amount).
- **UI:** The Thank You page parses these parameters to display a formatted, invoice-like summary (`#orderDetails`) and runs a dummy processing animation (`#progressBar1`) for a premium user experience. It also stores the finalized order in the Wix CMS `OrderDetails` collection.

---

## 📂 Key Components

- **`frontend/buyInstaFollwers.js`**: Controls service selection, adds items to the session cart, and opens the ServiceCart Lightbox.
- **`frontend/ServiceCart.js`**: A Lightbox component that reads the `serviceCart` session, allows item removal, and routes users to the checkout page.
- **`frontend/checkout.js`**: Dedicated checkout page. Retrieves session cart, builds the Authorize.Net payload, handles API communication, and clears the cart upon success.
- **`frontend/thankYou.js`**: Parses URL query parameters to dynamically generate an invoice summary. Logs completed orders to the database.
- **`backend/authorizeIntegration.jsw`**: The consolidated backend service. It handles XML payload construction, `xml2js` response parsing, and database logging.

---

## 🛠️ Technical Features

- **Session Storage Cart**: Dynamic shopping cart that persists across the session without requiring user authentication.
- **On-Site Payment Form**: Seamless Authorize.Net integration on a native Wix page.
- **Robust Error Handling**: Real-time feedback for declines, expired cards, or incorrect CVCs.
- **Database Logging**: Every transaction step is logged. Successful orders are saved to `Orders` and `OrderDetails` CMS collections.
- **PCI Security**: Sensitive card data is processed directly via backend secure calls but **never saved** to the database.

---

## ⚙️ Setup & Configuration

### 1. Wix Secret Manager
The following production credentials must be stored:

- `apiLoginId`: Your Live Authorize.Net API Login ID.
- `transactionKey`: Your Live Authorize.Net Transaction Key.

### 2. UI Element IDs
Ensure the following IDs are set in your Wix Editor:

- **Checkout Page:** `#cardName`, `#cardNumber`, `#cardCvc`, `#expirationMonth`, `#expirationYear`, `#zipCode`, `#payNow`, `#errorText`, `#checkoutRepeater` (for displaying items).
- **Thank You Page:** `#statusHeading`, `#orderDetails` (Text element for invoice), `#progressBar1` (Progress bar component).

### 3. Workflow Flow

1. **Selection:** User selects a package and clicks Buy Now or Add to Cart.
2. **Cart:** Item is saved to `sessionStorage` and user views the ServiceCart lightbox.
3. **Checkout:** User navigates to `/checkout`, enters payment details.
4. **Processing:** Authorize.Net processes the payload; on success, the cart clears.
5. **Completion:** User is redirected to `/thank-you` to view their dynamically generated invoice.

---

## ⚖️ License
MIT - Spark Media Integration
