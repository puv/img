const uploaderButton = document.getElementById("uploader");

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

uploaderButton.addEventListener("change", () => {
  Array.from(uploaderButton.files).forEach((f) => {
    fileHandler(f, f.name, f.type);
  });
});
