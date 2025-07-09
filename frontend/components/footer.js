document.addEventListener("DOMContentLoaded", () => {
  // footer.html을 가져와서 id="footer-container" 자리에 넣기
  fetch("../components/footer.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("footer-container").innerHTML = html;
    });
});
