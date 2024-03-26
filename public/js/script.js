const btn_status = document.querySelectorAll("[button-status]");
const formSearch = document.querySelector("#form-search");
const btn_pagination = document.querySelectorAll("[button-pagination]");
console.log("btn_pagination:", btn_pagination)
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
formSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  let url = new URL(window.location.href);

  const keyword = e.target.elements.keyword.value;
  if (keyword) {
    url.searchParams.set("keyword", keyword);
    
  } else {
    url.searchParams.delete("keyword");
  }
  window.location.href = url;
});
// phân trang
btn_pagination.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const page = btn.getAttribute("button-pagination");
    console.log("btn.addEventListener ~ page:", page)
    try {
      let url = new URL(window.location.href);
      console.log("btn.addEventListener ~ url:", url)
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
})
