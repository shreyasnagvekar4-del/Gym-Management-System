function back() {
    window.location.href = "../html/home.html";
}

let questions = document.querySelectorAll(".faq-question");

questions.forEach(question => {
    question.addEventListener("click", function () {
        let answer = this.nextElementSibling;
        if (answer.style.display === "block") {
            answer.style.display = "none";

        }
        else {
            answer.style.display = "block";
        }
    });
});