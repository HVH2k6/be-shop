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
        console.log("checkBoxAll.addEventListener ~ check:", check.value);
      });
    });
  });
  checkId.forEach((check) => {
    check.addEventListener("click", () => {
      console.log("check.addEventListener ~ check:", check.value);
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
   const typeChange = event.target.elements.type.value; 
   if(typeChange=="delete"){
     const isConfirm = confirm("Bạn có chắc muốn xóa nhiều sản phẩm")
    if(!isConfirm){
     return
    }
   }  
   if(typeChange=="restore"){
    const isConfirm = confirm("Bạn có chắc muốn khôi phục nhiều sản phẩm")
   if(!isConfirm){
    return
   }
  }  
    if (checkId.length > 0) {
      let ids = [];
      const inputIds = formCheck.querySelector("input[name='ids']");

      checkId.forEach((check) => {
        id = check.value;

        if(typeChange=="position"){
          const position = check.closest("tr").querySelector("input[name=position]").value;

          ids.push(`${id}-${position}`);
        }else {
          ids.push(id);
        }
        if(typeChange=="restore"){
          ids.push(id);
        }
      });
      
      
      inputIds.value = ids.join(",");
      
      formCheck.submit();
    } else {
      alert("Vui lòng chọn sản phẩm");
    }
  });
}