import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  // Cria um usuario
  async store(req, res) {
    const { email = '', password = '' } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        errors: ['credenciais invalidas'],
      });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        errors: ['Usuario nao existe'],
      });
    }
    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha Invalida'],
      });
    }
    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({ token, user: { nome: user.nome, id, email } });
  }
}

export default new TokenController();
