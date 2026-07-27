function back() {
    window.location.href = "../html/home.html";
}

let email = localStorage.getItem("email");

async function loadQR() {
    let response =await fetch(`https://localhost:7144/api/User/${email}`);

    let user = await response.json()
    document.getElementById("memberName").innerText =
        user.name;

    document.getElementById("memberId").innerText =
        user.id;

    document.getElementById("memberPlan").innerText =
        user.membershipPlan ?? "None";

    document.getElementById("memberStatus").innerText =
        user.membershipStatus ?? "Inactive";

    document.getElementById("memberExpiry").innerText =
        user.membershipExpiryDate ?
            new Date(user.membershipExpiryDate).toLocaleDateString() :
            "Not Available";

    new QRCode(
        document.getElementById("qrcode"),
        `USER-${user.id}`
    );
}
loadQR();