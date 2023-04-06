const Uploader = document.getElementById("uploader");

function Upload(files) {
  dataArray = [];
  const formData = new FormData();

  for (let file of files) {
    if (file.type.split("/")[0] !== "image") return;
    if (file.size > 5000000) return;
    console.log(file);
    formData.append('file', file);
    console.log(formData);
    // fileReader = new FileReader();
    // fileReader.readAsDataURL(file);
    // fileReader.onloadend = () => {
    //   dataArray.push(fileReader.result);
    // }
  }

  console.log(formData);

  $.ajax({
    url: "/api/upload",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: (data) => {
      console.log(data);
    }
  })
}

function fileHandler(file, name, type) {

  if (type.split("/")[0] !== "image") {
    // Error occur
    alert("The website only support images, we're working on more.");

    return false;
  }

  const fileReader = new FileReader();

  fileReader.readAsDataURL(file);
  fileReader.onloadend = () => {
    const displayContainer = document.getElementById("display");
    const imageDisplay = document.createElement("img");

    imageDisplay.src = fileReader.result;

    // displayContainer.innerHTML = ""; // ! Removing this will allow the website to accept multiple images

    // displayContainer.appendChild(imageDisplay);
  };
}

Uploader.addEventListener("change", () => {
  Upload(Uploader.files);
});
