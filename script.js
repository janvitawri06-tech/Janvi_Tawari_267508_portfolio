// 1. Light & Dark Theme Toggle
document.getElementById("theme").onclick = function () {
  var r = document.documentElement;
  var d = r.getAttribute("data-theme") === "dark";
  r.setAttribute("data-theme", d ? "light" : "dark");
};

// 2. Top Reading Progress Bar
window.addEventListener("scroll", function () {
  var bar = document.getElementById("bar");
  if (bar) {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var progress = (scrollTop / scrollHeight) * 100;
    bar.style.width = progress + "%";
  }
});

// 3. Contact Form Validation
var form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();
    var status = document.getElementById("formStatus");

    if (name === "" || email === "" || message === "") {
      status.textContent = "Please fill in all fields.";
      return;
    }

    status.textContent = "Thank you, " + name + "! Your message has been sent.";
    form.reset();
  });
}
