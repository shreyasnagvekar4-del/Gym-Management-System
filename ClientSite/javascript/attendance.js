function back() {
    window.location.href = "../html/home.html";
}

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");

const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

let currentDate = new Date();

// Logged in user's id
const userId = localStorage.getItem("userId");

async function renderCalendar() {

    calendar.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYear.innerText = currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric"
    });

    // Get attendance for this month
    const response = await fetch(
        `https://localhost:7144/api/Attendance/month/${userId}?month=${month + 1}&year=${year}`
    );

    const attendance = await response.json();

    const firstDay = new Date(year, month, 1).getDay();

    const totalDays = new Date(year, month + 1, 0).getDate();

    // Empty cells
    for (let i = 0; i < firstDay; i++) {

        const empty = document.createElement("div");
        empty.classList.add("empty");
        calendar.appendChild(empty);

    }

    const today = new Date();

    for (let day = 1; day <= totalDays; day++) {

        const cell = document.createElement("div");

        cell.classList.add("day");

        cell.innerHTML = `<span>${day}</span>`;

        // yyyy-MM-dd
        const fullDate =
            `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // Find attendance
        const record = attendance.find(a => a.attendanceDate === fullDate);

        if (record) {

            cell.classList.add("present");

            cell.innerHTML = `
        <span class="day-number">${day}</span>
        <small class="checkin-time">${record.checkInTime}</small>
    `;

            cell.addEventListener("click", () => {
                alert(
                    `Present

Date : ${fullDate}

Check In : ${record.checkInTime}`);
            });
        }

        // Highlight today
        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {

            cell.classList.add("today");

        }

        calendar.appendChild(cell);

    }

}

prevMonth.addEventListener("click", () => {

    currentDate.setMonth(currentDate.getMonth() - 1);

    renderCalendar();

});

nextMonth.addEventListener("click", () => {

    currentDate.setMonth(currentDate.getMonth() + 1);

    renderCalendar();

});

renderCalendar();