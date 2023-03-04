require("dotenv").config();
const jwt = require("jsonwebtoken");

//Realiza a autenticação do token
function checkToken(req, res, next) {
  const authHearder = req.headers["authorization"];
  const token = authHearder && authHearder.split(" ")[1];
  if (!authHearder) {
    return res.status(403).send({ message: "Acesso negado" });
  }

  const secret = process.env.SECRET;
  jwt.verify(token, secret, (error, decoded) => {
    if (error)
      return res.status(403).send({ error: "Falha ao realizar login!" });
    req.userId = decoded.id;
    return next();
  });
}

module.exports = checkToken;
