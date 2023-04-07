const { Barber, Calendar } = require("../db.js");

async function createBarber(req, res) {
  try {
    const { name, lastName, startDate, active } = req.body;

    // Validar campos vacíos
    if (!name || !lastName || !startDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Buscar si ya existe un barbero con el mismo nombre
    const existingBarber = await Barber.findOne({
      where: { name, lastName },
    });

    if (existingBarber) {
      return res.status(409).json({ message: "Barber already exists" });
    }

    // Crear un nuevo barbero
    const newBarber = await Barber.create({
      name,
      lastName,
      startDate,
      active,
    });

    res.json({ message: "Barber created successfully", data: newBarber });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
}

// Controlador para eliminar un barbero por ID

async function deleteBarber(req, res) {
  try {
    const { id } = req.params;

    // Buscar el barbero por ID
    const barber = await Barber.findOne({ where: { id } });

    // Verificar si el barbero existe
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    // Eliminar el barbero
    await barber.destroy();

    res.json({ message: "Barber deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
}

async function updateBarber(req, res) {
  try {
    const { id } = req.params;
    const { name, lastName, startDate, active } = req.body;
    console.log(id, name, lastName, startDate, active);

    // Buscar el barbero por ID
    const barber = await Barber.findOne({ where: { id } });

    // Verificar si el barbero existe
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    // Verificar si los datos enviados son iguales a los existentes
    if (
      name === barber.name &&
      lastName === barber.lastName &&
      startDate === barber.startDate &&
      active === barber.active
    ) {
      return res.status(200).json({
        message: "No se realizaron cambios",
        data: barber,
      });
    }

    // Actualizar los datos del barbero
    barber.name = name;
    barber.lastName = lastName;
    barber.startDate = startDate;
    barber.active = active;
    await barber.save();

    res.json({ message: "Barber updated successfully", data: barber });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
}

// Controlador para obtener todos los barberos

async function getAllBarbers(req, res) {
  try {
    const barbers = await Barber.findAll();
    res.json({ data: barbers });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
}

async function getBarberById(req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    /* const barber = await Barber.findByPk(id); */
    const barber = await Barber.findOne({
      where: {
        id: parseInt(id),
      },
      include: [
        {
          model: Calendar,
          attributes: ["id", "date"],
          through: { attributes: [] },
        },
      ],
    });
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }
    res.json(barber);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error", error });
  }
}

async function getBarberByNameAndLastName(req, res) {
  try {
    const { name, lastName } = req.query;
    const barber = await Barber.findOne({
      where: { name, lastName },
    });
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }
    res.json(barber);
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
}

module.exports = {
  createBarber,
  deleteBarber,
  updateBarber,
  getAllBarbers,
  getBarberById,
  getBarberByNameAndLastName,
};
