const express = require("express")
const multer = require("multer")
const app = express()
const models = require("../models/index")
const tagihan = models.tagihan
const penggunaan = models.penggunaan
app.use(express.urlencoded({ extended: true }))
const validateUser= require("./auth/validateUser")
const validateAdmin= require("./auth/validateAdmin")
//administrator kabeh
app.get("/",validateUser, (req, res) => {
    // ambil data
    tagihan.findAll()
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
//administrator
app.post("/",validateAdmin, async(req, res) => {
    // insert data
    let param = {
        id_penggunaan: req.body.id_penggunaan
    }
    let p = await penggunaan.findOne({ where: param })
    let m_awal = p.meter_awal
    let m_akhir = p.meter_akhir
    let jumlah = m_akhir - m_awal

    let data = {
        id_penggunaan: req.body.id_penggunaan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        jumlah_meter: jumlah,
        status: 0
    }

    tagihan.create(data)
        .then(result => {
            res.json({
                message: "Data has been inserted",
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
//administrator
app.put("/",validateAdmin, async(req, res) => {
    // update data
    let data = {
        status: req.body.status
    }
    let params = {
        id_tagihan: req.body.id_tagihan
    }
    tagihan.update(data, {where:params})
        .then(result => {
            res.json({
                message: "Data has been updated",
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:id_tagihan",validateAdmin, (req, res) => {
    // delete data
    try {
        let param = { id_tagihan: req.params.id_tagihan }

        // delete data
        tagihan.destroy({ where: param })
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