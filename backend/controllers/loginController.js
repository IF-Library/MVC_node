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
        return res.status(403).send({ user, msg: "Login inválido!" });
      }

      const checkPassword = await bcryptjs.compare(password, user.password);

      if (!checkPassword) {
        return res.status(403).send({ checkPassword, msg: "Login inválido!" });
      }

      try {
        const secret = process.env.SECRET;
        const token = jwt.sign(
          {
            id: user._id,
          },
          secret
        );
        return res.status(200).send({ msg: "Autenticação realizada", token });
      } catch (error) {
        return res.status(400).send({ msg: "Error ao fazer a autenticação" });
      }
    } catch (error) {
      return res
        .status(500)
        .send({ msg: "Error ao fazer a comunicação com o servidor" });
    }
  },
};

module.exports = loginController;
