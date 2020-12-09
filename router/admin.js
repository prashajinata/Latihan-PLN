const express = require("express")
const multer = require("multer")
const models = require("../models/index")
const admin = models.admin
const md5 = require("md5")
const app = express()
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    // ambil data
    admin.findAll()
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

app.post("/", (req, res) => {
    // insert data
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nama_admin: req.body.nama_admin,
        id_level: req.body.id_level
    }
    // insert data
    admin.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.put("/", (req, res) => {
    // update data
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nama_admin: req.body.nama_admin,
        id_level: req.body.id_level
    }
    let param = {
        id_admin: req.body.id_admin
    }
    // insert data
    admin.update(data, { where: param })
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:id_admin", (req, res) => {
    // delete data
    try {
        let param = { id_admin: req.params.id_admin }

        // delete data
        admin.destroy({ where: param })
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