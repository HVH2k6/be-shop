const btn_change_status = document.querySelectorAll("[button_change_status]");
if (btn_change_status.length > 0) {
  const form_change_status = document.querySelector("#form-status");
  console.log("form_change_status:", form_change_status);
  let path = form_change_status.getAttribute("data-path");
  console.log("path:", path);
  btn_change_status.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const statusCurrent = btn.getAttribute("data-status");
      console.log("btn.addEventListener ~ statusCurrent:", statusCurrent)

      const id = btn.getAttribute("data-id");
      let change = statusCurrent == "active" ? "inactive" : "active";
      console.log("btn.addEventListener ~ change:", change);

      const action = path + `/${change}/${id}?_method=PATCH`;
      form_change_status.action = action;
      console.log("btn.addEventListener ~ action:", action);

        form_change_status.submit();
    });
  });
}
