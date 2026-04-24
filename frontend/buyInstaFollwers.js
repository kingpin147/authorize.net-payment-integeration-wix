import wixLocation from 'wix-location';
import wixData from 'wix-data';
import { createCheckout } from 'backend/authorize.jsw';

/* =====================================
   GLOBAL SELECTION STORAGE
===================================== */
let selectedPackageName = null;

let selectedItems = {
    followers: { id: null, price: null, original: null },
    likes: { id: null, price: null, original: null },
    views: { id: null, price: null, original: null },
    automaticLikes: { id: null, price: null, original: null }
};

/* =====================================
   CONFIGURATION PER SECTION
===================================== */

let currentFollowersType = "real followers";

const repeaterConfig = {

    followers: {
        repeater: "#followersRepeater",
        container: "#followersContainer",
        tick: "#followersTick",
        discounted: "#discountedPriceTextFollowers",
        original: "#originalPriceTextFollowers",
        save: "#youSaveTextFollowers"
    },

    likes: {
        repeater: "#likesRepeater",
        container: "#likesContainer",
        tick: "#likesTick",
        discounted: "#discountedPriceTextLikes",
        original: "#originalPriceTextLikes",
        save: "#youSaveTextLikes"
    },

    views: {
        repeater: "#viewsRepeater",
        container: "#viewsContainer",
        tick: "#viewsTick",
        discounted: "#discountedPriceTextViews",
        original: "#originalPriceTextViews",
        save: "#youSaveTextViews"
    },

    automaticLikes: {
        repeater: "#automaticLikesRepeater",
        container: "#automaticLikesContainer",
        tick: "#automaticLikesTick",
        discounted: "#discountedPriceTextAutomaticLikes",
        original: "#originalPriceTextAutomaticLikes",
        save: "#youSaveTextAutomaticLikes"
    }

};

/* =====================================
   PAGE READY
===================================== */

$w.onReady(function () {

    initButtons();
    detectStateFromURL();
    initRepeaters();
    initBuyButtons();

    filterFollowersPackages("real followers");
    filterLikesPackages("Real Likes");
    filterViewsPackages("Views");

    initCheckout();

});

/* =====================================
   STATE BUTTONS
===================================== */
//////////NEED CHANGE HERE MENDATORY??????///////////////////////////////
//////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function initButtons() {

    $w("#btnFollowers").onClick(() => activateSection("followers"));
    $w("#btnLikes").onClick(() => activateSection("likes"));
    $w("#btnViews").onClick(() => activateSection("views"));

    initFollowerTypeButtons();
    initLikesTypeButtons();
    initViewsTypeButtons();

}

function detectStateFromURL() {

    const url = wixLocation.url.toLowerCase();

    if (url.includes("followers")) activateSection("followers");
    else if (url.includes("automatic-likes")) activateSection("automaticLikes");
    else if (url.includes("likes")) activateSection("likes");
    else if (url.includes("views")) activateSection("views");
    else activateSection("followers");

}

function activateSection(type) {

    resetButtons();

    if (type === "followers") {

        $w("#instaStateBox").changeState("followers");
        setActive("#btnFollowers");

    }

    else if (type === "likes") {

        $w("#instaStateBox").changeState("like");
        setActive("#btnLikes");

    }

    else if (type === "views") {

        $w("#instaStateBox").changeState("views");
        setActive("#btnViews");

    }

    else if (type === "automaticLikes") {

        $w("#instaStateBox").changeState("automaticLikes");

    }

}

function resetButtons() {

    $w("#btnFollowers").style.backgroundColor = "#FFFFFF";
    $w("#btnLikes").style.backgroundColor = "#FFFFFF";
    $w("#btnViews").style.backgroundColor = "#FFFFFF";

}

function setActive(buttonId) {

    if ($w(buttonId)) {
        $w(buttonId).style.backgroundColor = "#FFD700";
    }

}

/* =====================================
   REPEATERS
===================================== */

function initRepeaters() {

    setupRepeater("followers");
    setupRepeater("likes");
    setupRepeater("views");
    setupRepeater("automaticLikes");

}

function setupRepeater(type) {

    const config = repeaterConfig[type];

    let firstLoaded = false;

    $w(config.repeater).onItemReady(($item, itemData, index) => {

        resetItemUI($item, config);

        if (!firstLoaded && index === 0) {

            setSelected(type, itemData);
            highlightItemUI($item, config);
            updatePriceUI(type);

            firstLoaded = true;

        }

        $item(config.container).onClick(() => {

            setSelected(type, itemData);
            refreshRepeaterSelection(type);
            updatePriceUI(type);

        });

    });

}

function setSelected(type, itemData) {

    selectedItems[type] = {
        id: itemData._id,
        price: Number(itemData.discountedPrice),
        original: Number(itemData.price),
        package: itemData.package,
        fullItem: itemData
    };

}

function refreshRepeaterSelection(type) {

    const config = repeaterConfig[type];

    $w(config.repeater).forEachItem(($item, itemData) => {

        if (itemData._id === selectedItems[type].id) {

            highlightItemUI($item, config);

        } else {

            resetItemUI($item, config);

        }

    });

}

function highlightItemUI($item, config) {

  //  $item(config.container).style.backgroundColor = "#FFD000";
    $item(config.tick).show();

}

function resetItemUI($item, config) {

   // $item(config.container).style.backgroundColor = "#FFFFFF";
    $item(config.tick).hide();

}

/* =====================================
   PRICE DISPLAY
===================================== */

function updatePriceUI(type) {

    const config = repeaterConfig[type];

    const price = selectedItems[type].price;
    const original = selectedItems[type].original;

    if (price === null || original === null) return;

    const savings = (original - price).toFixed(2);

    $w(config.discounted).text = `$${price.toFixed(2)}`;
    $w(config.original).text = `$${original.toFixed(2)}`;
    $w(config.save).text = `You Save $${savings}`;

}

/* =====================================
   BUY BUTTONS
===================================== */

function initBuyButtons() {

    $w("#buynowfollowers").onClick(() => handleBuy("followers"));
    $w("#buynowlikes").onClick(() => handleBuy("likes"));
    $w("#buynowviews").onClick(() => handleBuy("views"));
    $w("#buynowautomaticlikes").onClick(() => handleBuy("automaticLikes"));

}

function handleBuy(type) {

    if (!selectedItems[type].id) {

        console.log("No package selected");
        return;

    }

    $w("#instaStateBox").changeState("details");

    loadPackagesFromRepeater(type);

}

function loadPackagesFromRepeater(type) {

    const config = repeaterConfig[type];

    const items = $w(config.repeater).data;

    if (!items || items.length === 0) {

        console.log("No items found in repeater");
        return;

    }

  const options = items.map(item => ({
    label: `${item.package}➡$${Number(item.discountedPrice).toFixed(2)}`,
    value: item.package
}));

    $w("#packageDropdown").options = options;

    $w("#packageDropdown").value = selectedItems[type].package;

}

/* =====================================
   FOLLOWERS FILTER
===================================== */

function initFollowerTypeButtons() {

    $w("#btnRealFollowers").onClick(() => {
        filterFollowersPackages("real followers");
    });

    $w("#btnManagedGrowth").onClick(() => {
        filterFollowersPackages("managed growth");
    });

    $w("#btnPrestigeFollowers").onClick(() => {
        filterFollowersPackages("pre-stage followers");
    });

}

function filterFollowersPackages(type) {

    currentFollowersType = type;

    $w("#followersDataset").setFilter(
        wixData.filter().eq("packageType", type)
    );

}

/* =====================================
   LIKES FILTER
===================================== */

function initLikesTypeButtons() {

    $w("#btnRealLikes").onClick(() => {
        filterLikesPackages("Real Likes");
    });

    $w("#btnPrestigeLikes").onClick(() => {
        filterLikesPackages("Prestige Likes");
    });

}

function filterLikesPackages(type) {

    $w("#likesDataset1").setFilter(
        wixData.filter().eq("packageType", type)
    );

}

/* =====================================
   VIEWS FILTER
===================================== */

function initViewsTypeButtons() {

    $w("#btnRealViews").onClick(() => {
        filterViewsPackages("Views");
    });

    $w("#btnPrestigeViews").onClick(() => {
        filterViewsPackages("Prestige Views");
    });

}

function filterViewsPackages(type) {

    $w("#viewsDataset").setFilter(
        wixData.filter().eq("packageType", type)
    );

}

/* =====================================
   CHECKOUT LOGIC
===================================== */

function initCheckout() {

    // 1. Update price if package is changed in the dropdown
    $w("#packageDropdown").onChange(() => {
        const selectedValue = $w("#packageDropdown").value;
        const activeSection = getActiveSection();
        
        // Update the selectedItems with the new price from the dataset
        const config = repeaterConfig[activeSection];
        const allItems = $w(config.repeater).data;
        const matchingItem = allItems.find(item => item.package === selectedValue);

        if (matchingItem) {
            setSelected(activeSection, matchingItem);
            updatePriceUI(activeSection);
        }
    });

    // 2. Handle the final Checkout Button
    // Verified IDs: #buyNow, #userName, #emailInput
    $w("#buyNow").onClick(async () => {
        
        const username = $w("#userName").value; // Instagram Username
        const email = $w("#emailInput").value;   // Email Address
        const selectedPackage = $w("#packageDropdown").value;
        
        const activeSection = getActiveSection();
        const amount = selectedItems[activeSection].price;

        if (!email || !username) {
            console.error("Please fill in all details");
            // Optionally add UI feedback here
            return;
        }

        $w("#buyNow").label = "Processing...";
        $w("#buyNow").disable();

        try {
            const checkoutParams = {
                amount: amount,
                customerEmail: email,
                customerFirstName: username, // Pass Username in FirstName
                customerLastName: `(${email})`, // Pass Email in LastName for visibility
                description: `${selectedPackage} for ${username}`,
                orderId: "ORD-" + Date.now(),
                lineItems: [
                    {
                        name: selectedPackage,
                        unitPrice: amount,
                        quantity: 1,
                        description: `Section: ${activeSection}`
                    }
                ]
            };

            const result = await createCheckout(checkoutParams);

            if (result.success && result.redirectUrl) {
                // Use wix-location for direct redirection
                wixLocation.to(result.redirectUrl);
            } else {
                console.error("Checkout failed:", result.error);
                $w("#buyNow").label = "Continue";
                $w("#buyNow").enable();
            }

        } catch (err) {
            console.error("Checkout Error:", err);
            $w("#buyNow").label = "Continue";
            $w("#buyNow").enable();
        }
    });

}

function getActiveSection() {
    const currentState = $w("#instaStateBox").currentState.id;
    if (currentState === "followers") return "followers";
    if (currentState === "like") return "likes";
    if (currentState === "views") return "views";
    if (currentState === "automaticLikes") return "automaticLikes";
    if (currentState === "details") {
        // If we are in details, we need to know which section we came from
        // We can infer this from which selectedItems has a price
        if (selectedItems.followers.id) return "followers";
        if (selectedItems.likes.id) return "likes";
        if (selectedItems.views.id) return "views";
        if (selectedItems.automaticLikes.id) return "automaticLikes";
    }
    return "followers";
}