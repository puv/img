const uploaderButton = document.getElementById("uploader");
const chosenImage = document.getElementById("chosen");
const fileName = "";
const container = "";

function fileHandler(file, name, type) {
  if (type.split("/")[0] !== "image") {
    // Error occur
    alert("Error!!!");

    return false;
  }

  const fileReader = new FileReader();

  fileReader.readAsDataURL(file);
  fileReader.onloadend = () => {
    console.log("loadend");
    alert("loadend");
  };
}

uploaderButton.addEventListener("change", () => {
  Array.from(uploaderButton.files).forEach((f) => {
    fileHandler(f, f.name, f.type);
  });
});
