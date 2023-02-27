const { response } = require("express");
const { User: UserModel } = require("../models/User");

const userController = {

    create: async (req, res) => {
        try {
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                tasks: req.body.tasks,
            }

            const response = await UserModel.create(user);

            res.status(200).json({ response, msg: "Usuário criado com sucesso" });

        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAll: async (req, res) => {
        try {
            const response = await UserModel.find();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ msg: "Houve algum problema" })
        }
    },

    get: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await UserModel.findById(id);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                tasks: req.body.tasks,
            }
            const response = await UserModel.findByIdAndUpdate(id, user);

            res.status(200).json({ response, msg: "Atualizado com sucesso" });
        } catch (error) {
            res.status(500).json({ msg: "deu ruim" });
        }
    }
}

module.exports = userController;