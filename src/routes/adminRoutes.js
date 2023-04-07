// Requires
const { Router } = require("express");
const router = Router();

// Controllers
const { getAllAdminsDb, postAdminDb, putAdminById, deleteAdminById } = require("../controllers/admin");

router.get("/", async (req, res) => {
    try {
        res.status(200).send(await getAllAdminsDb());
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/", async (req, res) => {
    try {
        let formData = req.body;
        res.status(201).send(await postAdminDb(formData));
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let formData = req.body;
        res.status(200).send(await putAdminById(id, formData));
    } catch (error) {
        res.status(401).send(error);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        res.status(204).send(await deleteAdminById(id));
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;
