const db = require('../model/dbConnection.js');

module.exports = {
    main: (req, res) => {
        console.log("ID: ", req.query.id)
        var id = req.query.id;
        db.all(`SELECT * FROM main WHERE id=${id};`, (err, row)=>{
            if (err) console.log('problem is getting main data')
            res.send(row);
        });
    },
    paragraphs: (req, res) => {
        console.log("ID: ", req.query.id)
        var id = req.query.id;
        db.all(`SELECT * FROM paragraphs WHERE id=${id};`, (err, row)=>{
            if (err) console.log('problem is getting main data')
            res.send(row);
        });
    },
    pictures: (req, res) => {
        console.log("ID: ", req.query.id)
        var id = req.query.id;
        db.all(`SELECT * FROM pictures WHERE id=${id};`, (err, row)=>{
            if (err) console.log('problem is getting main data')
            res.send(row);
        });
    }
}