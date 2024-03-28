const btn_status = document.querySelectorAll("[button-status]");
const formSearch = document.querySelector("#form-search");
const btn_pagination = document.querySelectorAll("[button-pagination]");
console.log("btn_pagination:", btn_pagination);
if (btn_status.length > 0) {
  btn_status.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const status = btn.getAttribute("button-status");
      try {
        let url = new URL(window.location.href);
        if (status) {
          url.searchParams.set("status", status);
        } else {
          url.searchParams.delete("status");
        }
        window.location.href = url;
      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
    });
  });
}

// phân trang
btn_pagination.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const page = btn.getAttribute("button-pagination");
    console.log("btn.addEventListener ~ page:", page);
    try {
      let url = new URL(window.location.href);
      console.log("btn.addEventListener ~ url:", url);
      if (page) {
        url.searchParams.set("page", page);
      } else {
        url.searchParams.delete("page");
      }
      window.location.href = url;
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  });
});
formSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  let url = new URL(window.location.href);

  const keyword = event.target.elements.keyword.value;

  if (keyword) {
    url.searchParams.set("keyword", keyword);
  } else {
    url.searchParams.delete("keyword");
  }
  window.location.href = url;
});
//check box

const formDelete = document.querySelector("#form-delete");
const btnDelete = document.querySelector(".btn-delete");
const path = formDelete.getAttribute("data-path");
if (btnDelete) {
  btnDelete.addEventListener("click", (event) => {
    event.preventDefault();
    if (confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      const id = btnDelete.getAttribute("data-id");
      const action = `${path}/${id}?_method=DELETE`;
      formDelete.action = action;
      console.log("btnDelete.addEventListener ~ action:", action);
      formDelete.submit();
    }
  });
}
const delay = 3000;

window.addEventListener("load", () => {
  const alert = document.querySelector(".alert");
  const timeAnimation = (delay / 1000).toFixed(2);
  console.log("window.addEventListener ~ timeAnimation:", timeAnimation)
  alert.style.animation = `hideAlert linear 1s ${timeAnimation}s forwards`;

  alert.addEventListener("animationend", () => {
    alert.parentElement.removeChild(alert);
  });
});
