function back() {
    window.location.href = "../html/adminHome.html";
}

const attendanceBody = document.getElementById("attendanceBody");
const totalPresent = document.getElementById("totalPresent");
const attendanceDate = document.getElementById("attendanceDate");
const loadAttendance = document.getElementById("loadAttendance");

// Set today's date by default
attendanceDate.value = new Date().toISOString().split("T")[0];

loadAttendance.addEventListener("click", loadAttendanceData);

window.onload = loadAttendanceData;

async function loadAttendanceData() {

    attendanceBody.innerHTML = "";

    const date = attendanceDate.value;

    const response = await fetch(
        `https://localhost:7144/api/Attendance/date?date=${date}`
    );

    if (!response.ok) {

        attendanceBody.innerHTML =
            "<tr><td colspan='5'>No Attendance Found</td></tr>";

        totalPresent.innerText = 0;

        return;
    }

    const data = await response.json();

    totalPresent.innerText = data.length;

    data.forEach(member => {

        attendanceBody.innerHTML += `
            <tr>

                <td>${member.userId}</td>

                <td>
                    <img class="member-img"
                    src="${member.profileimage
                ? `https://localhost:7144/profileimages/${member.profileimage}`
                : "../images/default.png"}">
                </td>

                <td>${member.name}</td>

                <td>${member.email}</td>

                <td>${member.checkInTime}</td>

            </tr>
        `;

    });

}