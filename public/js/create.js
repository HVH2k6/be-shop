const image_preview = document.querySelector(".image_preview");
const image_preview_2 = document.querySelector(".image_preview_2");

const image_input = document.querySelector(".image_file_preview");


const remove_btn = document.querySelector(".remove_image");
const remove_btn_2 = document.querySelector(".remove_image_2");
const delete_img_cloud = document.querySelector("[form-delete-img]");
if(remove_btn){
  remove_btn.addEventListener("click", (event) => {
    event.preventDefault();
    let url_img = image_preview.getAttribute("src");
    url_img = url_img.split("/").pop().split(".")[0];
    const data_id = remove_btn.getAttribute("data-id");
    console.log("remove_btn.addEventListener ~ url_img:", url_img)
    if (delete_img_cloud) {
      delete_img_cloud.action += `/${data_id}?_method=DELETE`;
      delete_img_cloud.submit();
    }
    // image_input.value = "";
    // image_preview.src = "";
    // remove_btn.style.display = "none";
  });
}
if (image_input) {
  image_input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      image_preview_2.src = URL.createObjectURL(file);
      image_preview.style.display = "none";
      remove_btn_2.style.display = "block";
      if (remove_btn) {
        remove_btn_2.addEventListener("click", (event) => {
          event.preventDefault();
          image_input.value = "";
          image_preview.src = "";
          remove_btn_2.style.display = "none";
        });
      }
    }
  });
}

