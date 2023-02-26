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

            res.status(201).json({ response, msg: "Tarefa criada com sucesso" })

        } catch (error) {
            res.status(500).json({ msg: "Erro ao comunicar com o servidor" })
        }
    }
};

module.exports = taskController;