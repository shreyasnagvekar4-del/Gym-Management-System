function open_menu() {
    document.querySelector(".op_menu").style.display = "flex";
}

function close_menu() {
    document.querySelector(".op_menu").style.display = "none";
}

document.addEventListener("click", function (event) {
    let menu = document.querySelector(".op_menu");
    let hamburger = document.querySelector(".hamburger-menu");

    if (!menu.contains(event.target) &&
        !hamburger.contains(event.target)) {
        menu.style.display = "none";
        }
});

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "../html/loginpage.html";

}
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href="../html/login.html"
}

let username = localStorage.getItem("username");
document.getElementById("welcomeText").innerText = `Welcome,${username}👋`; 

function open_pd() {
    window.location.href="../html/Personal_details.html";
}

function open_m() {
    window.location.href = "../html/membership.html";
}

function open_a() {
    window.location.href = "../html/attendance.html";
}

function open_mq() {
    window.location.href = "../html/myQr.html";
}

function open_c() {
    window.location.href = "../html/contact.html";
}

async function loadMembership() {
    let email = localStorage.getItem("email");
    let response = await fetch(
        `https://localhost:7144/api/User/${email}`
    );

    let user = await response.json();

    document.getElementById("plan").innerText =
        user.membershipPlan ?? "None";

    document.getElementById("status").innerText =
        user.membershipStatus ?? "Inactive";

    
    if (!user.membershipExpiryDate) {
        document.getElementById("expiresIn").innerText = "Not Available"
    }
    else {
        let expiryDate = new Date(user.membershipExpiryDate);

        let today = new Date();

        let diff = expiryDate - today;

        let daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));


        if (daysLeft > 0) {
            document.getElementById("expiresIn").innerText = daysLeft + "Days";
        }
        else {
            document.getElementById("expiresIn").innerText = "Expired";
        }
    }

    let userId = localStorage.getItem("userId");

    let attendanceResponse = await fetch(
        `https://localhost:7144/api/Attendance/user/${userId}`
    );

    if (!attendanceResponse.ok) return;

    let attendance = await attendanceResponse.json();

    document.getElementById("attendance").innerText = attendance.length;
}

loadMembership();
