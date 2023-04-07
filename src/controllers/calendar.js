const { Barber, Calendar } = require("../db");

const createCalendar = async (id, start, final) => {
  const barberFound = await Barber.findByPk(id);
  console.log(barberFound);
  //Create Schedule
  let horaInicio = start;
  let horaFinal = final;
  const franjaHoraria = [];
  const horaInicioParts = horaInicio.split(":");
  const horaFinalParts = horaFinal.split(":");
  let hora = parseInt(horaInicioParts[0]);
  let minutos = parseInt(horaInicioParts[1]);

  while (
    hora < parseInt(horaFinalParts[0]) ||
    (hora === parseInt(horaFinalParts[0]) &&
      minutos <= parseInt(horaFinalParts[1]))
  ) {
    const horarioFraccionado = {
      hora: `${hora.toString().padStart(2, "0")}:${minutos
        .toString()
        .padStart(2, "0")}`,
      reserved: false,
    };
    franjaHoraria.push(horarioFraccionado);
    minutos += 30;
    if (minutos === 60) {
      minutos = 0;
      hora += 1;
    }
  }
  //Create calendar (30 days from now)

  const dates = [];
  const actuallyDate = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(
      actuallyDate.getFullYear(),
      actuallyDate.getMonth(),
      actuallyDate.getDate() + i
    );
    const day = {
      date,
      full: false,
      schedule: franjaHoraria,
    };
    dates.push(day);
  }

  let newCalendar = await Calendar.create({
    date: dates,
  });

  await barberFound.addCalendar(newCalendar);

  return newCalendar;
};

const getCalendar = async (id) => {
  let foundCalendar = await Calendar.findByPk(id);
  return foundCalendar;
};

const getAllCalendars = async () => {
  let foundAllCalendars = await Calendar.findAll();
  return foundAllCalendars;
};

const putCalendar = async (id, dates, hours) => {
  const registro = await Calendar.findByPk(id);
  /* const registro = await foundBarber.getCalendars(); */
  /* console.log(registro[0].date) */ // buscar el registro por ID

  const fecha = registro.date.find((fecha) => fecha.date === dates);

  console.log(fecha);

  const hora = fecha.schedule.find((hora) => hora.hora === hours);

  console.log(hora);
  hora.reserved = true;
  await registro.save();
};

const updateDates = async () => {
  const currentDate = new Date();
  let calendars = await Calendar.findAll();

  calendars.forEach(async (calendar) => {
    let deletedDays = 0;
    calendar.date.forEach((day, index) => {
      const dayDate = new Date(day.date);
      if (dayDate < currentDate) {
        calendar.date.splice(index, 1);
        deletedDays++;
      } else if (dayDate > currentDate) {
        return false; // break out of loop
      }
    });

    for (let i = 0; i < deletedDays; i++) {
      const lastDay = new Date(calendar.date[calendar.date.length - 1].date);
      const newDay = new Date(lastDay.setDate(lastDay.getDate() + 1));
      calendar.date.push({
        date: newDay.toISOString(),
        full: false,
        schedule: [],
      });
    }

    await calendar.save(); // Guardar el calendario modificado en la base de datos
  });
};

const deleteCalendar = async (id) => {
  const deletedCalendar = await Calendar.destroy({ where: { id } });
  return deletedCalendar;
};

module.exports = {
  createCalendar,
  getCalendar,
  getAllCalendars,
  putCalendar,
  updateDates,
  deleteCalendar,
};
