import wixWindow from 'wix-window';
// import {authorizeNetCharge} from 'backend/payment'
import { createTransaction, createTransactionNew } from 'backend/payment'
import wixData from 'wix-data';
import wixLocation from 'wix-location';

let price = '',
    data
$w.onReady(async function () {
    data = await wixWindow.lightbox.getContext()
    // console.log(data, 'data')
    $w('#followers').text = data.followers
    $w('#price').text = '$' + ' ' + data.pice
    price = data.price
    // console.log("data.pice", data.pice, Number(data.pice));
    // console.log("price: ", price, data.pice);

    $w('#continue').onClick(() => {
        // console.log("data.pice", data.pice);
        // console.log("price: ", price);
        if ($w('#user').valid && $w('#email').valid && $w('#phone').valid) {
            // console.log('success')
            $w('#user').collapse()
            $w('#email').collapse()
            $w('#phone').collapse()
            $w('#continue').collapse()
            $w("#paymentInfoBox").expand()
        } else {
            $w('#error').expand()
            setTimeout(() => {
                $w('#error').collapse()
            }, 3000);
        }
    })

});

async function processTransaction() {

    let data = await wixWindow.lightbox.getContext()
    // console.log(data, 'data')
    let currentPrice = Number(data.pice)
    // console.log("currentPrice", currentPrice);
    // console.log("price: ", price, data.pice);

    const paymentData = {
        amount: currentPrice,
        cardNumber: $w("#cardNumber").value,
        expirationDate: $w("#expirationMonth").value + $w("#expirationYear").value,
        cardCode: $w("#cardCvc").value,
        phone: $w("#phone").value,
        customerId: $w("#user").value,
        firstName: $w("#user").value,
        lastName: $w("#user").value,
        email: $w("#email").value,
        address: "local address - " + $w("#user").value,
        city: "city - " + $w("#user").value,
        state: "state - " + $w("#user").value,
        zip: "zip - " + $w("#user").value,
        country: "country - " + $w("#user").value,
    };

    // console.log(paymentData);

    const result = await createTransactionNew(paymentData);
    // console.log("result: ", result);
    if (result.messages.resultCode === "Error") {
        console.log("Error:", result.messages);
        return false
    } else {
        console.log("Transaction successful:", result);
        return "Payment Successfull."
    }
}

export async function payBtn_click(event) {
    $w("#payBtn").disable()
    if ($w("#cardNumber").valid && $w("#cardNumber").valid && $w("#cardNumber").valid) {
        let payment = await processTransaction();
        if (payment) {

            $w("#paymentSuccessMsg").text = "Payment Successfull."
            $w("#paymentSuccessMsg").show()
            // setTimeout(() => {

            let toInsert = {
                'userName': $w('#user').value,
                'phoneNumber': $w('#phone').value,
                'emailAddress': $w('#email').value,
                'noOfFollowers': data.followers,
                'price': data.pice
            }
            wixData.insert('BoughtServices', toInsert)
                .then(() => {
                    $w("#paymentSuccessMsg").hide()
                    wixLocation.to('/thank-you')
                    wixWindow.lightbox.close()
                })
            // }, 1000);
        } else {
            $w("#paymentSuccessMsg").text = "Payment failed. Please try again."
            $w("#payBtn").enable()
            $w("#paymentSuccessMsg").show()
            setTimeout(() => {
                $w("#paymentSuccessMsg").hide()
            }, 3000);
        }
    } else {
        $w("#payBtn").enable()
        $w("#paymentSuccessMsg").text = "Please fill all the fields correctly."
        $w("#paymentSuccessMsg").show()
        setTimeout(() => {
            $w("#paymentSuccessMsg").hide()
        }, 3000);
    }
}