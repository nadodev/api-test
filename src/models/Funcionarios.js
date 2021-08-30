/* eslint-disable no-param-reassign */
import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

export default class Funcionarios extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 100],
            msg: 'O Campo nome é Obrigatorio',
          },
        },
      },
      cpf: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'esse cpf ja existe',
        },
        validate: {
          len: {
            args: [3, 100],
            msg: 'O Campo nome é Obrigatorio',
          },
        },
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'esse email ja existe',
        },
        validate: {
          isEmail: {
            msg: 'Email invalido',
          },
        },
      },
      celular: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      conhecimentos: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 250],
            msg: 'O Campo nome é Obrigatorio',
          },
        },
      },
    },
    {
      sequelize,
    });
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  passwordIsValid(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'funcionarios_id' });
  }
}
