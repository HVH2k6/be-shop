const itemClick = document.querySelectorAll(".item-click");
const listItem = document.querySelector(".list-item");
itemClick.forEach((item) => {
  item.addEventListener("click", (e) => {
    let activeClass = "active";
    const contentAccordion = e.target.nextElementSibling;
    contentAccordion.style.height = `${contentAccordion.scrollHeight}px`;
    contentAccordion.classList.toggle(activeClass);
    if (!contentAccordion.classList.contains("active")) {
      contentAccordion.style.height = 0;
    }
  });
});