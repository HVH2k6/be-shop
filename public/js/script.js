const btn_status = document.querySelectorAll("[button-status]");
const formSearch = document.querySelector("#form-search");
const btn_pagination = document.querySelectorAll("[button-pagination]");

if (btn_status) {
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
if (formSearch) {
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
}
//check box

const formDelete = document.querySelector("#form-delete");
const btnDelete = document.querySelectorAll(".btn-delete");
const path = formDelete.getAttribute("data-path");
if (btnDelete) {
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      if (confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
        const id = btn.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`;
        formDelete.action = action;
        console.log("btn.addEventListener ~ action:", action)
        
        formDelete.submit();
      }
    });
  });
}

const sortForm = document.querySelector("#sort-form");

if (sortForm) {
  const sort = document.querySelector("#sort");
  const btnClear = document.querySelector("#btn-clear");
  let url = new URL(window.location.href);
  sort.addEventListener("change", (event) => {
    const value = event.target.value;
    const [sortValue, sortKey] = value.split("-");

    url.searchParams.set("sort", sortValue);
    url.searchParams.set("sortKey", sortKey);
    window.location.href = url.href;
  });
  btnClear.addEventListener("click", (event) => {
    url.searchParams.delete("sort");
    url.searchParams.delete("sortKey");
    window.location.href = url.href;
  });
  const sortKey = url.searchParams.get("sortKey");
  console.log("sortKey:", sortKey);
  const sortValue = url.searchParams.get("sort");
  console.log("sortValue:", sortValue);
  if (sortKey && sortValue) {
    const stringSort = `${sortValue}-${sortKey}`;
    const selected = document.querySelector(`option[value="${stringSort}"]`);
    console.log("stringSort:", stringSort);
    selected.selected = true;
  }
}
