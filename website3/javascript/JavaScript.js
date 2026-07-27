async function RegisterUser() {
    let name =
        document.getElementById("Name").value;
    let email =
        document.getElementById("Email").value;
    let phone =
        document.getElementById("Phone").value;
    let password =
        document.getElementById("Password").value;
    let confirmpass =
        document.getElementById("Confirm_Password").value;

    if (password !== confirmpass) {
        alert("Passwords do not match");
        return false;
    } 

    let user = {
        name : name,
    email:email,
    phone : phone,
    passwordHash : password
    };

    let response = await fetch("https://localhost:7144/api/User",
        {
            method:"POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body:JSON.stringify(user)
        }
    );
    
    if (response.ok) {
        let result = await response.json();
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", result.name);
        localStorage.setItem("email", result.email);
        alert("Registeration Succesful");
        window.location.href = "../html/home.html"
    } else {
        let error = await response.text();
        alert(error);
    }
}
async function Login1() {
    let email =
        document.getElementById("LoginEmail").value;
    let password =
        document.getElementById("LoginPassword").value;

    let response = await fetch(
        "https://localhost:7144/api/User/login",
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }


    );
    
    if (response.ok) {
        
        let result = await response.json();
        
        localStorage.setItem("userId",result.id)
        localStorage.setItem("username", result.name);
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("email", result.email);
        console.log("Saved email:", localStorage.getItem("email"));
        alert("Welcome " + result.name);
        window.location.href = "../html/home.html";
    } else {
        let error = await response.text();
        alert(error);
    }
}
let register =
    document.querySelector(".register");

let login =
    document.querySelector(".login");

function openLogin() {

    register.style.width = "15%";
    login.style.width = "85%";
    register.style.backgroundImage =  "none";
    login.style.backgroundImage = "url('../images/background.png')";

    document.querySelector(".login-preview").style.display = "none";
    document.querySelector(".login-form").style.display = "flex";
    document.querySelector(".register-afterview").style.display = "flex";
    document.querySelector(".register-form").style.display = "none";
}

function openRegister() {

    register.style.width = "85%";
    login.style.width = "15%";
    register.style.backgroundImage = "url('../images/background.png')";
    login.style.backgroundImage = "none";

    document.querySelector(".register-afterview").style.display = "none";
    document.querySelector(".register-form").style.display = "flex";
    document.querySelector(".login-preview").style.display = "flex";

    document.querySelector(".login-form").style.display = "none";

}

function ShowPassword2() {
    let password =
        document.getElementById("Password");
    let confirmPassword =
        document.getElementById("Confirm_Password");

    if (password.type === "password") {
        password.type = "text";
        confirmPassword.type = "text";
    } else {
        password.type = "password";
        confirmPassword.type = "password";
    }
}

function ShowPassword1() {
    let password =
        document.getElementById("LoginPassword");

    if (password.type === "password") {
        password.type = "text";
    }
    else {
        password.type = "password";
    }
}