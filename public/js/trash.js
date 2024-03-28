const formRestore = document.querySelector("#form-restore");
console.log("formRestore:", formRestore);
const btnRestore = document.querySelector(".btn-restore");

console.log("btnRestore:", btnRestore);
const pathRestore = formRestore.getAttribute("data-path");
if (btnRestore) {
  btnRestore.addEventListener("click", (event) => {
    event.preventDefault();
    
      const id = btnRestore.getAttribute("data-id");
      const action = `${pathRestore}/${id}?_method=DELETE`;
      formRestore.action = action;
      console.log("btnRestore.addEventListener ~ action:", action)
      
      formRestore.submit();
    
  });
}
