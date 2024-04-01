const formRestore = document.querySelector("#form-restore");
const formDeleteInfinite = document.querySelector("#form-delete-infinite");


const btnRestore = document.querySelector(".btn-restore");
const btnDelete = document.querySelector(".btn-delete");


const pathRestore = formRestore.getAttribute("data-path");
const pathDelete = formDeleteInfinite.getAttribute("data-path");

if (btnRestore) {
  btnRestore.addEventListener("click", (event) => {
    event.preventDefault();

    const id = btnRestore.getAttribute("data-id");
    const action = `${pathRestore}/${id}?_method=DELETE`;
    formRestore.action = action;

    formRestore.submit();
  });
}
if(btnDelete){
  btnDelete.addEventListener("click", (event) => {
    event.preventDefault();
    const id = btnDelete.getAttribute("data-id");
    const action = `${pathDelete}/${id}?_method=DELETE`;
    formDeleteInfinite.action = action;
    formDeleteInfinite.submit();
  });
}