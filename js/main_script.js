async function loadHeaderFooter() {
  try {
    const response = await fetch("header.html");
    if (!response.ok) throw new Error("Header yüklenemedi");

    const data = await response.text();
    document.getElementById("header-placeholder").innerHTML = data;

  } catch (err) {
    console.error("❌ Header yükleme hatası:", err);
  }
    try {
    const response2 = await fetch("footer.html");
    if (!response2.ok) throw new Error("Footer yüklenemedi");

    const data2 = await response2.text();
    document.getElementById("footer-placeholder").innerHTML = data2;

  } catch (err) {
    console.error("❌ Footer yükleme hatası:", err);
  }
}
loadHeaderFooter()
