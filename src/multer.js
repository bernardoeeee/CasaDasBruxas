const multer = require('multer')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./src/public")
    },
    filename: function (req, file, cb) {
        let nome_sem_espaco = file.originalname.trim()
        let nome_array = nome_sem_espaco.split(' ')
        let nome_com_underline = nome_array.join('_')
        return cb(null, `${Date.now()}_${nome_com_underline}}`)
    }
})

let upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }
})

module.exports = upload;