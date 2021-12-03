const theme = document.getElementById("theme");

theme.addEventListener("click", () => {
  document.querySelector("body").classList = [
    theme.checked ? "theme-light" : "theme-dark",
  ];
});
