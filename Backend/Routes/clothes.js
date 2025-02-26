const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/",(req, res) => {
    db.query("SELECT * FROM Clothes", (err, results) => {
        if (err) return res.status(500).json ({error: err.message});
        res.json(results);
    });
});

router.post("/",(req, res) => {
    const {name, category} = req.body;
    if (!name || !category) return res.status(400).json({error: "All fields required"});

    db.query("INSERT INTO Clothes (name, category) VALUES (?,?)", [name, category], (err, result) => {
        if (err) return res.status(500).json ({error: err.message});
        res.json({message :"Clothing successfully added!", id: result.insertId});
    });
});


router.put("/:id", (req,res) =>{
    const {name, category} = req.body;
    const {id}= req.params;

    db.query("UPDATE Clothes SET name = ?, category =? WHERE id = ?", [name, category,id], (err, result) => {
        if (err) return res.status(500).json({err: err.messsage});
        res.json({message: "clothing added!"});
    });
});

router.delete("/:id", (req, res) => {
    const {id} = req.params;

    db.query("DELETE FROM Clothes WHERE id =?", [id], (err) => {
        if (err) return res.status(500).json({err: err.message});
        res.json({message: "clothing deleted!"});
    });
});

module.exports = router;
