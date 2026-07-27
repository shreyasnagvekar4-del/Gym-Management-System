function back() {
    window.location.href = "../html/membership.html";
}

let paymentBtn = document.querySelector(".paymentBtn");

plan = JSON.parse(localStorage.getItem("selectedPlan"));

let start = new Date();
let expiry = new Date(start);

let email = localStorage.getItem("email");

async function loadReview() {

    


    let response = await fetch(
        `https://localhost:7144/api/User/${email}`
    );

    let user = await response.json();

    // Fill member details
    document.getElementById("reviewName").innerText = user.name;
    document.getElementById("reviewEmail").innerText = user.email;

    // Fill plan details
    document.getElementById("reviewPlan").innerText = plan.name;
    document.getElementById("reviewDuration").innerText = plan.duration;
    document.getElementById("reviewPrice").innerText = plan.price;
    document.getElementById("membershipFee").innerText = plan.price;
    document.getElementById("totalPrice").innerText = plan.price;

    

    if (plan.duration === "1 Month")
        expiry.setMonth(expiry.getMonth() + 1);

    else if (plan.duration === "3 Months")
        expiry.setMonth(expiry.getMonth() + 3);

    else if (plan.duration === "6 Months")
        expiry.setMonth(expiry.getMonth() + 6);

    else
        expiry.setFullYear(expiry.getFullYear() + 1);

    document.getElementById("startDate").innerText =
        start.toLocaleDateString();

    document.getElementById("expiryDate").innerText =
        expiry.toLocaleDateString();

    let checkbox = document.getElementById("agree");
    let paymentBtn = document.querySelector(".paymentBtn");

    checkbox.addEventListener("change", function () {
        paymentBtn.disabled = !this.checked;
    });

    document.querySelector(".backReview")
        .addEventListener("click", function () {
            window.location.href = "../html/membership.html";
        });
}

loadReview();

paymentBtn.addEventListener("click", simulatePayment);

async function simulatePayment() {

    document.getElementById("paymentPopup").style.display = "flex";

    setTimeout(async function () {

        document.getElementById("paymentPopup").style.display = "none";

        let membershipData = {
            membershipPlan: plan.name,
            membershipStartDate: start,
            membershipExpiryDate: expiry,
            membershipStatus: "Active"
        };

        let response = await fetch(
            `https://localhost:7144/api/User/membership/${email}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(membershipData)
            }
        );

        if (response.ok) {
            alert("✅ Payment Successful! Membership Activated.");
            window.location.href = "../html/home.html";
        } else {
            alert("Failed to activate membership.");
        }

    }, 3000);
}