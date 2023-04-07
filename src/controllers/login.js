require('dotenv').config();
const { SECRET } = process.env;
const { Admin } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign(user, SECRET, {
        expiresIn: '2h'
    });
}

const verifyLogin = async (formData) => {
    const {
        email,
        password
    } = formData;

    if(!email || !password) {
        throw {
            status:false,
            message: 'Error, tiene que ingresar los datos requeridos email y password'
        }
    }

    const admin = await Admin.findOne({
        where: {
            email,
        },
        raw: true,
    });

    if(admin) {
        if(bcrypt.compareSync(password, admin.password)) {
            const accessToken = generateAccessToken({id: admin.id, onDuty: admin.onDuty});
            return accessToken;
        } else {
            throw {
                status: false,
                message: 'Contraseña incorrecta',
            }
        }
    } else {
        throw {
            status: false,
            message: 'Correo incorrecto',
        }
    }
}

module.exports = { verifyLogin };