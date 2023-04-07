const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const allBarbers = require("./allBarbers.js");
const calendarRoute= require ('./calendarRoutes.js')
const adminRoutes = require('./adminRoutes.js');
const loginRoutes = require('./loginRoutes.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/barbers", allBarbers);

router.use('/calendar', calendarRoute);

router.use('/admins', adminRoutes);

router.use('/login', loginRoutes);


module.exports = router;
