import { createCheckout } from 'backend/authorize'; // Assuming the backend file is named authorize.jsw
import wixLocation from 'wix-location';

$w.onReady(function () {
    $w('#payButton').onClick(async () => {
        // Example checkout data
        const paymentData = {
            amount: "49.99",
            orderId: "ORDER-" + Date.now(),
            successUrl: wixLocation.baseUrl + "/success?orderId=ORDER-12345",
            cancelUrl: wixLocation.baseUrl + "/cancel",
            customerEmail: "customer@example.com",
            customerFirstName: "John",
            customerLastName: "Doe"
        };

        try {
            // Call the backend API to generate the Hosted Payment token
            const result = await createCheckout(paymentData);

            if (result.success) {
                // In Wix Velo, we cannot append forms directly to the DOM. 
                // We redirect to our custom HTTP function which returns an auto-submitting HTML form.
                const redirectUrl = `${wixLocation.baseUrl}/_functions/authorizeRedirect?token=${result.token}`;
                wixLocation.to(redirectUrl);
            } else {
                console.error("Authorize.Net Token Error: ", result.error);
                // Optionally show the error to the user in the UI
                // $w('#errorMessage').text = "Payment failed to initiate.";
                // $w('#errorMessage').show();
            }
        } catch (error) {
            console.error("Request Error: ", error);
        }
    });
});