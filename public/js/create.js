const image_preview = document.querySelector("#image_preview");
const image_input = document.querySelector("#image_product");
const remove_btn = document.querySelector("#remove_image");
if (image_input) {
    image_input.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
         image_preview.src = URL.createObjectURL(file);
         remove_btn.style.display = "block";
         if (remove_btn) {
            remove_btn.addEventListener("click", (event) => {
                event.preventDefault();
                image_preview.src = "";
                image_input.value = "";
                remove_btn.style.display = "none";
            });
          }ed
        }
    });
}
