const Input = document.getElementById("file__upload__input");
const FileUpload = document.getElementById("file__upload");
const ProgressBar = document.getElementById("progress__bar");

function Upload(files) {
    ProgressBar.classList.add("active");
    dataArray = [];
    const formData = new FormData();

    for (let file of files) {
        if (file.type.split("/")[0] !== "image") continue;
        if (file.size > 5000000) continue;
        console.log(file);
        formData.append("file", file);
        // fileReader = new FileReader();
        // fileReader.readAsDataURL(file);
        // fileReader.onloadend = () => {
        //   dataArray.push(fileReader.result);
        // }
    }

    $.ajax({
        url: "/api/upload",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: (data) => {
            document.location.href = `/post/${data.postID}`; // API pages are strictly for JSON responses, so we redirect to the post page
        },
    });
}

Input.addEventListener("change", () => {
    Upload(Input.files);
});

Input.addEventListener(
    "dragover",
    (e) => {
        e.preventDefault();
        e.stopPropagation();
        FileUpload.classList.add("active");
    }
);