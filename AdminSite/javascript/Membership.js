function back() {

    window.location.href = "../html/adminHome.html";

}

loadMembershipPlans();

async function loadMembershipPlans() {

    const response = await fetch(
        "https://localhost:7144/api/Membership"
    );

    const plans = await response.json();

    const container =
        document.getElementById("membershipContainer");

    container.innerHTML = "";

    plans.forEach(plan => {

        container.innerHTML += `

        <div class="membership-card">

            <h2>${plan.planName}</h2>

            <p>
                <strong>Duration:</strong>
                ${plan.durationMonths} Month${plan.durationMonths > 1 ? "s" : ""}
            </p>

            <p>
                <strong>Price:</strong>
                ₹${plan.price}
            </p>
            <div class="b-line">
            <p id="description">
                <strong>Description:</strong>
                ${plan.description}
            </p>

            <button
                class="edit-btn"
                onclick="editPlan(${plan.id})">

                Edit

            </button></div>

        </div>

        `;

    });

}

function editPlan(id) {

    window.location.href =
        `../html/editMembership.html?id=${id}`;

}