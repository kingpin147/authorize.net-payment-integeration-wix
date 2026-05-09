import wixLocationFrontend from 'wix-location-frontend';
import wixData from 'wix-data';

$w.onReady(function () {
    // 1. Get query parameters from the URL
    const query = wixLocationFrontend.query;
    
    const getParam = (param) => Array.isArray(param) ? param[0] : param;

    const status = getParam(query.status);
    const amount = getParam(query.amount) || "0.00";
    const name = getParam(query.name) ? decodeURIComponent(getParam(query.name)) : "";
    const email = getParam(query.email) ? decodeURIComponent(getParam(query.email)) : "";
    const packages = getParam(query.packages) ? decodeURIComponent(getParam(query.packages)) : "";
    const servicesPrice = getParam(query.servicesPrice) ? decodeURIComponent(getParam(query.servicesPrice)) : "";
    const orderNumber = getParam(query.orderNumber) || `ORD-${Math.floor(Math.random() * 1000000)}`;
    const errorMsg = getParam(query.error) ? decodeURIComponent(getParam(query.error)) : "";

    // 2. Dummy Progress Bar Animation
    // Assuming your progress bar is named #progressBar1. Adjust the ID if different.
    let progress = 0;
    $w("#progressBar1").value = 0;
    const interval = setInterval(() => {
        progress += 5;
        if (progress <= 100) {
            $w("#progressBar1").value = progress;
        } else {
            clearInterval(interval);
        }
    }, 100); // Fills up over 2 seconds

    // 3. Update UI based on the status
    if (status === "success") {
        $w("#statusHeading").text = "Payment Successful! 🎉";
        
        const today = new Date().toLocaleDateString('en-GB');

        $w("#orderNumber").text = `Order #${orderNumber}`;
        $w("#dateText").text = today;
        $w("#totalPrice").text = `$${amount}`;

        let packageList = packages ? packages.split(",").map(p => p.trim()) : [];
        let priceList = servicesPrice ? servicesPrice.split(",").map(p => p.trim()) : [];

        let repeaterData = [];
        
        const lineItemsParam = getParam(query.lineItems) ? decodeURIComponent(getParam(query.lineItems)) : "";
        if (lineItemsParam) {
            try {
                const parsedItems = JSON.parse(lineItemsParam);
                repeaterData = parsedItems.map((item, index) => ({
                    "_id": `item-${index}`,
                    "serviceName": item.name,
                    "servicePrice": item.price
                }));
            } catch (e) {
                console.error("Failed to parse lineItems", e);
            }
        }
        
        // Fallback to old comma-separated logic if lineItems parsing failed or is empty
        if (repeaterData.length === 0) {
            repeaterData = packageList.map((pkg, index) => {
                let price = priceList[index] || amount;
                if (price && !price.startsWith('$')) {
                    price = `$${price}`;
                }
                return {
                    "_id": `item-${index}`,
                    "serviceName": pkg,
                    "servicePrice": price
                };
            });
        }

        $w("#servicesRepeater").onItemReady(($item, itemData) => {
            $item("#serviceName").text = itemData.serviceName;
            $item("#servicePrice").text = itemData.servicePrice;
        });

        $w("#servicesRepeater").data = repeaterData;
        $w("#servicesRepeater").show();
    } else if (status === "failed") {
        $w("#statusHeading").text = "Payment Failed ❌";
        
        let detailsMessage = "";
        if (errorMsg) {
            detailsMessage += `Reason: ${errorMsg}\n\n`;
        } else {
            detailsMessage += "Your transaction could not be processed. Please try again.\n\n";
        }
        
        if (packages && amount) {
            detailsMessage += `Attempted purchase: $${amount} for ${packages}.`;
        }
        
        $w("#orderDetails").text = detailsMessage.trim();
        $w("#orderDetails").show();
    } else {
        $w("#statusHeading").text = "Order Status Unknown";
        $w("#orderDetails").hide();
    }

    // 4. Insert order details into the Wix CMS 'OrderDetails' collection
    if (status) {
        const orderData = {
            status: status,
            description: packages,
            amount: amount,
            email: email || null,
            name: name || null,
            orderNumber: orderNumber,
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
