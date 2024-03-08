const fs = require('fs');
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

let app = express();
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

fs.readFile("text.js", 'utf8', (err, data) => {
    console.log(data);
});

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const sampleFile = req.files.sampleFile;
    const uploadPath = __dirname + '/uploads/' + sampleFile.name;

    sampleFile.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.send('File uploaded!');
    });
})

app.listen(3000, () => {
    console.log('Server started');
});