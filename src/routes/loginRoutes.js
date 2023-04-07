//Requires
const { Router } = require('express');
const router = Router();

//Controladores
const { verifyLogin } = require('../controllers/login');

router.post("/", async (req, res) => {
    const loginForm = req.body;
    try {
        const accessToken = await verifyLogin(loginForm);
        console.log(accessToken);
        res.cookie("token", accessToken, {
            httpOnly: true,
        })
        return res.status(201).send(accessToken);
    } catch (error) {
        return res.status(400).send(error);
    }
})

module.exports = router;