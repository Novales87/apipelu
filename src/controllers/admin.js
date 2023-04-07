const { Admin } = require('../db');
const bcrypt = require("bcrypt");
const saltRound = 10;
const salt = bcrypt.genSaltSync(saltRound);

const getAllAdminsDb = async () => {
    const allAdminDb = await Admin.findAll();
    return allAdminDb;
}

const postAdminDb = async (formData) => {
    const {
        email,
        name,
        password,
    } = formData;
    if (email && name && password) {
        const hashPw = bcrypt.hashSync(password, salt);
        // console.log(hashPw);
        const nameCi = name.toLowerCase(); // case insensitive
        const emailCi = email.toLowerCase(); // case insensitive
        const findEmail = await Admin.findOne({where: { email: emailCi }});
        const findAdminName = await Admin.findOne({ where: { name: nameCi }});
        if (findEmail || findAdminName) {
            throw {
                status: false,
                message: "Email or admin name already in use",
            }
        }
        await Admin.create({
            name: nameCi,
            email: emailCi,
            password: hashPw,
        });
        
        return "Usuario creado exitosamente";
    }
}

const putAdminById = async (id, formData) => {
    let {
        email,
        name,
        password
    } = formData;
    password = bcrypt.hashSync(password, salt);

    const admin = await Admin.findByPk(id);
    if (admin) {
        await admin.update({
            email: email ? email : admin.email,
            name: name ? name : admin.name,
            password: password ? password : admin.password,
        });
        return "Admin actualizado exitosamente";
    } else {
        throw {
            status: false,
            message: "Error no se pudo actualizar el admin!",
        }
    }
}

const deleteAdminById = async (id) => {
    const admin = await Admin.findByPk(id);
    await admin.destroy();
    return "Admin eliminado exitosamente";
}

module.exports = {
    getAllAdminsDb,
    postAdminDb,
    putAdminById,
    deleteAdminById,
}