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

    const isSandbox = false; // Set to false for production
    const actionUrl = isSandbox 
        ? "https://test.authorize.net/payment/payment" 
        : "https://accept.authorize.net/payment/payment";

    // Create an HTML response that automatically submits the form to Authorize.net
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Redirecting to Secure Payment...</title>
        <style>
            body { 
                font-family: 'Inter', Arial, sans-serif; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                margin: 0; 
                background-color: #f9f9f9; 
            }
            .loader { 
                border: 4px solid #f3f3f3; 
                border-top: 4px solid #3498db; 
                border-radius: 50%; 
                width: 40px; 
                height: 40px; 
                animation: spin 1s linear infinite; 
                margin: 0 auto 20px auto; 
            }
            @keyframes spin { 
                0% { transform: rotate(0deg); } 
                100% { transform: rotate(360deg); } 
            }
            .container { text-align: center; }
            h2 { color: #333; margin-bottom: 10px; }
            p { color: #666; }
        </style>
    </head>
    <body onload="document.getElementById('authNetForm').submit();">
        <div class="container">
            <div class="loader"></div>
            <h2>Redirecting to secure payment page...</h2>
            <p>Please wait while we transfer you to Authorize.Net.</p>
        </div>
        <form id="authNetForm" method="POST" action="${actionUrl}">
            <input type="hidden" name="token" value="${token}" />
        </form>
    </body>
    </html>
    `;

    return response({
        status: 200,
        headers: {
            "Content-Type": "text/html"
        },
        body: html
    });
}
