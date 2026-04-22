# Authorize.Net Wix Velo Integration

A robust, production-ready integration for Authorize.Net (Accept Hosted flow) within the Wix Velo environment.

## 🚀 Overview

This integration allows your Wix site to securely accept payments via Authorize.Net while maintaining SAQ-A PCI compliance. It uses the **Accept Hosted** flow, where customers are redirected to a secure, Authorize.Net-hosted payment page.

### Key Features
- **CSP-Compliant Redirection**: Bypasses Wix security restrictions using a branded bridge page.
- **Dynamic Environment Toggling**: Easily switch between Sandbox and Production.
- **Robust Field Handling**: Automatically cleans and sanitizes customer data to prevent common API errors (`E00001`, `E00003`).
- **Centralized Logging**: Detailed error and success logging to a Wix CMS `logs` collection.

---

## 📂 Project Structure

Files must be placed in the `backend/` folder of your Wix site:

- `backend/authorize.jsw`: The core logic for communicating with Authorize.Net and generating tokens.
- `backend/authorize.js`: The main transaction orchestration file (Wix Payment SPI).
- `backend/http-functions.js`: The "bridge" endpoint that handles the secure POST redirection.
- `backend/authorize-config.js`: Configuration for the Payment Service Provider.

---

## 🛠️ Setup Instructions

### 1. Configure Secrets
Add the following secrets to your **Wix Secret Manager**:
- `apiLoginId`: Your Authorize.Net API Login ID.
- `transactionKey`: Your Authorize.Net Transaction Key.

### 2. Move Files to Backend
Ensure all `.js` and `.jsw` files are located in the `backend` folder in the Wix Velo Sidebar.

### 3. Update Site Domain
In `backend/authorize.jsw`, update the `baseUrl` variable to match your live domain:
```javascript
const baseUrl = "https://www.sparkyourinsta.com";
```

### 4. Publish Your Site
For the `_functions/authorizeRedirect` endpoint to work, you **must publish your site**.

---

## 🧪 Testing

### Sandbox Mode
To test with a Developer account, pass `isSandbox: true` in your checkout parameters. The code is set to **Production** by default.

### Debugging Logs
If a transaction fails, check your **CMS > logs** collection. It stores:
- Full API error codes (e.g., `E00007`).
- Raw payloads for inspection.
- Timestamps and order IDs.

---

## ⚖️ License
MIT
