function openScanner() {

    window.location.href = "../html/adminScanner.html";

}

function viewMembers() {
    window.location.href = "../html/member.html";
}

function viewAttendance() {
    window.location.href = "../html/Attendance.html";
}

function viewMemberships() {
    window.location.href = "../html/Membership.html";
}

function logout() {

    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    window.location.href = "../html/login.html";

}