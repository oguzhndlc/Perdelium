const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "/pages/login.html";
} else {
  document.getElementById("profileName").textContent = user.name;
  document.getElementById("profileRole").textContent = user.role;
}
