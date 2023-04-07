const router = require("express").Router();
const Post = require("../../database/models/Post");
const fs = require("fs");

const { generateRandomString } = require("../../functions");

router.post("/", (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    let files = req.files.file;

    console.log(files.length);

    if (files.length === undefined) {
        files = [files];
    }

    postID = generateRandomString(8);
    fileList = [];

    for (let file of files) {
        if (file.mimetype.split("/")[0] !== "image") return;
        if (file.data.length > 5000000) return;

        if (!fs.existsSync("./uploads")) {
            fs.mkdirSync("./uploads");
        }

        file_name_parts = file.name.split(".");
        file_name =
            generateRandomString(10) +
            "." +
            file_name_parts[file_name_parts.length - 1];
        file.mv(`./uploads/${file_name}`, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        });

        fileList.push(file_name);
    }

    // Needs checking if post and files already exist

    const post = new Post({
        postID: postID,
        images: fileList,
    });

    post
        .save()
        .then(() => {
            console.log("Post saved successfully!");

            res.send({
                postID: postID,
            });
        })
        .catch((err) => {
            console.log(err);

            res.sendStatus(500);
        });
});

module.exports = router;
