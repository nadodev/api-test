import Funcionarios from '../models/Funcionarios';
import Photo from '../models/Photo';

class FuncionariosControllers {
  async store(req, res) {
    try {
      const user = await Funcionarios.create(req.body);
      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async mostrar(req, res) {
    try {
      const novoUser = await Funcionarios.findAll({
        attributes: ['id', 'name', 'email', 'cpf', 'celular', 'status', 'conhecimentos'],
        order: [['name', 'ASC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['url', 'filename', 'funcionarios_id'],
        },
      });
      return res.json(novoUser);
    } catch (e) {
      return res.status(400).json(e.erros);
    }
  }

  async mostraUm(req, res) {
    try {
      const user = await Funcionarios.findByPk(req.params.id, {
        attributes: ['id', 'name', 'email', 'cpf', 'celular', 'status', 'conhecimentos'],
        order: [['name', 'ASC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['url', 'filename', 'funcionarios_id'],
        },
      });
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

  // eslint-disable-next-line consistent-return
  async ativarUser(req, res) {
    try {
      const user = await Funcionarios.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ['Esse usuario não existe'],
        });
      }
      const Novouser = await Funcionarios.findOne(req.params.status);
      if (!Novouser) {
        return res.status(401).json({
          errors: ['Usuario ja esta ativado'],
        });
      }
      const novoUser = await Novouser.update({ status: true });
      return res.json(novoUser);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['Informe um id'],
        });
      }
      const user = await Funcionarios.findByPk(req.params.id);
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

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Informe um id'],
        });
      }
      const user = await Funcionarios.findByPk(id);
      if (!user) {
        return res.status(400).json({
          errors: ['Esse usuario não existe'],
        });
      }
      await user.destroy();
      return res.json({
        apagado: true,
      });
    } catch (e) {
      return res.status(400).json(null);
    }
  }
}

export default new FuncionariosControllers();
