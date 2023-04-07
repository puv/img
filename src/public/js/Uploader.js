const Input = document.getElementById("file__upload__input");
const InputOverlay = document.getElementById("file__upload__overlay");

function Upload(files) {
    dataArray = [];
    const formData = new FormData();

    for (let file of files) {
        if (file.type.split("/")[0] !== "image") return;
        if (file.size > 5000000) return;
        console.log(file);
        formData.append("file", file);
        console.log(formData);
        // fileReader = new FileReader();
        // fileReader.readAsDataURL(file);
        // fileReader.onloadend = () => {
        //   dataArray.push(fileReader.result);
        // }
    }

    console.log(formData.entries());

    for (let pair of formData.entries()) {
        console.log(pair[1]);
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
        InputOverlay.classList.add("active");
    }
);