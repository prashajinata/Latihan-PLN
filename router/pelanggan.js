const express = require("express")
const multer = require("multer")
const app = express()
const models = require("../models/index")
const md5 = require("md5")
const pelanggan = models.pelanggan
app.use(express.urlencoded({extended: true}))

app.get("/", (req,res) => {
    // ambil data
    pelanggan.findAll()
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
        username: req.body.username,
        password: md5(req.body.password),
        nomor_kwh: req.body.nomor_kwh,
        nama_pelanggan: req.body.nama_pelanggan,
        alamat: req.body.alamat,
        id_tarif: req.body.id_tarif
    }

    pelanggan.create(data)
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
//pengolahan data pelanggan = admininstrator
app.put("/", (req,res) => {
    // update data
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nomor_kwh: req.body.nomor_kwh,
        nama_pelanggan: req.body.nama_pelanggan,
        alamat: req.body.alamat,
        id_tarif: req.body.id_tarif
    }
    let param = {
        id_pelanggan: req.body.id_pelanggan
    }

    pelanggan.update(data, {where:param})
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

app.delete("/:id_pelanggan", (req,res) => {
    // delete data
    try {
        let param = { id_pelanggan: req.params.id_pelanggan }

        // delete data
        pelanggan.destroy({ where: param })
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