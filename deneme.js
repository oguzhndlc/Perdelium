let id = 1;

/* ---------------- SAVE DATA ---------------- */
async function saveData(getid, getname) {
  const user = {
    id: getid,
    name: getname,
  };

  // 🍪 Cookie kaydet
  document.cookie =
    "user=" +
    encodeURIComponent(JSON.stringify(user)) +
    "; path=/; max-age=86400";

  const response = await fetch("/.netlify/functions/api/saveUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  console.log("API response:", data);
}

/* ---------------- COOKIE ---------------- */
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [key, value] = c.split("=");
    if (key === name) return value;
  }
  return null;
}

function getUserFromCookie() {
  const cookie = getCookie("user");
  if (!cookie) return null;

  try {
    return JSON.parse(decodeURIComponent(cookie));
  } catch {
    return null;
  }
}

function getcook() {
  const user = getUserFromCookie();
  if (!user) {
    console.log("Cookie yok");
    return;
  }
  console.log("Cookie user:", user);
}

/* ---------------- LOGIN ---------------- */
document.getElementById("LoginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  loginUser();
});

function loginUser() {
  const user = getUserFromCookie();
  const name = document.getElementById("loginNameInput").value.trim();

  if (!user) {
    alert("Kayıtlı kullanıcı yok!");
    return;
  }

  if (name === user.name) {
    alert("Giriş Başarılı! Hoşgeldin, " + name);
  } else {
    alert("Giriş Başarısız!");
  }
}

/* ---------------- USER FORM ---------------- */
document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("nameInput");
  const name = nameInput.value.trim();
  if (!name) return;

  const tableBody = document.getElementById("userTableBody");

  const currentId = id++;

  tableBody.insertAdjacentHTML(
    "beforeend",
    `
    <tr>
      <td>${currentId}</td>
      <td>${name}</td>
    </tr>
    `
  );

  await saveData(currentId, name);

  nameInput.value = "";
});

function supabasesaid(text){
  console.log("Supabase:", text);
}

/* ---------------- SUPABASE INSERT ---------------- */
async function SupaBasesend() {
  const name = document.getElementById("sendname").value.trim();
  if (!name) {
    supabasesaid("İsim girmediniz");
    return;
  }

const res = await fetch("/api/users/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name }),
});

const text = await res.text();
console.log("BACKEND RAW RESPONSE:", text);

}

/* ---------------- FILE UPLOAD ---------------- */
async function upload() {
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];

  if (!file) {
    alert("Lütfen dosya seç");
    return;
  }

  const reader = new FileReader();

  reader.onload = async () => {
    const base64 = reader.result.split(",")[1];

    const res = await fetch("/api/files", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        file: base64,
        fileName: file.name,
        contentType: file.type,
      }),
    });

    const data = await res.json();
    console.log("Upload:", data);
  };

  reader.readAsDataURL(file);
}
