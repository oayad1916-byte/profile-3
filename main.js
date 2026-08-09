const menu = document.getElementById("menu");
const nav = document.querySelector(".nav");
const overlay = document.querySelector(".overlay");
const menuIcon = document.querySelector("i");
// const container = document.getElementById("container")
const body = document.querySelector("body");

menu.addEventListener("click", function (e) {
    e.stopPropagation();
    nav.classList.toggle("active");
    overlay.classList.toggle("active");
    if (nav.classList.contains("active")) {
        menuIcon.classList.replace("fa-bars", "fa-x");
    } else {
        menuIcon.classList.replace("fa-x", "fa-bars");
    }
});

body.addEventListener("click", function () {
    nav.classList.remove("active");
    overlay.classList.remove("active");
    menuIcon.classList.replace("fa-x", "fa-bars");
});

AOS.init({
    duration: 800,
    once: true,
    offset: 100,
});

let section = document.querySelectorAll(".main-section");
let navLinks = document.querySelectorAll(".nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    section.forEach((section) => {
        let sectionTop = section.offsetTop;
        let sectionHeight = section.clientHeight;
        if (
            scrollY >= sectionTop - 200 &&
            scrollY < sectionTop + sectionHeight - 200
        ) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});


let form = document.getElementById("contactForm")
// inputs
let name = document.getElementById("full-name").value
let email = document.getElementById("email").value
let subject = document.getElementById("subject").value
let message = document.getElementById("message").value
// errors
let emailError = document.getElementById("emailError")
let nameError = document.getElementById("nameError")
let subjectError = document.getElementById("subjectError")
let messageError = document.getElementById("messageError")

form.addEventListener("submit", (e) => {
    // 1. امنع الإرسال الافتراضي فوراً (هذا يوقف إعادة تحميل الصفحة)
    e.preventDefault(); 

    let isValid = true;

    // --- تحقق من الاسم ---
    if (name === '' || name === null) {
        nameError.style.display = "block";
        isValid = false;
    } else {
        nameError.style.display = "none";
    }

    // --- تحقق من الموضوع ---
    if (subject === "" || subject.length < 5) {
        subjectError.style.display = "block";
        isValid = false;
    } else {
        subjectError.style.display = "none";
    }

    // --- تحقق من الرسالة ---
    if (message === "" || message.length < 20) {
        messageError.style.display = "block";
        isValid = false;
    } else {
        messageError.style.display = "none";
    }

    // --- تحقق من البريد ---
    let redex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!redex.test(email)) {
        emailError.style.display = "block";
        isValid = false;
    } else {
        emailError.style.display = "none";
    }

    // 2. إذا كان isValid ما يزال صحيحاً، قم بالإرسال يدوياً
    if (isValid) {
        // هنا نقوم بإرسال البيانات يدوياً لـ Formspree
        fetch("https://formspree.io/f/xykvavpd", {
            method: "POST",
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                alert("تم الإرسال بنجاح!");
                form.reset(); // تفريغ النموذج بعد الإرسال
            } else {
                alert("حدث خطأ، حاول مرة أخرى.");
            }
        });
    }
});