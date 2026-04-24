import { response, ok, badRequest } from 'wix-http-functions';

// This HTTP function will handle the redirection to Authorize.net
// URL to access: https://<your-domain>/_functions/authorizeRedirect?token=<the_token>
export function get_authorizeRedirect(request) {
    const token = request.query.token;
    
    if (!token) {
        return badRequest({
            body: "Missing token parameter."
        });
    }

    // Production-only URL
    const actionUrl = "https://accept.authorize.net/payment/payment";

    // High-compatibility inline styles for Wix HTTP functions
    const html = `
    <!DOCTYPE html>
    <html style="background-color: #000000; margin: 0; padding: 0;">
    <head>
        <title>Secure Payment | Spark Media</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style="background-color: #000000; color: #ffffff; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; text-align: center;">
        
        <div style="max-width: 450px; width: 90%; background-color: #111111; padding: 50px 30px; border-radius: 24px; border: 1px solid #333333; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
            
            <div style="margin-bottom: 30px;">
                <h1 style="margin: 0; font-size: 36px; font-weight: 900; letter-spacing: -1px; color: #ffffff;">
                    SPARK <span style="color: #FFD700;">MEDIA</span>
                </h1>
                <p style="margin: 5px 0 0 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: #888888;">
                    Digital Advertising Agency
                </p>
            </div>

            <div style="height: 2px; width: 50px; background-color: #FFD700; margin: 0 auto 30px auto;"></div>

            <h2 style="color: #ffffff; margin: 0 0 15px 0; font-size: 24px; font-weight: 600;">Secure Checkout</h2>
            <p style="color: #aaaaaa; font-size: 15px; line-height: 1.6; margin-bottom: 40px;">
                Complete your transaction securely via Authorize.Net.
            </p>
            
            <form id="authNetForm" method="POST" action="${actionUrl}">
                <input type="hidden" name="token" value="${token}" />
                <button type="submit" style="background-color: #FFD700; color: #000000; border: none; padding: 20px 40px; font-size: 16px; font-weight: 800; border-radius: 12px; cursor: pointer; width: 100%; text-transform: uppercase; letter-spacing: 1px; transition: background 0.3s;">
                    COMPLETE PAYMENT
                </button>
            </form>
            
            <div style="margin-top: 35px; display: flex; align-items: center; justify-content: center; gap: 8px; color: #555555;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <span style="font-size: 11px; font-weight: 600; text-transform: uppercase;">SSL Encrypted</span>
            </div>
        </div>
    </body>
    </html>
    `;

    return ok({
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-cache"
        },
        body: html
    });
}
