const db = require('../model/dbConnection.js');

module.exports = {
    main: (req, res) => {
        console.log("ID: ", req.params.id)
        var id = req.params.id;
        db.all(`SELECT * FROM main WHERE id=${id};`, (err, row)=>{
            if (err) console.log('problem in getting main data')
            res.send(row);
        });
    },
    paragraphs: (req, res) => {
        console.log("ID: ", req.params.id)
        var id = req.params.id;
        db.all(`SELECT * FROM paragraphs WHERE id=${id};`, (err, row)=>{
            if (err) console.log('problem in getting paragraphs data')
            res.send(row);
        });
    },
    pictures: (req, res) => {
        console.log("ID: ", req.params.id)
        var id = req.params.id;
        db.all(`SELECT * FROM pictures WHERE id=${id};`, (err, row)=>{
            if (err) console.log('problem in getting pictures data')
            res.send(row);
        });
    }
}