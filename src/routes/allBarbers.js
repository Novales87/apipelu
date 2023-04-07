const { Router } = require("express");
const {
  createBarber,
  deleteBarber,
  updateBarber,
  getAllBarbers,
  getBarberById,
  getBarberByNameAndLastName,
} = require("../controllers/AddBarber");
const router = Router();

router.get("/", getAllBarbers);
router.post("/", createBarber);
router.put("/:id", updateBarber);
router.get("/:id", getBarberById);
router.delete("/:id", deleteBarber);
router.get("/name", getBarberByNameAndLastName);

module.exports = router;
