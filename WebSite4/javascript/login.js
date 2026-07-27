async function login() {

    let email = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("Please enter email and password.");
        return;
    }

    let response = await fetch("https://localhost:7144/api/User/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    let result = await response.json();

    if (response.ok) {

        localStorage.setItem("email", result.email);
        localStorage.setItem("name", result.name);
        localStorage.setItem("role", result.role);

        if (result.role === "Admin") {

            localStorage.setItem("adminLoggedIn", "true");
            window.location.href = "../html/adminHome.html";

        }
        else {

            localStorage.setItem("loggedIn", "true");
            window.location.href = "../html/home.html";

        }

    }
    else {

        alert(result);

    }
}