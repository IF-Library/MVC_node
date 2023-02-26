const { Task: TaskModel } = require("../models/Task");

const taskController = {
    create: async (req, res) => {
        try {
            const task = {
                title: req.body.title,
                description: req.body.description,
                date: req.body.date,
                isLate: req.body.isLate,
            }

            const response = await TaskModel.create(task);

            res.status(201).json({ response, msg: "Tarefa criada com sucesso" });

        } catch (error) {
            res.status(500).json({ msg: "Erro ao comunicar com o servidor" });
        }
    },
    getAll: async (req, res) => {
        try {
            const response = await TaskModel.find();

            res.status(200).json(response);

        } catch (error) {
            res.status(500).json({ msg: "Erro ao comunicar com o servidor" });
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await TaskModel.findById(id);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ msg: "Erro ao comunicar com o servidor" });
        }
    },
    upadate: async (req, res) => {
        try {
            const id = req.body._id;
            const task = {
                title: req.body.title,
                description: req.body.description,
                date: req.body.date,
                isLate: req.body.isLate,
            }
            const response = await TaskModel.findByIdAndUpdate(id, task);

            if (!response) {
                res.status(400).json({ msg: "O id informado não foi encontrado na base!" });
            }
            res.status(200).json({ msg: "A tarefa foi alterada com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: "Erro ao comunicar com o servidor" });
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            console.log(id)
            const response = await TaskModel.findByIdAndDelete(id);
            if (!response) {
                response.status(400).json({ msg: "O id informado não foi encontrado na base!" });
            }
            res.status(200).json({ msg: "A tarefa foi deletada com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: "Erro ao comunicar com o servidor" });
        }
    }
};

module.exports = taskController;