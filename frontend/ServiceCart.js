import wixWindow from 'wix-window';
import wixLocationFrontend from 'wix-location-frontend';
import { session } from 'wix-storage';

$w.onReady(function () {

    loadCart();

    $w("#clearCartBtn")
        .onClick(clearAllCart);

    $w("#checkoutBtn")
        .onClick(goCheckout);

});

/* =====================================
   LOAD CART
===================================== */

function loadCart() {

    try {

        const cart = JSON.parse(
            session.getItem("serviceCart") || "[]"
        );

        console.log("CART:", cart);

        const subtotal = cart.reduce(
            (sum, item) =>
                sum + (Number(item.price) || 0),
            0
        );

        $w("#cartCountText").text =
            `🛒 Your Cart (${cart.length})`;

        $w("#subtotalText").text =
            `$${subtotal.toFixed(2)}`;
console.log(
    "REPEATER DATA:",
    JSON.stringify(cart)
);
        const cartData = cart.map(item => ({
            ...item,
            _id: item.cartId // Repeaters strictly require an '_id' field
        }));

        $w("#cartRepeater").data = cartData;

        // Disable checkout if cart is empty
        if (cart.length === 0) {
            $w("#checkoutBtn").disable();
        } else {
            $w("#checkoutBtn").enable();
        }
        $w("#cartRepeater").onItemReady(
            ($item, itemData, index) => {

                const price =
                    Number(itemData.price) || 0;

                $item("#serviceName").text =
                    itemData.packageName || "";

                $item("#servicePrice").text =
                    `$${price.toFixed(2)}`;

                $item("#removeBtn")
                    .onClick(() => {

                        removeCartItem(
                            itemData.cartId
                        );

                    });

            }
        );

    } catch (error) {

        console.error(
            "LOAD CART ERROR:",
            error
        );

    }

}

/* =====================================
   REMOVE ITEM
===================================== */

function removeCartItem(cartId) {

    const cart = JSON.parse(
        session.getItem("serviceCart") || "[]"
    );

    const updatedCart = cart.filter(
        item => item.cartId !== cartId
    );

    session.setItem(
        "serviceCart",
        JSON.stringify(updatedCart)
    );

    loadCart();

}

/* =====================================
   CLEAR CART
===================================== */

function clearAllCart() {

    session.setItem(
        "serviceCart",
        JSON.stringify([])
    );

    loadCart();

}

/* =====================================
   CHECKOUT
===================================== */

function goCheckout() {

    wixWindow.lightbox.close();

    wixLocationFrontend.to(
        "/checkout"
    );

}