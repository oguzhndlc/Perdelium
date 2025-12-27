document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const identifier = document.getElementById("loginIdentifier").value;

    // MOCK LOGIN
    localStorage.setItem("user", JSON.stringify({
      name: identifier,
      role: "user"
    }));

    window.location.href = "/index.html";
  });
}


  if (registerForm) {
    registerForm.addEventListener("submit", e => {
      e.preventDefault();

      const password = document.getElementById("registerPassword").value;
      const password2 = document.getElementById("registerPassword2").value;

      if (password !== password2) {
        alert("Şifreler uyuşmuyor");
        return;
      }

      alert("Backend bağlanınca kayıt yapılacak");

      localStorage.setItem("user", JSON.stringify({
        name: document.getElementById("registerUsername").value,
        role: "user"
        }));

        window.location.href = "/index.html";

    });
  }

});
