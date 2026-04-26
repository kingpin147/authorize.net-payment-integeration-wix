import wixWindow from 'wix-window';

import wixData from 'wix-data';
$w.onReady(function () {

    wixData.query('PaidPlans/Plans').limit(4).find().then((results) => {
        //console.log(results.items)
        $w('#repeater1').data = results.items
    })
    // wixData.query('PaidPlans/Plans').skip(4).find().then((result) => {
    //     console.log(result.items)
    //     $w('#repeater2').data = result.items
    //     //$w('#repeater1').data=results.items
    // })

})

export function repeater1_itemReady($item, itemData, index) {
    //console.log(itemData,'itemData')
    console.log("ItemData: ", itemData);
    if ((index + 1) === $w("#repeater1").data.length) {
        $w("#repeater1").show()

    }
    $item('#name').text = itemData.name
    $item('#price').text = '$' + ' ' + itemData.price
    $item('#price2').text = '$' + ' ' + itemData.price
    $item('#tagline').text = itemData.tagline
    //  if(itemData.name!=='Premium' || itemData.name!=='VIP'){
    // 	 console.log(itemData.name,'name')
    // 	 $item('#plane').collapse()
    // 	  $item('#priority').collapse()
    //  }
    //  if(itemData.name==='Premium' || itemData.name==='VIP'){
    // 	 console.log(itemData.name,'name')
    // 	  $item('#plane').expand()
    // 	   $item('#priority').expand()
    //  }
    // $w("#sleevesRepeater").forEachItem(($innerItem, innerItemData, innerIndex) => {
    //         if (itemData._id !== innerItemData._id) {
    //             $innerItem("#sleevesColorBox").hide();
    //         } else {
    //             $innerItem("#sleevesColorBox").show();
    //         }
    //     });
    $item('#container2').onMouseIn(() => {
        $item('#price2').show()
        $item('#price').hide()
    });

    $item('#container2').onMouseOut(() => {
        $item('#price2').hide()
        $item('#price').show()
    });

    $item('#buynow').onClick(() => {
        let data = {
            'followers': itemData.benefits[0],
            'pice': itemData.price
        }
        wixWindow.openLightbox('continue', data)

    })
    console.log(itemData.benefits.length, 'length')

    if (wixWindow.formFactor === "Mobile") {
        if (itemData.benefits.length === 13) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').text = '✔' + " " + itemData.benefits[4]
            $item('#benefits5').text = '✔' + " " + itemData.benefits[5]
            $item('#benefits6').text = '✔' + " " + itemData.benefits[6]
            $item('#benefits7').text = '✔' + " " + itemData.benefits[7]
            $item('#benefits8').text = '✔' + " " + itemData.benefits[8]
            $item('#benefits9').text = '✔' + " " + itemData.benefits[9]
            $item('#benefits10').text = '✔' + " " + itemData.benefits[10]
            $item('#benefits11').text = '✔' + " " + itemData.benefits[11]
            $item('#benefits12').text = '✔' + " " + itemData.benefits[12]

        }
        if (itemData.benefits.length === 12) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').text = '✔' + " " + itemData.benefits[4]
            $item('#benefits5').text = '✔' + " " + itemData.benefits[5]
            $item('#benefits6').text = '✔' + " " + itemData.benefits[6]
            $item('#benefits7').text = '✔' + " " + itemData.benefits[7]
            $item('#benefits8').text = '✔' + " " + itemData.benefits[8]
            $item('#benefits9').text = '✔' + " " + itemData.benefits[9]
            $item('#benefits10').text = '✔' + " " + itemData.benefits[10]
            $item('#benefits11').text = '✔' + " " + itemData.benefits[11]
            $item('#benefits12').collapse()

        }
        if (itemData.benefits.length === 11) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').text = '✔' + " " + itemData.benefits[4]
            $item('#benefits5').text = '✔' + " " + itemData.benefits[5]
            $item('#benefits6').text = '✔' + " " + itemData.benefits[6]
            $item('#benefits7').text = '✔' + " " + itemData.benefits[7]
            $item('#benefits8').text = '✔' + " " + itemData.benefits[8]
            $item('#benefits9').text = '✔' + " " + itemData.benefits[9]
            $item('#benefits10').text = '✔' + " " + itemData.benefits[10]
            $item('#benefits11').collapse()
            $item('#benefits12').collapse()

        }
        if (itemData.benefits.length === 10) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').text = '✔' + " " + itemData.benefits[4]
            $item('#benefits5').text = '✔' + " " + itemData.benefits[5]
            $item('#benefits6').text = '✔' + " " + itemData.benefits[6]
            $item('#benefits7').text = '✔' + " " + itemData.benefits[7]
            $item('#benefits8').text = '✔' + " " + itemData.benefits[8]
            $item('#benefits9').text = '✔' + " " + itemData.benefits[9]
            $item('#benefits10').collapse()
            $item('#benefits11').collapse()
            $item('#benefits12').collapse()

        }
        if (itemData.benefits.length === 9) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').text = '✔' + " " + itemData.benefits[4]
            $item('#benefits5').text = '✔' + " " + itemData.benefits[5]
            $item('#benefits6').text = '✔' + " " + itemData.benefits[6]
            $item('#benefits7').text = '✔' + " " + itemData.benefits[7]
            $item('#benefits8').text = '✔' + " " + itemData.benefits[8]
            $item('#benefits9').collapse()
            $item('#benefits10').collapse()
            $item('#benefits11').collapse()
            $item('#benefits12').collapse()

        }
        if (itemData.benefits.length === 8) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').text = '✔' + " " + itemData.benefits[4]
            $item('#benefits5').text = '✔' + " " + itemData.benefits[5]
            $item('#benefits6').text = '✔' + " " + itemData.benefits[6]
            $item('#benefits7').text = '✔' + " " + itemData.benefits[7]
            $item('#benefits8').collapse()
            $item('#benefits9').collapse()
            $item('#benefits10').collapse()
            $item('#benefits11').collapse()
            $item('#benefits12').collapse()

        }
        if (itemData.benefits.length === 7) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').text = '✔' + " " + itemData.benefits[4]
            $item('#benefits5').text = '✔' + " " + itemData.benefits[5]
            $item('#benefits6').text = '✔' + " " + itemData.benefits[6]
            $item('#benefits7').collapse()
            $item('#benefits8').collapse()
            $item('#benefits9').code()
            $item('#benefits10').collapse()
            $item('#benefits11').collapse()
            $item('#benefits12').collapse()

        }
        if (itemData.benefits.length === 6) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').text = '✔' + " " + itemData.benefits[4]
            $item('#benefits5').text = '✔' + " " + itemData.benefits[5]
            $item('#benefits6').collapse()
            $item('#benefits7').collapse()
            $item('#benefits8').collapse()
            $item('#benefits9').collapse()
            $item('#benefits10').collapse()
            $item('#benefits11').collapse()
            $item('#benefits12').collapse()

        }
        if (itemData.benefits.length === 5) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').text = '✔' + " " + itemData.benefits[4]
            $item('#benefits5').collapse()
            $item('#benefits6').collapse()
            $item('#benefits7').collapse()
            $item('#benefits8').collapse()
            $item('#benefits9').collapse()
            $item('#benefits10').collapse()
            $item('#benefits11').collapse()
            $item('#benefits12').collapse()

        }
        if (itemData.benefits.length === 4) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').collapse()
            $item('#benefits5').collapse()
            $item('#benefits6').collapse()
            $item('#benefits7').collapse()
            $item('#benefits8').collapse()
            $item('#benefits9').collapse()
            $item('#benefits10').collapse()
            $item('#benefits11').collapse()
            $item('#benefits12').collapse()

        }
    } else {
        if (itemData.benefits.length === 13) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').text = '✔' + " " + itemData.benefits[4]
            $item('#benefits5').text = '✔' + " " + itemData.benefits[5]
            $item('#benefits6').text = '✔' + " " + itemData.benefits[6]
            $item('#benefits7').text = '✔' + " " + itemData.benefits[7]
            $item('#benefits8').text = '✔' + " " + itemData.benefits[8]
            $item('#benefits9').text = '✔' + " " + itemData.benefits[9]
            $item('#benefits10').text = '✔' + " " + itemData.benefits[10]
            $item('#benefits11').text = '✔' + " " + itemData.benefits[11]
            $item('#benefits12').text = '✔' + " " + itemData.benefits[12]

        }
        if (itemData.benefits.length === 12) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').text = '✔' + " " + itemData.benefits[4]
            $item('#benefits5').text = '✔' + " " + itemData.benefits[5]
            $item('#benefits6').text = '✔' + " " + itemData.benefits[6]
            $item('#benefits7').text = '✔' + " " + itemData.benefits[7]
            $item('#benefits8').text = '✔' + " " + itemData.benefits[8]
            $item('#benefits9').text = '✔' + " " + itemData.benefits[9]
            $item('#benefits10').text = '✔' + " " + itemData.benefits[10]
            $item('#benefits11').text = '✔' + " " + itemData.benefits[11]
            $item('#benefits12').hide()

        }
        if (itemData.benefits.length === 11) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').text = '✔' + " " + itemData.benefits[4]
            $item('#benefits5').text = '✔' + " " + itemData.benefits[5]
            $item('#benefits6').text = '✔' + " " + itemData.benefits[6]
            $item('#benefits7').text = '✔' + " " + itemData.benefits[7]
            $item('#benefits8').text = '✔' + " " + itemData.benefits[8]
            $item('#benefits9').text = '✔' + " " + itemData.benefits[9]
            $item('#benefits10').text = '✔' + " " + itemData.benefits[10]
            $item('#benefits11').hide()
            $item('#benefits12').hide()

        }
        if (itemData.benefits.length === 10) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').text = '✔' + " " + itemData.benefits[4]
            $item('#benefits5').text = '✔' + " " + itemData.benefits[5]
            $item('#benefits6').text = '✔' + " " + itemData.benefits[6]
            $item('#benefits7').text = '✔' + " " + itemData.benefits[7]
            $item('#benefits8').text = '✔' + " " + itemData.benefits[8]
            $item('#benefits9').text = '✔' + " " + itemData.benefits[9]
            $item('#benefits10').hide()
            $item('#benefits11').hide()
            $item('#benefits12').hide()

        }
        if (itemData.benefits.length === 9) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').text = '✔' + " " + itemData.benefits[4]
            $item('#benefits5').text = '✔' + " " + itemData.benefits[5]
            $item('#benefits6').text = '✔' + " " + itemData.benefits[6]
            $item('#benefits7').text = '✔' + " " + itemData.benefits[7]
            $item('#benefits8').text = '✔' + " " + itemData.benefits[8]
            $item('#benefits9').hide()
            $item('#benefits10').hide()
            $item('#benefits11').hide()
            $item('#benefits12').hide()

        }
        if (itemData.benefits.length === 8) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').text = '✔' + " " + itemData.benefits[4]
            $item('#benefits5').text = '✔' + " " + itemData.benefits[5]
            $item('#benefits6').text = '✔' + " " + itemData.benefits[6]
            $item('#benefits7').text = '✔' + " " + itemData.benefits[7]
            $item('#benefits8').hide()
            $item('#benefits9').hide()
            $item('#benefits10').hide()
            $item('#benefits11').hide()
            $item('#benefits12').hide()

        }
        if (itemData.benefits.length === 7) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').text = '✔' + " " + itemData.benefits[4]
            $item('#benefits5').text = '✔' + " " + itemData.benefits[5]
            $item('#benefits6').text = '✔' + " " + itemData.benefits[6]
            $item('#benefits7').hide()
            $item('#benefits8').hide()
            $item('#benefits9').hide()
            $item('#benefits10').hide()
            $item('#benefits11').hide()
            $item('#benefits12').hide()

        }
        if (itemData.benefits.length === 6) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').text = '✔' + " " + itemData.benefits[4]
            $item('#benefits5').text = '✔' + " " + itemData.benefits[5]
            $item('#benefits6').hide()
            $item('#benefits7').hide()
            $item('#benefits8').hide()
            $item('#benefits9').hide()
            $item('#benefits10').hide()
            $item('#benefits11').hide()
            $item('#benefits12').hide()

        }
        if (itemData.benefits.length === 5) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').text = '✔' + " " + itemData.benefits[4]
            $item('#benefits5').hide()
            $item('#benefits6').hide()
            $item('#benefits7').hide()
            $item('#benefits8').hide()
            $item('#benefits9').hide()
            $item('#benefits10').hide()
            $item('#benefits11').hide()
            $item('#benefits12').hide()

        }
        if (itemData.benefits.length === 4) {
            $item('#benefits').text = '✔' + " " + itemData.benefits[0]
            $item('#benefits1').text = '✔' + " " + itemData.benefits[1]
            $item('#benefits2').text = '✔' + " " + itemData.benefits[2]
            $item('#benefits3').text = '✔' + " " + itemData.benefits[3]
            $item('#benefits4').hide()
            $item('#benefits5').hide()
            $item('#benefits6').hide()
            $item('#benefits7').hide()
            $item('#benefits8').hide()
            $item('#benefits9').hide()
            $item('#benefits10').hide()
            $item('#benefits11').hide()
            $item('#benefits12').hide()

        }
    }
}

// export function repeater2_itemReady($item, itemData) {
//     //console.log(itemData,'itemData')
//     $item('#name1').text = itemData.name
//     $item('#price1').text = '$' + ' ' + itemData.price
//     $item('#tagline1').text = itemData.tagline

//     $item('#buynow1').onClick(() => {
//         let data = {
//             'followers': itemData.benefits[0],
//             'pice': itemData.price
//         }
//         wixWindow.openLightbox('continue', data)
//     })

//     console.log(itemData.benefits.length, 'length')

//     if (wixWindow.formFactor === "Mobile") {
//         if (itemData.benefits.length === 13) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').text = '✔' + itemData.benefits[4]
//             $item('#benefit5').text = '✔' + itemData.benefits[5]
//             $item('#benefit6').text = '✔' + itemData.benefits[6]
//             $item('#benefit7').text = '✔' + itemData.benefits[7]
//             $item('#benefit8').text = '✔' + itemData.benefits[8]
//             $item('#benefit9').text = '✔' + itemData.benefits[9]
//             $item('#benefit10').text = '✔' + itemData.benefits[10]
//             $item('#benefit11').text = '✔' + itemData.benefits[11]
//             $item('#benefit12').text = '✔' + itemData.benefits[12]

//         }
//         if (itemData.benefits.length === 12) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').text = '✔' + itemData.benefits[4]
//             $item('#benefit5').text = '✔' + itemData.benefits[5]
//             $item('#benefit6').text = '✔' + itemData.benefits[6]
//             $item('#benefit7').text = '✔' + itemData.benefits[7]
//             $item('#benefit8').text = '✔' + itemData.benefits[8]
//             $item('#benefit9').text = '✔' + itemData.benefits[9]
//             $item('#benefit10').text = '✔' + itemData.benefits[10]
//             $item('#benefit11').text = '✔' + itemData.benefits[11]
//             $item('#benefit12').collapse()

//         }
//         if (itemData.benefits.length === 11) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').text = '✔' + itemData.benefits[4]
//             $item('#benefit5').text = '✔' + itemData.benefits[5]
//             $item('#benefit6').text = '✔' + itemData.benefits[6]
//             $item('#benefit7').text = '✔' + itemData.benefits[7]
//             $item('#benefit8').text = '✔' + itemData.benefits[8]
//             $item('#benefit9').text = '✔' + itemData.benefits[9]
//             $item('#benefit10').text = '✔' + itemData.benefits[10]
//             $item('#benefit11').collapse()
//             $item('#benefit12').collapse()

//         }
//         if (itemData.benefits.length === 10) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').text = '✔' + itemData.benefits[4]
//             $item('#benefit5').text = '✔' + itemData.benefits[5]
//             $item('#benefit6').text = '✔' + itemData.benefits[6]
//             $item('#benefit7').text = '✔' + itemData.benefits[7]
//             $item('#benefit8').text = '✔' + itemData.benefits[8]
//             $item('#benefit9').text = '✔' + itemData.benefits[9]
//             $item('#benefit10').collapse()
//             $item('#benefit11').collapse()
//             $item('#benefit12').collapse()

//         }
//         if (itemData.benefits.length === 9) {
//             $item('#benefits').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').text = '✔' + itemData.benefits[4]
//             $item('#benefit5').text = '✔' + itemData.benefits[5]
//             $item('#benefit6').text = '✔' + itemData.benefits[6]
//             $item('#benefit7').text = '✔' + itemData.benefits[7]
//             $item('#benefit8').text = '✔' + itemData.benefits[8]
//             $item('#benefit9').collapse()
//             $item('#benefit10').collapse()
//             $item('#benefit11').collapse()
//             $item('#benefit12').collapse()

//         }
//         if (itemData.benefits.length === 8) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').text = '✔' + itemData.benefits[4]
//             $item('#benefit5').text = '✔' + itemData.benefits[5]
//             $item('#benefit6').text = '✔' + itemData.benefits[6]
//             $item('#benefit7').text = '✔' + itemData.benefits[7]
//             $item('#benefit8').collapse()
//             $item('#benefit9').collapse()
//             $item('#benefit10').collapse()
//             $item('#benefit11').collapse()
//             $item('#benefit12').collapse()

//         }
//         if (itemData.benefits.length === 7) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').text = '✔' + itemData.benefits[4]
//             $item('#benefit5').text = '✔' + itemData.benefits[5]
//             $item('#benefit6').text = '✔' + itemData.benefits[6]
//             $item('#benefit7').collapse()
//             $item('#benefit8').collapse()
//             $item('#benefit9').code()
//             $item('#benefit10').collapse()
//             $item('#benefit11').collapse()
//             $item('#benefit12').collapse()

//         }
//         if (itemData.benefits.length === 6) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').text = '✔' + itemData.benefits[4]
//             $item('#benefit5').text = '✔' + itemData.benefits[5]
//             $item('#benefit6').collapse()
//             $item('#benefit7').collapse()
//             $item('#benefit8').collapse()
//             $item('#benefit9').collapse()
//             $item('#benefit10').collapse()
//             $item('#benefit11').collapse()
//             $item('#benefit12').collapse()

//         }
//         if (itemData.benefits.length === 5) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').text = '✔' + itemData.benefits[4]
//             $item('#benefit5').collapse()
//             $item('#benefit6').collapse()
//             $item('#benefit7').collapse()
//             $item('#benefit8').collapse()
//             $item('#benefit9').collapse()
//             $item('#benefit10').collapse()
//             $item('#benefit11').collapse()
//             $item('#benefit12').collapse()

//         }
//         if (itemData.benefits.length === 4) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').collapse()
//             $item('#benefit5').collapse()
//             $item('#benefit6').collapse()
//             $item('#benefit7').collapse()
//             $item('#benefit8').collapse()
//             $item('#benefit9').collapse()
//             $item('#benefit10').collapse()
//             $item('#benefit11').collapse()
//             $item('#benefit12').collapse()

//         }
//     } else {
//         if (itemData.benefits.length === 13) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').text = '✔' + itemData.benefits[4]
//             $item('#benefit5').text = '✔' + itemData.benefits[5]
//             $item('#benefit6').text = '✔' + itemData.benefits[6]
//             $item('#benefit7').text = '✔' + itemData.benefits[7]
//             $item('#benefit8').text = '✔' + itemData.benefits[8]
//             $item('#benefit9').text = '✔' + itemData.benefits[9]
//             $item('#benefit10').text = '✔' + itemData.benefits[10]
//             $item('#benefit11').text = '✔' + itemData.benefits[11]
//             $item('#benefit12').text = '✔' + itemData.benefits[12]

//         }
//         if (itemData.benefits.length === 12) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').text = '✔' + itemData.benefits[4]
//             $item('#benefit5').text = '✔' + itemData.benefits[5]
//             $item('#benefit6').text = '✔' + itemData.benefits[6]
//             $item('#benefit7').text = '✔' + itemData.benefits[7]
//             $item('#benefit8').text = '✔' + itemData.benefits[8]
//             $item('#benefit9').text = '✔' + itemData.benefits[9]
//             $item('#benefit10').text = '✔' + itemData.benefits[10]
//             $item('#benefit11').text = '✔' + itemData.benefits[11]
//             $item('#benefit12').hide()

//         }
//         if (itemData.benefits.length === 11) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').text = '✔' + itemData.benefits[4]
//             $item('#benefit5').text = '✔' + itemData.benefits[5]
//             $item('#benefit6').text = '✔' + itemData.benefits[6]
//             $item('#benefit7').text = '✔' + itemData.benefits[7]
//             $item('#benefit8').text = '✔' + itemData.benefits[8]
//             $item('#benefit9').text = '✔' + itemData.benefits[9]
//             $item('#benefit10').text = '✔' + itemData.benefits[10]
//             $item('#benefit11').hide()
//             $item('#benefit12').hide()

//         }
//         if (itemData.benefits.length === 10) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').text = '✔' + itemData.benefits[4]
//             $item('#benefit5').text = '✔' + itemData.benefits[5]
//             $item('#benefit6').text = '✔' + itemData.benefits[6]
//             $item('#benefit7').text = '✔' + itemData.benefits[7]
//             $item('#benefit8').text = '✔' + itemData.benefits[8]
//             $item('#benefit9').text = '✔' + itemData.benefits[9]
//             $item('#benefit10').hide()
//             $item('#benefit11').hide()
//             $item('#benefit12').hide()

//         }
//         if (itemData.benefits.length === 9) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').text = '✔' + itemData.benefits[4]
//             $item('#benefit5').text = '✔' + itemData.benefits[5]
//             $item('#benefit6').text = '✔' + itemData.benefits[6]
//             $item('#benefit7').text = '✔' + itemData.benefits[7]
//             $item('#benefit8').text = '✔' + itemData.benefits[8]
//             $item('#benefit9').hide()
//             $item('#benefit10').hide()
//             $item('#benefit11').hide()
//             $item('#benefit12').hide()

//         }
//         if (itemData.benefits.length === 8) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').text = '✔' + itemData.benefits[4]
//             $item('#benefit5').text = '✔' + itemData.benefits[5]
//             $item('#benefit6').text = '✔' + itemData.benefits[6]
//             $item('#benefit7').text = '✔' + itemData.benefits[7]
//             $item('#benefit8').hide()
//             $item('#benefit9').hide()
//             $item('#benefit10').hide()
//             $item('#benefit11').hide()
//             $item('#benefit12').hide()

//         }
//         if (itemData.benefits.length === 7) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').text = '✔' + itemData.benefits[4]
//             $item('#benefit5').text = '✔' + itemData.benefits[5]
//             $item('#benefit6').text = '✔' + itemData.benefits[6]
//             $item('#benefit7').hide()
//             $item('#benefit8').hide()
//             $item('#benefit9').hide()
//             $item('#benefit10').hide()
//             $item('#benefit11').hide()
//             $item('#benefit12').hide()

//         }
//         if (itemData.benefits.length === 6) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').text = '✔' + itemData.benefits[4]
//             $item('#benefit5').text = '✔' + itemData.benefits[5]
//             $item('#benefit6').hide()
//             $item('#benefit7').hide()
//             $item('#benefit8').hide()
//             $item('#benefit9').hide()
//             $item('#benefit10').hide()
//             $item('#benefit11').hide()
//             $item('#benefit12').hide()

//         }
//         if (itemData.benefits.length === 5) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').text = '✔' + itemData.benefits[4]
//             $item('#benefit5').hide()
//             $item('#benefit6').hide()
//             $item('#benefit7').hide()
//             $item('#benefit8').hide()
//             $item('#benefit9').hide()
//             $item('#benefit10').hide()
//             $item('#benefit11').hide()
//             $item('#benefit12').hide()

//         }
//         if (itemData.benefits.length === 4) {
//             $item('#benefit').text = '✔' + itemData.benefits[0]
//             $item('#benefit1').text = '✔' + itemData.benefits[1]
//             $item('#benefit2').text = '✔' + itemData.benefits[2]
//             $item('#benefit3').text = '✔' + itemData.benefits[3]
//             $item('#benefit4').hide()
//             $item('#benefit5').hide()
//             $item('#benefit6').hide()
//             $item('#benefit7').hide()
//             $item('#benefit8').hide()
//             $item('#benefit9').hide()
//             $item('#benefit10').hide()
//             $item('#benefit11').hide()
//             $item('#benefit12').hide()

//         }
//     }
// }