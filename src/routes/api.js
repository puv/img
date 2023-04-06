const bodyParser = require('body-parser');
const Router = require('express').Router;
const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.all('/', (req, res) => {
    res.sendStatus(200);
});

router.post('/upload', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

router.all('*', (req, res) => {
    res.sendStatus(404);
});

module.exports = router;