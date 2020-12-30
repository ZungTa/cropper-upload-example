const express = require('express');
const cors = require('cors');
const app = express();
const multer = require('multer');
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  }
})
const upload = multer({ storage, dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/upload', upload.single('file'), (req, res) => {
  console.log('upload');

  console.log('req? ', req.file);

  res.send({ success: true });
});

app.use('/', (req, res, next) => { console.log('get /'); next(); }, express.static(__dirname));


app.listen(8988, () => {
  console.log('listen 8988');
});