let members = [];

function back() {
    window.location.href = "../html/adminHome.html";
}

async function loadMembers() {

    const response = await fetch("https://localhost:7144/api/User");

    members = await response.json();

    members = members.filter(member=>member.role==="Member");

    displayMembers(members);

}

function displayMembers(data) {

    const memberList = document.getElementById("memberList");

    memberList.innerHTML = "";

    data.forEach(member => {

        const image = member.profileimage
            ? `https://localhost:7144/profileimages/${member.profileimage}`
            : "../images/default-profile.webp";

        memberList.innerHTML += `

        <div class="member-card">

            <img src="${image}">

            <div class="member-info">

                <h3>${member.name}</h3>

                <p><strong>ID:</strong> ${member.id}</p>

                <p>${member.email}</p>

                <p>${member.phone}</p>

                <p>${member.membershipPlan ?? "None"}</p>

                <span class="${member.membershipStatus === "Active" ? "active" : "expired"}">
                    ${member.membershipStatus}
                </span>

            </div>

            <button class="edit-btn"
                onclick="editMember(${member.id})">
                Edit
            </button>

        </div>

        `;

    });

}

function searchMembers() {

    const text = document
        .getElementById("searchBox")
        .value
        .toLowerCase();

    const filtered = members.filter(member =>

        member.name.toLowerCase().includes(text) ||

        member.email.toLowerCase().includes(text)

    );

    displayMembers(filtered);

}

function editMember(id) {

        window.location.href = `../html/editMember.html?id=${id}`;

}

loadMembers();