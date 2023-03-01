const { User: UserModel } = require("../models/User");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
require('dotenv').config();
const jwt = require('jsonwebtoken');

const loginController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email: email }).select('+password');

            if (!user) {
                return res.status(403).json({ user, msg: "Login inválido!" });
            }

            const checkPassword = await bcryptjs.compare(password, user.password)

            if (!checkPassword) {
                return res.status(403).json({ checkPassword, msg: "Login inválido!" });
            }

            try {
                const secret = process.env.SECRET;
                const token = jwt.sign(
                    {
                        id: user._id,
                    },
                    secret
                );
                return res.status(200).json({ msg: "Autenticação realizada", token });
            } catch (error) {
                return res.status(400).json({ msg: "Error ao fazer a autenticação" });
            }

        } catch (error) {
            return res.status(500).json({ msg: "Error ao fazer a comunicação com o servidor" });
        }
    }
}


module.exports = loginController;
