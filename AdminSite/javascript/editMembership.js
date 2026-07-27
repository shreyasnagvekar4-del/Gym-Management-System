function back() {

    window.location.href = "../html/Membership.html";

}

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

loadMembership();

async function loadMembership() {

    const response = await fetch(
        `https://localhost:7144/api/Membership/${id}`
    );

    const plan = await response.json();

    document.getElementById("planName").value =
        plan.planName;

    document.getElementById("durationMonths").value =
        plan.durationMonths;

    document.getElementById("price").value =
        plan.price;

    document.getElementById("description").value =
        plan.description;

}

async function saveChanges() {

    const updatedPlan = {

        id: id,

        planName:
            document.getElementById("planName").value,

        durationMonths:
            parseInt(
                document.getElementById("durationMonths").value
            ),

        price:
            parseFloat(
                document.getElementById("price").value
            ),

        description:
            document.getElementById("description").value

    };

    const response = await fetch(
        `https://localhost:7144/api/Membership/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPlan)
        }
    );

    if (response.ok) {

        alert("Membership updated successfully.");

        window.location.href = "../html/Membership.html";

    }
    else {

        const error = await response.text();

        alert(error);

    }

}