const { User: UserModel } = require("../models/User");

const userController = {

    create: async (req, res) => {
        try {
            const { email } = req.body;

            if (await UserModel.findOne({ email })) {
                return res.status().send({ error: true, message: "Email de usuário já existe" });
            }
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                tasks: req.body.tasks,
            }
            
            const response = await UserModel.create(user);
            response.password = undefined;

            res.status(201).send({ response, msg: "Usuário criada com sucesso" });

        } catch (error) {
            const retorno = Object.keys(error.errors);
            let erro = retorno.map((elem) => {
                return error.errors[elem].message.split("Path ")[1];
            })
            res.status(500).send({ erro, msg: "Erro ao comunicar com o servidor" });
        }
    },

    getAll: async (req, res) => {
        try {
            const response = await UserModel.find();
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({ msg: "Erro ao comunicar com o servidor" });
        }
    },

    get: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await UserModel.findById(id);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({ msg: "Erro ao comunicar com o servidor" });
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
                res.status(400).send({ msg: "O id informado não foi encontrado na base!" });
                return
            }
            res.status(200).send({ msg: "O usuário foi alterado com sucesso!" });
        } catch (error) {
            res.status(500).send({ msg: "Erro ao comunicar com o servidor" });
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await UserModel.findByIdAndDelete(id);
            if (!response) {
                response.status(400).send({ msg: "O id informado não foi encontrado na base!" });
            }
            res.status(200).send({ msg: "O usuário foi excluído com sucesso!" });
        } catch (error) {
            res.status(500).send({ msg: "Erro ao comunicar com o servidor" });
        }
    }
}

module.exports = userController;