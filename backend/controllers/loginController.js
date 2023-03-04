const { User: UserModel } = require("../models/User");
const bcryptjs = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const loginController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email: email }).select(
        "+password"
      );

      if (!user) {
        return res.status(403).send({ user, message: "Login inválido!" });
      }

      const checkPassword = await bcryptjs.compare(password, user.password);

      if (!checkPassword) {
        return res.status(403).send({ checkPassword, message: "Login inválido!" });
      }

      try {
        const secret = process.env.SECRET;
        const token = jwt.sign(
          {
            id: user._id,
          },
          secret
        );
        res.status(200).send({ message: "Autenticação realizada", token });
      } catch (error) {
        res.status(400).send({ message: "Error ao fazer a autenticação" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error ao fazer a comunicação com o servidor" });
    }
  },
};

module.exports = loginController;
