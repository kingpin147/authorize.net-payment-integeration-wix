# Authorize.Net Wix Velo Integration (Direct Checkout)

A robust, production-ready integration for Authorize.Net (Accept Hosted flow) within the Wix Velo environment. This implementation bypasses the standard Wix Payment plugin for a faster, direct redirection flow.

## 🚀 Overview

This integration allows your Wix site to securely accept payments via Authorize.Net using the **Accept Hosted** flow. Customers are redirected to a secure, Authorize.Net-hosted payment page via a branded bridge page that handles the necessary security protocols.

### Key Features
- **Direct Frontend Redirection**: Uses `wix-location` for a seamless transition from your custom multi-state checkout form.
- **Agency-Branded Bridge Page**: A high-performance, colorful bridge page (Spark Media) that handles the secure POST to Authorize.Net without broken images.
- **Line Item Support**: Pass detailed order information (package name, price, quantity) directly to the payment gateway.
- **Custom Field Mapping**: Automatically maps Instagram Usernames and Emails to Authorize.Net customer fields for easy order management.
- **Dynamic Environment Toggling**: Easily switch between Sandbox and Production.

---

## 📂 Project Structure

- `frontend/buyInstaFollwers.js`: The main frontend logic for package selection and initiating the direct checkout.
- `backend/authorize.jsw`: The core backend logic for generating Authorize.Net tokens and line item formatting.
- `backend/http-functions.js`: The "bridge" endpoint (`_functions/authorizeRedirect`) that provides a premium agency-styled redirection page.

---

## 🛠️ Setup Instructions

### 1. Configure Secrets
Add the following secrets to your **Wix Secret Manager**:
- `apiLoginId`: Your Authorize.Net API Login ID.
- `transactionKey`: Your Authorize.Net Transaction Key.

### 2. Configure Element IDs
Ensure your Wix Page contains a **Multi-State Box** with a `details` state containing:
- Input ID `#userName`: For the Instagram Username.
- Input ID `#emailInput`: For the customer email.
- Button ID `#buyNow`: To trigger the payment.
- Dropdown ID `#packageDropdown`: For package selection.

### 3. Update Site Domain
In `backend/authorize.jsw`, update the `baseUrl` variable to match your live domain:
```javascript
const baseUrl = "https://www.sparkyourinsta.com";
```

### 4. Publish Your Site
For the `_functions/authorizeRedirect` bridge page to work, you **must publish your site**.

---

## ⚖️ License
MIT
