const express = require("express")
const auth = express()
const md5 = require("md5")
const mAdmin = require("../../models/index").admin
const mPelanggan = require("../../models/index").pelanggan

const jwt = require("jsonwebtoken")
const SECRET_KEY_ADMIN = "admin"
const SECRET_KEY_USER = "user"

auth.use(express.urlencoded({ extended: true }))

auth.post("/", async (req, res) => {
    let data = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let admin = await mAdmin.findOne({ where: data })
    let pelanggan = await mPelanggan.findOne({ where: data })

    if (admin) {
        let payload = JSON.stringify(admin)
        return res.json({
            data: admin,
            token: jwt.sign(payload, SECRET_KEY_ADMIN)
        })
    } else if (pelanggan) {
        let payload = JSON.stringify(pelanggan)
        return res.json({
            data: pelanggan,
            token: jwt.sign(payload, SECRET_KEY_USER)
        })
    } else {
        return res.json({
            message: "Invalid username or password"
        })
    }
})

module.exports = auth