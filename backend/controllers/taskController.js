const { Task: TaskModel } = require("../models/Task");

const taskController = {
    create: async (req, res) => {
        try {
            const task = {
                title: req.body.title,
                description: req.body.description,
                date: req.body.date,
                isLate: req.body.isLate,
                user: req.body.userId,
            }
            const response = await TaskModel.create(task);
            res.status(201).send({ response, msg: "Tarefa criada com sucesso" });

        } catch (error) {
            res.status(500).send({ msg: "Erro ao comunicar com o servidor" });
        }
    },
    getAll: async (req, res) => {
        try {
            const response = await TaskModel.find();

            res.status(200).send(response);

        } catch (error) {
            res.status(500).send({ msg: "Erro ao comunicar com o servidor" });
        }
    },
    getAllTasksUser: async (req, res) => {
        try {
            const user = req.params.userId;
            const response = await TaskModel.find({ user });

            if (response.length === 0) {
                return res.status(400).send({ msg: "Não foi encontrada nenhuma atividade para este úsuario" })
            }
            res.status(200).send(response);

        } catch (error) {
            res.status(500).send({ msg: "Erro ao comunicar com servidor" });
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await TaskModel.findById(id);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({ msg: "Erro ao comunicar com o servidor" });
        }
    },
    upadate: async (req, res) => {
        try {
            const id = req.params.id;
            const task = {
                title: req.body.title,
                description: req.body.description,
                date: req.body.date,
                isLate: req.body.isLate,
            }
            const response = await TaskModel.findByIdAndUpdate(id, task);

            if (!response) {
                res.status(400).send({ msg: "O id informado não foi encontrado na base!" });
                return
            }
            res.status(200).send({ msg: "A tarefa foi alterada com sucesso!" });
        } catch (error) {
            res.status(500).send({ msg: "Erro ao comunicar com o servidor" });
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await TaskModel.findByIdAndDelete(id);
            if (!response) {
                response.status(400).send({ msg: "O id informado não foi encontrado na base!" });
            }
            res.status(200).send({ msg: "A tarefa foi deletada com sucesso!" });
        } catch (error) {
            res.status(500).send({ msg: "Erro ao comunicar com o servidor" });
        }
    }
};

module.exports = taskController;