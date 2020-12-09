const express = require("express")
const multer = require("multer")
const app = express()
const models = require("../models/index")
const tagihan = models.tagihan
const pembayaran = models.pembayaran
const penggunaan = models.penggunaan
const pelanggan = models.pelanggan
const tarif = models.tarif
const path = require("path")
const fs = require("fs")
const validateUser= require("./auth/validateUser")
const validateAdmin= require("./auth/validateAdmin")
app.use(express.urlencoded({ extended: true }))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./bukti")
    },
    filename: (req, file, cb) => {
        cb(null, "bukti-" + Date.now() + path.extname(file.originalname))
    }
}) 
const upload = multer({storage: storage})

app.get("/",validateUser, (req,res) => {
    // ambil data
    pembayaran.findAll()
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
//mungkin mek pelanggan
app.post("/",upload.single("bukti") ,validateUser, async(req,res) => {
    // insert data
    let param = {
        id_tagihan: req.body.id_tagihan
    }
    let result = await tagihan.findOne({
        where:param,
        include: [
            {
                model: penggunaan,
                as: "penggunaan",
                include: [
                    {
                        model: pelanggan,
                        as: "pelanggan",
                        include: ["tarif"]
                    }
                ]
            }
        ]
    })
    let t = result.penggunaan.pelanggan.tarif.tarifperkwh
    let m = result.jumlah_meter
    let ba = parseInt(req.body.biaya_admin)
    let total = m*t+ba
    
    let data = {
        id_tagihan: req.body.id_tagihan,
        bulan_bayar: req.body.bulan_bayar,
        tanggal_pembayaran: Date.now(),
        biaya_admin: req.body.biaya_admin,
        total_bayar: total,
        status: 0,
        bukti: req.file.filename,
        id_admin: req.body.id_admin
    }
    pembayaran.create(data)
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
app.put("/",validateAdmin, (req,res) => {
    // update data
    let data = {
        status: req.body.status
    }
    let params = {
        id_pembayaran: req.body.id_pembayaran
    }
    pembayaran.update(data, {where:params})
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

app.delete("/:id_pembayaran",validateAdmin,async (req,res) => {
    // delete data
    let param = { id_pembayaran: req.params.id_pembayaran }

    let hasil = await pembayaran.findOne({where:param})
    let ob = hasil.bukti

    let pathFile = path.join(__dirname, "../bukti",ob)
    fs.unlink(pathFile, err => console.log(err))

    pembayaran.destroy({where : param})
    .then(result => {
        res.json({
            message: "Data has been destroyed",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app