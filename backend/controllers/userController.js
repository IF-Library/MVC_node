const { response } = require("express");
const { User: UserModel } = require("../models/User");

const userController = {

    create: async (req, res) => {
        try {

            const { email } = req.body;

            if (await UserModel.findOne({ email })) {
                return res.status(400).json({ error: true, message: "Email de usuário já existe" });
            }

            const user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                tasks: req.body.tasks,
            }

            const response = await UserModel.create(user);
            response.password = undefined;

            res.status(201).json({ response, msg: "Usuário criada com sucesso" });

        } catch (error) {
            res.status(500).json({ msg: "Erro ao comunicar com o servidor" });
        }
    },

    getAll: async (req, res) => {
        try {
            const response = await UserModel.find();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ msg: "Erro ao comunicar com o servidor" });
        }
    },

    get: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await UserModel.findById(id);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ msg: "Erro ao comunicar com o servidor" });
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

            if (!response) {
                res.status(400).json({ msg: "O id informado não foi encontrado na base!" });
                return
            }
            res.status(200).json({ msg: "O usuário foi alterado com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: "Erro ao comunicar com o servidor" });
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await UserModel.findByIdAndDelete(id);
            if (!response) {
                response.status(400).json({ msg: "O id informado não foi encontrado na base!" });
            }
            res.status(200).json({ msg: "O usuário foi excluído com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: "Erro ao comunicar com o servidor" });
        }
    }
}

module.exports = userController;