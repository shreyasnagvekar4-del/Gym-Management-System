
function back_btn() {
    window.location.href = "../html/home.html";


}

let email = localStorage.getItem("email");
let originalName = "";
async function loadUser() {
    let response = await fetch(`https://localhost:7144/api/User/${email}`);
    
    let user = await response.json();

    if (user.profileimage) {
        document.getElementById("profileImage").src = `https://localhost:7144/profileimages/${user.profileimage}`;
    } else {
        document.getElementById("profileImage").src = "../images/default.png";
    }
    
    originalName = user.name;
    document.getElementById("username").innerText = user.name;
    document.getElementById("userName").value = user.name;
    document.getElementById("ageTxt").innerText = user.age;
    document.getElementById("addressTxt").innerText = user.address;


    document.getElementById("username").innerText = user.name;
    document.getElementById("userEmail").innerText = user.email;
    document.getElementById("userPhone").innerText = user.phone;
    document.getElementById("userAge").value = user.age;
    document.getElementById("genderInput").value = user.gender;
    document.getElementById("genderTxt").innerText = user.gender;
    document.getElementById("userAddress").value = user.address;
    document.getElementById("membership").innerText = user.membershipStatus;
    document.getElementById("expiry").innerText = user.membershipExpiryDate ?
        new Date(user.membershipExpiryDate).toLocaleDateString() :
        "Not Available";

}
loadUser();

function editprofile() {
    document.getElementById("userName").disabled = false;
    document.getElementById("userAge").disabled = false;
    document.getElementById("genderInput").disabled = false;
    document.getElementById("userAddress").disabled = false;
    document.getElementById("userName").style.display = "inline-block";
    document.getElementById("username").style.display = "none";
    document.getElementById("userAge").style.display = "inline-block";
    document.getElementById("ageTxt").style.display = "none";
    document.getElementById("genderInput").style.display = "inline-block";
    document.getElementById("genderTxt").style.display = "none";
    document.getElementById("userAddress").style.display = "inline-block";
    document.getElementById("addressTxt").style.display = "none";

    document.getElementById("editBtn").style.display = "none";
    document.getElementById("saveBtn").style.display = "inline-block";
}

async function saveProfile() {
    document.getElementById("userName").disabled = true;
    document.getElementById("userAge").disabled = true;
    document.getElementById("genderInput").disabled = true;
    document.getElementById("userAddress").disabled = true;
    document.getElementById("userName").style.display = "none";
    document.getElementById("userAge").style.display = "none";
    document.getElementById("genderInput").style.display = "none";
    document.getElementById("userAddress").style.display = "none";
    document.getElementById("username").innerText = document.getElementById("userName").value;
    document.getElementById("genderTxt").innerText = document.getElementById("genderInput").value;
    document.getElementById("ageTxt").innerText = document.getElementById("userAge").value;
    document.getElementById("addressTxt").innerText = document.getElementById("userAddress").value;
    // Hide Save
    document.getElementById("saveBtn").style.display = "none";

    // Show Edit again
    document.getElementById("editBtn").style.display = "inline-block";

    document.getElementById("ageTxt").style.display = "inline";
    document.getElementById("addressTxt").style.display = "inline";

    document.getElementById("genderTxt").style.display = "inline";
    document.getElementById("genderInput").style.display = "none";
    let nameInput = document.getElementById("userName").value.trim();

    if (nameInput === "") {
        nameInput = originalName;
    }

    document.getElementById("username").innerText = nameInput;
    document.getElementById("username").style.display = "inline";

    let updatedUser = {
        name: document.getElementById("userName").value,
        age: document.getElementById("userAge").value,
        gender: document.getElementById("genderInput").value,
        address: document.getElementById("userAddress").value
    };

    let response = await fetch(`https://localhost:7144/api/User/${email}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUser)
    });

    if (response.ok) {
        alert("Profile Updated Successfully");
    } else {
        let error = await response.text();
        console.log(error);
        alert(error);
    }


}

document.getElementById("profileUpload")
    .addEventListener("change", uploadProfileImage);

async function uploadProfileImage() {

    let file =
        document.getElementById("profileUpload").files[0];

    if (!file)
        return;

    let formData = new FormData(); 
    formData.append("image", file);

    let response = await fetch(
        `https://localhost:7144/api/User/upload/${email}`,
        {
            method: "POST",
            body: formData
        });

    if (response.ok) {

        let imageName = await response.text();

        document.getElementById("profileImage").src =
            `https://localhost:7144/profileimages/${imageName}`;

    } else {

        alert("Image upload failed");

    }
}
