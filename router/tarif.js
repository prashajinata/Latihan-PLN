const express = require("express")
const multer = require("multer")
const app = express()
const models = require("../models/index")
const tarif = models.tarif
app.use(express.urlencoded({extended: true}))
const validateAdmin= require("./auth/validateAdmin")
app.use(validateAdmin)

app.get("/", (req,res) => {
    // ambil data
    tarif.findAll()
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
    // insert 
    let data = {
        daya: req.body.daya,
        tarifperkwh: req.body.tarifperkwh
    }

    tarif.create(data)
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
        daya: req.body.daya,
        tarifperkwh: req.body.tarifperkwh
    }
    let param = {
        id_tarif: req.body.id_tarif
    }

    tarif.update(data, {where:param})
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

app.delete("/:id_tarif", (req,res) => {
    // delete data
    try {
        let param = { id_tarif: req.params.id_tarif }

        // delete data
        tarif.destroy({ where: param })
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