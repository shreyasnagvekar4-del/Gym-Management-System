function back() {
    window.location.href = "../html/home.html";
}

const membershipContainer = document.getElementById("membershipPlans");
const purchaseBtn = document.querySelector(".purchase");

let selectedPlan = null;

loadMembershipPlans();

async function loadMembershipPlans() {

    const response = await fetch("https://localhost:7144/api/Membership");

    const plans = await response.json();

    membershipContainer.innerHTML = "";

    plans.forEach(plan => {

        membershipContainer.innerHTML += `
            <div class="plans"
                 data-name="${plan.planName}"
                 data-price="${plan.price}"
                 data-duration="${plan.durationMonths} Month${plan.durationMonths > 1 ? "s" : ""}">

                <h2>${plan.planName}</h2>

                <h3>₹${plan.price}</h3>

                <p><strong>Duration:</strong> ${plan.durationMonths} Month${plan.durationMonths > 1 ? "s" : ""}</p>

                <p>${plan.description}</p>

                <button type="button" class="select_btn">
                    Select Plan
                </button>

            </div>
        `;
    });

    initializeSelection();
}

function initializeSelection() {

    const plans = document.querySelectorAll(".plans");
    const buttons = document.querySelectorAll(".select_btn");

    plans.forEach(plan => {

        plan.addEventListener("click", function () {

            plans.forEach(p => p.classList.remove("selected"));

            buttons.forEach(btn => btn.innerText = "Select Plan");

            this.classList.add("selected");

            this.querySelector(".select_btn").innerText = "✓ Selected";

            selectedPlan = {
                name: this.dataset.name,
                price: this.dataset.price,
                duration: this.dataset.duration
            };

            purchaseBtn.disabled = false;
        });

    });

}

purchaseBtn.addEventListener("click", function () {

    localStorage.setItem(
        "selectedPlan",
        JSON.stringify(selectedPlan)
    );

    window.location.href = "../html/review.html";

});