const express = require("express")
const multer = require("multer")
const models = require("../models/index")
const level = models.level
const app = express()
app.use(express.urlencoded({extended: true}))

app.get("/", (req,res) => {
    // ambil data
    level.findAll()
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.post("/", (req,res) => {
    // insert data
    let data = {
        nama_level: req.body.nama_level
    }

    level.create(data)
    .then(result => {
        res.json({
            message: "Data has been inserted",
            data: result
        })
    })
    .catch(error=> {
        res.json({
            message: error.message
        })
    })
})

app.put("/", (req,res) => {
    // update data
    let data = {
        nama_level: req.body.nama_level,
    }

    let param = {
        id_level: req.body.id_level
    }

    level.update(data, {where:param})
    .then(result => {
        res.json({
            message: "Data has been updated",
            data: result
        })
    })
    .catch(error=> {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:id_level", (req,res) => {
    // delete data
    try {
        let param = { id_level: req.params.id_level }

        // delete data
        level.destroy({ where: param })
            .then(result => {
                res.json({
                    message: "data has been deleted",
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

module.exports = app