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
    }
}

module.exports = userController;