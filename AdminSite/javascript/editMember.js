function back() {

    window.location.href = "../html/member.html";

}

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

loadMember();

async function loadMember() {

    const response = await fetch(
        `https://localhost:7144/api/User/id/${id}`
    );

    const user = await response.json();

    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
    document.getElementById("age").value = user.age;
    document.getElementById("gender").value = user.gender;
    document.getElementById("address").value = user.address;

    document.getElementById("membershipPlan").value =
        user.membershipPlan;

    document.getElementById("membershipStatus").value =
        user.membershipStatus;

    document.getElementById("profileImage").src =
        user.profileimage
            ? `https://localhost:7144/profileimages/${user.profileimage}`
            : "../images/default-profile.webp";

}

async function saveChanges() {

    const updatedUser = {

        id: id,

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        age: parseInt(document.getElementById("age").value),

        gender: document.getElementById("gender").value,

        address: document.getElementById("address").value,

        membershipPlan:
            document.getElementById("membershipPlan").value,

        membershipStatus:
            document.getElementById("membershipStatus").value

    };

    const response = await fetch(
        `https://localhost:7144/api/User/id/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)
        }
    );

    if (response.ok) {

        alert("Member updated successfully.");

        window.location.href = "../html/member.html";

    }
    else {

        

            console.log("Status:", response.status);
            console.log("Status Text:", response.statusText);

            const error = await response.text();

            console.log("Response:", error);

            alert(`Status: ${response.status}\n${response.statusText}`);

        

    }

}