import multer from 'multer';
import multerConfig from '../config/multer';
import Photo from '../models/Photo';

const upload = multer(multerConfig).single('photo');

class UploadController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }
      try {
        const { originalname, filename } = req.file;
        const { funcionarios_id } = req.body;
        const foto = await Photo.create({ originalname, filename, funcionarios_id });
        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: ['Esse aluno não existe'],
        });
      }
    });
  }
}
export default new UploadController();
