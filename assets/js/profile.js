const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "/pages/login.html";
}

// Görüntüleme alanı
document.getElementById("profileName").textContent = user.name;

// Formu doldur
document.getElementById("editName").value = user.name;
document.getElementById("editSurname").value = user.surname;
document.getElementById("editUsername").value = user.username;
document.getElementById("editEmail").value = user.email;
document.getElementById("editPhone").value = user.phone;


const editBtn = document.getElementById("editProfileBtn");
const editCard = document.getElementById("profileEditCard");
const cancelBtn = document.getElementById("cancelEditBtn");

// Aç
editBtn.addEventListener("click", () => {
  editCard.classList.remove("d-none");
  editBtn.classList.add("d-none");
});

// Kapat
cancelBtn.addEventListener("click", () => {
  editCard.classList.add("d-none");
  editBtn.classList.remove("d-none");
});

// Kaydet
document.getElementById("profileEditForm").addEventListener("submit", e => {
  e.preventDefault();

  const updatedUser = {
    ...user,
    name: document.getElementById("editName").value
  };

  localStorage.setItem("user", JSON.stringify(updatedUser));

  alert("Profil güncellendi ✅");
  location.reload();
});
