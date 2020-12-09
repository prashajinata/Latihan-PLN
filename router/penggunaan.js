const express = require("express")
const multer = require("multer")
const app = express()
const models = require("../models/index")
const penggunaan = models.penggunaan
app.use(express.urlencoded({extended: true}))
const validateAdmin= require("./auth/validateAdmin")
app.use(validateAdmin)
//administrator
app.get("/", (req,res) => {
    // ambil data
    penggunaan.findAll()
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
        id_pelanggan: req.body.id_pelanggan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        meter_awal: req.body.meter_awal,
        meter_akhir: req.body.meter_akhir
    }

    penggunaan.create(data)
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
        id_pelanggan: req.body.id_pelanggan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        meter_awal: req.body.meter_awal,
        meter_akhir: req.body.meter_akhir
    }

    let param = {
        id_penggunaan: req.body.id_penggunaan
    }

    penggunaan.update(data, {where:param})
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

app.delete("/:id_penggunaan", (req,res) => {
    // delete data
    try {
        let param = { id_penggunaan: req.params.id_penggunaan }

        // delete data
        penggunaan.destroy({ where: param })
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