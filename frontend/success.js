import wixLocationFrontend from 'wix-location-frontend';
import wixData from 'wix-data';

$w.onReady(function () {
    // 1. Get query parameters from the URL
    const query = wixLocationFrontend.query;
    
    // In rare cases (like clicking a mangled URL), query parameters can be arrays. This ensures we always get a string.
    const getParam = (param) => Array.isArray(param) ? param[0] : param;

    const status = getParam(query.status);
    const rawDescription = getParam(query.description);
    const description = rawDescription ? decodeURIComponent(rawDescription) : "";
    const amount = getParam(query.amount);
    const rawError = getParam(query.error);
    const errorMsg = rawError ? decodeURIComponent(rawError) : "";

    // 2. Update UI based on the status
    // We only use #statusHeading and #detailsText

    if (status && status.startsWith("success")) {
        // Success Mode
        $w("#statusHeading").text = "Payment Successful! 🎉";
        
        if (description && amount) {
            $w("#detailsText").text = `You successfully paid $${amount} for ${description}.`;
            $w("#detailsText").show();
        } else {
            $w("#detailsText").hide();
        }

    } else if (status && status.startsWith("failed")) {
        // Failed Mode
        $w("#statusHeading").text = "Payment Failed ❌";
        
        let detailsMessage = "";
        
        // Show the error reason
        if (errorMsg) {
            detailsMessage += `Reason: ${errorMsg}\n\n`;
        } else {
            detailsMessage += "Your transaction could not be processed. Please try again.\n\n";
        }
        
        // Show what they attempted to buy
        if (description && amount) {
            detailsMessage += `Attempted purchase: $${amount} for ${description}.`;
        }
        
        $w("#detailsText").text = detailsMessage.trim();
        $w("#detailsText").show();
        
    } else {
        // Fallback if accessed without query params
        $w("#statusHeading").text = "Order Status Unknown";
        $w("#detailsText").hide();
    }

    // 3. Insert order details into the Wix CMS 'OrderDetails' collection
    if (status) {
        const orderData = {
            status: status,
            description: description,
            amount: amount,
            error: errorMsg || null
        };

        wixData.insert("OrderDetails", orderData)
            .then((result) => {
                console.log("Order details successfully inserted:", result);
            })
            .catch((err) => {
                console.error("Failed to insert order details:", err);
            });
    }
});
