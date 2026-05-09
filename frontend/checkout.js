import wixLocationFrontend from 'wix-location-frontend';
import wixData from 'wix-data';
import { session } from 'wix-storage';
import { createTransaction } from 'backend/authorizeIntegration';

let cartItems = [];
let checkoutTotal = 0;

$w.onReady(function () {
    loadCheckout();
    $w("#payNow").onClick(handlePayment);
});

/* =====================================
   LOAD CHECKOUT DATA
===================================== */

function loadCheckout() {
    try {
        const storedCart = session.getItem("serviceCart");

        if (!storedCart) {
            wixLocationFrontend.to("/");
            return;
        }

        cartItems = JSON.parse(storedCart);

        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            wixLocationFrontend.to("/");
            return;
        }

        checkoutTotal = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

        const emailItem = cartItems.find(item => item.email);
        if (emailItem && emailItem.email) {
            $w("#emailText").text = emailItem.email;
        } else {
            $w("#emailText").text = "Login or Sign Up";
        }

        $w("#subtotalText").text = `$${checkoutTotal.toFixed(2)}`;
        $w("#totalText").text = `$${checkoutTotal.toFixed(2)}`;
        $w("#payNow").label = `🔒 Pay $${checkoutTotal.toFixed(2)}`;

        if ($w("#checkoutRepeater")) {
            // Give each item a guaranteed _id for repeater using their cartId or a fallback
            $w("#checkoutRepeater").data = cartItems.map((item, index) => ({
                ...item,
                _id: item.cartId || `item-${index}`
            }));

            $w("#checkoutRepeater").onItemReady(($item, itemData) => {
                $item("#serviceName").text = itemData.packageName || "";
                $item("#servicePrice").text = `$${Number(itemData.price || 0).toFixed(2)}`;
            });
        }
    } catch (err) {
        console.error("LOAD CHECKOUT ERROR:", err);
        wixLocationFrontend.to("/");
    }
}

/* =====================================
   PAYMENT
===================================== */

async function handlePayment() {
    const cardName = $w("#cardName").value;
    const cardNumber = $w("#cardNumber").value;
    const expMonth = $w("#expirationMonth").value;
    const expYear = $w("#expirationYear").value;
    const cardCode = $w("#cardCvc").value;
    const zipCode = $w("#zipCode").value;

    if (!cardName || !cardNumber || !expMonth || !expYear || !cardCode || !zipCode) {
        showError("Please fill all payment fields");
        return;
    }

    $w("#payNow").disable();
    $w("#payNow").label = "Processing...";

    try {
        const orderNumber = `ORD-${Date.now()}`;
        const packageNames = cartItems.map(item => item.packageName).join(", ");
        const servicesPrices = cartItems.map(item => `$${Number(item.price).toFixed(2)}`).join(", ");
        
        // Create a structured line items array for the thank you page
        const lineItemsStr = JSON.stringify(cartItems.map(item => ({
            name: item.packageName,
            price: `$${Number(item.price).toFixed(2)}`
        })));
        
        // Pick the email/username from the first cart item that has them
        const emailItem = cartItems.find(item => item.email) || {};
        const email = emailItem.email || "";
        const usernameItem = cartItems.find(item => item.username) || {};
        const username = usernameItem.username || cardName;

        const descriptionText = packageNames;

        const successUrl = `https://www.sparkyourinsta.com/thank-you?name=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&packages=${encodeURIComponent(packageNames)}&servicesPrice=${encodeURIComponent(servicesPrices)}&lineItems=${encodeURIComponent(lineItemsStr)}&amount=${checkoutTotal}&orderNumber=${orderNumber}&status=success`;
        const cancelUrl = `https://www.sparkyourinsta.com/thank-you?name=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&packages=${encodeURIComponent(packageNames)}&servicesPrice=${encodeURIComponent(servicesPrices)}&lineItems=${encodeURIComponent(lineItemsStr)}&amount=${checkoutTotal}&orderNumber=${orderNumber}&status=failed`;

        // Determine if expYear is 2 or 4 digits
        const formattedYear = expYear.length === 2 ? `20${expYear}` : expYear;

        const paymentData = {
            amount: Number(checkoutTotal),
            cardNumber: cardNumber,
            expirationDate: `${formattedYear}-${expMonth}`,
            cardCode: cardCode,
            email: email,
            firstName: username,
            lastName: zipCode,
            description: descriptionText,
            customerId: "CUST-" + Date.now(),
            invoiceNumber: orderNumber, // Authorize.net supports invoiceNumber for orders
            successUrl,
            cancelUrl
        };

        console.log("PAYMENT DATA:", paymentData);
        const result = await createTransaction(paymentData);
        console.log(result);

        if (result.success) {
            await saveOrder(result);
            session.removeItem("serviceCart"); // Clear the cart on successful checkout
            wixLocationFrontend.to(successUrl);
        } else {
            showError(result.error || "Payment failed");
        }
    } catch (err) {
        console.error(err);
        showError("Checkout failed");
    }

    $w("#payNow").enable();
    $w("#payNow").label = `🔒 Pay $${checkoutTotal.toFixed(2)}`;
}

/* =====================================
   SAVE ORDERS
===================================== */

async function saveOrder(result) {
    try {
        const savePromises = cartItems.map(item => {
            // Note: Re-calculating orderNumber if needed, but it's generated above. To save the exact orderNumber from payment:
            // Let's pass it from handlePayment or generate inside. But wixData.insert uses _id for the main ID.
            const orderData = {
                service: item.serviceType,
                packageName: item.packageName,
                amount: Number(item.price),
                paymentId: result.transactionId || "",
                status: "Paid",
                orderDate: new Date()
            };
            return wixData.insert("Orders", orderData);
        });

        await Promise.all(savePromises);
        console.log("ALL ORDERS SAVED");
    } catch (err) {
        console.error("SAVE ERROR:", err);
    }
}

/* =====================================
   ERROR UI
===================================== */

function showError(message) {
    $w("#errorText").text = message;
    $w("#errorText").show();
}