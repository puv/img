const Router = require('express').Router;
const fs = require('fs');
const router = Router();
const Post = require('../database/models/Post');

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

router.all('/', (req, res) => {
    res.sendStatus(200);
});

router.get('/post/:id', (req, res) => {
    Post.findOne({ postID: req.params.id }).then((post) => {
        if (!post) {
            res.sendStatus(404);
        } else {
            res.send({ postID: req.params.id, images: post.images })
        }
    }).catch((err) => {
        console.log(err);
    });
});

router.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let files = req.files.file;

    if (typeof files == "object") {
        files = [files];
    }

    postID = generateRandomString(8);
    fileList = [];

    for (let file of files) {
        if (file.mimetype.split("/")[0] !== "image") return;
        if (file.data.length > 5000000) return;

        if (!fs.existsSync('./uploads')) {
            fs.mkdirSync('./uploads');
        }

        file_name_parts = file.name.split('.');
        file_name = generateRandomString(10) + "." + file_name_parts[file_name_parts.length - 1]
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
        images: fileList
    });

    post.save().then(() => {
        console.log("Post saved successfully!");

        res.send({
            postID: postID
        });
    }).catch((err) => {
        console.log(err);

        res.sendStatus(500);
    });
});

router.all('*', (req, res) => {
    res.sendStatus(404);
});

module.exports = router;