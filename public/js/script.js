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
const checkBoxMultiple = document.querySelector("[check-multiple]");
if (checkBoxMultiple) {
  const checkBoxAll = checkBoxMultiple.querySelectorAll(
    "input[name='checkAll']"
  );

  const checkId = checkBoxMultiple.querySelectorAll("input[name='id']");
  checkBoxAll.forEach((checkBox) => {
    checkBox.addEventListener("click", (event) => {
      checkId.forEach((check) => {
        check.checked = event.target.checked;
      });
    });
  });
  checkId.forEach((check) => {
    check.addEventListener("click", () => {
      const coutCheck = checkBoxMultiple.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      console.log("check.addEventListener ~ coutCheck:", coutCheck);
      console.log(checkId.length);
      if (coutCheck === checkId.length) {
        checkBoxAll.forEach((checkbox) => {
          checkbox.checked = true;
        });
      } else {
        checkBoxAll.forEach((checkbox) => {
          checkbox.checked = false;
        });
      }
    });
  });
}
const formCheck = document.querySelector("[form-change-multiple]");
if (formCheck) {
  formCheck.addEventListener("submit", (event) => {
    event.preventDefault();
    const checkId = document.querySelectorAll("input[name='id']:checked");
    const checkMultiple = document.querySelector("[ check-multiple]");
    console.log("formCheck.addEventListener ~ checkMultiple:", checkMultiple);
    if (checkId.length > 0) {
      let ids = [];
      const inputIds = formCheck.querySelector("input[name='ids']");

      checkId.forEach((check) => {
        id = check.value;

        ids.push(id);
      });
      inputIds.value = ids.join(",");
      formCheck.submit();
    } else {
      alert("Vui lòng chọn sản phẩm");
    }
  });
}
