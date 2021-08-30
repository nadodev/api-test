import User from '../models/User';

class UserController {
  // Cria um usuario
  async store(req, res) {
    try {
      const user = await User.create(req.body);
      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // lista todos os usuarios
  async showAll(req, res) {
    try {
      const user = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(user);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  // lista apenas um usuario
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ['Esse usuario não existe'],
        });
      }
      return res.json(user);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  // Editar um usuario
  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['Informe um id'],
        });
      }
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ['Esse usuario não existe'],
        });
      }
      const novoUser = await user.update(req.body);
      return res.json(novoUser);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  // Editar um usuario
  async editar(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['Esse usuario não existe'],
        });
      }
      const novoUser = await user.update(req.body);
      return res.json(novoUser);
    } catch (e) {
      return res.status(400).json(null);
    }
  }
}

export default new UserController();
