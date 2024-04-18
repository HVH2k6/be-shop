const table = document.querySelector("#table");
if (table) {
  const btn_submit = document.querySelector("#btn-submit");
  btn_submit.addEventListener("click", (event) => {
    event.preventDefault();
    let permissions = [];
    const rows = table.querySelectorAll("[data-name]");
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");

      const inputs = row.querySelectorAll("input");
      if (name == "id") {
        inputs.forEach((input) => {
          const id = input.value;
          permissions.push({
            id: id,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;

          if (checked) {
            permissions[index].permissions.push(name);
          }
        });
      }
    });
    console.log(permissions);
    if (permissions.length > 0) {
      const form = document.querySelector("#form-permission");

      const inputPermissions = form.querySelector("input[name=permission]");

      inputPermissions.value = JSON.stringify(permissions);
      form.submit();
    }
  });
}
const dataRelust = document.querySelector("[data-relust]");

if (dataRelust) {
  const relust = JSON.parse(dataRelust.getAttribute("data-relust"));
  
  relust.forEach((item,index) => {
    const permissions = item.permission;
    permissions.forEach((permission) => {
      const row = table.querySelector(`[data-name="${permission}"]`);
      const inputs = row.querySelectorAll("input");
      inputs[index].checked = true;
      
      
    });
  })
  
}

