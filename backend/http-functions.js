import { response } from 'wix-http-functions';

// This HTTP function will handle the redirection to Authorize.net
// URL to access: https://<your-domain>/_functions/authorizeRedirect?token=<the_token>
export function get_authorizeRedirect(request) {
    const token = request.query.token;
    
    if (!token) {
        return response({
            status: 400,
            body: "Missing token parameter."
        });
    }

    const isSandboxParam = request.query.isSandbox;
    // Fix: isSandbox is true if the param is 'true'
    const isSandbox = (isSandboxParam === 'true'); 

    const actionUrl = isSandbox 
        ? "https://test.authorize.net/payment/payment" 
        : "https://accept.authorize.net/payment/payment";

    // CSP-Friendly HTML (No inline styles blocks, no scripts)
    const logoUrl = "https://static.wixstatic.com/media/4c5fc5_6b7ff53c83e74c10872eb2eecfa60466~mv2.avif";
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Secure Payment | SparkYourInsta</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; text-align: center; margin: 0; padding: 0; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); display: flex; align-items: center; justify-content: center; height: 100vh;">
        <div style="max-width: 450px; width: 90%; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,0.8);">
            
            <div style="margin-bottom: 25px;">
                <img src="${logoUrl}" alt="SparkYourInsta Logo" style="max-width: 180px; height: auto; margin-bottom: 15px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.05));">
            </div>

            <h2 style="color: #2d3436; margin: 0 0 10px 0; font-size: 24px; font-weight: 600;">Secure Checkout</h2>
            <p style="color: #636e72; font-size: 16px; line-height: 1.6; margin-bottom: 35px;">
                You're one step away! Click below to complete your payment securely via Authorize.Net.
            </p>
            
            <form id="authNetForm" method="POST" action="${actionUrl}">
                <input type="hidden" name="token" value="${token}" />
                <button type="submit" style="background: linear-gradient(to right, #00b4db, #0083b0); color: white; border: none; padding: 18px 30px; font-size: 18px; font-weight: 500; border-radius: 12px; cursor: pointer; width: 100%; transition: transform 0.2s; box-shadow: 0 4px 15px rgba(0, 180, 219, 0.3);">
                    Continue to Payment
                </button>
            </form>
            
            <div style="margin-top: 30px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b2bec3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <span style="font-size: 13px; color: #b2bec3; font-weight: 400;">Secure SSL Encrypted Connection</span>
            </div>
        </div>
    </body>
    </html>
    `;

    return response({
        status: 200,
        headers: {
            "Content-Type": "text/html",
            "Cache-Control": "no-cache"
        },
        body: html
    });
}
