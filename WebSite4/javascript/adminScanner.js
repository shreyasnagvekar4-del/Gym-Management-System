function back() {

    window.location.href = "../html/adminHome.html";

}

const html5QrCode = new Html5Qrcode("reader");

function onScanSuccess(decodedText, decodedResult) {

    html5QrCode.stop();

    console.log("QR Code:", decodedText);

    document.getElementById("reader").style.display = "none";

    loadMember(decodedText);
}

function onScanFailure(error) {

}
function start_scanner() {
    Html5Qrcode.getCameras().then(devices => {

        if (devices && devices.length) {

            html5QrCode.start(

                { facingMode: "environment" },

                {
                    fps: 10,
                    qrbox: 250
                },

                onScanSuccess,

                onScanFailure

            );

        }

    });
}
start_scanner();

async function loadMember(qrData) {

    let id = qrData.replace("USER-", "");
    let response = await fetch(
        `https://localhost:7144/api/User/id/${id}`
    );

    let user = await response.json();
    document.getElementById("memberName").innerText =
        user.name;

    document.getElementById("memberEmail").innerText =
        user.email;

    document.getElementById("memberPlan").innerText =
        user.membershipPlan ?? "None";

    document.getElementById("memberStatus").innerText =
        user.membershipStatus ?? "Inactive";

    document.getElementById("memberExpiry").innerText =
        user.membershipExpiryDate
            ? new Date(user.membershipExpiryDate).toLocaleDateString()
            : "Not Available";

    document.getElementById("memberImage").src =
        user.profileimage
            ? `https://localhost:7144/profileimages/${user.profileimage}`
            : "../images/default.png";

    document.querySelector(".member-card").style.display = "block";
    await markAttendance(user);

}
function scanAgain() {

    document.getElementById("reader").style.display = "block";

    document.querySelector(".member-card").style.display = "none";

    document.getElementById("memberName").innerText = "";
    document.getElementById("memberEmail").innerText = "";
    document.getElementById("memberPlan").innerText = "";
    document.getElementById("memberStatus").innerText = "";
    document.getElementById("memberExpiry").innerText = "";

    start_scanner();

}

async function markAttendance(user) {

    // Only active members can mark attendance
    if (user.membershipStatus !== "Active") {
        alert("Membership is not active.");
        return;
    }

    const today = new Date();

    const attendance = {
        userId: user.id,
        attendanceDate: today.toISOString().split("T")[0], // yyyy-MM-dd
        checkInTime: today.toTimeString().split(" ")[0]    // HH:mm:ss
    };

    const response = await fetch("https://localhost:7144/api/Attendance", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(attendance)
    });

    const result = await response.json();

    alert(result.message);
}