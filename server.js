const express = require("express")
const app = express()
const level = require("./router/level")
const admin = require("./router/admin")
const pelanggan = require("./router/pelanggan")
const pembayaran = require("./router/pembayaran")
const penggunaan = require("./router/penggunaan")
const tagihan = require("./router/tagihan")
const tarif = require("./router/tarif")
const auth = require("./router/auth/auth")

app.use("/level",level)
app.use("/admin", admin)
app.use("/pelanggan", pelanggan)
app.use("/pembayaran", pembayaran)
app.use("/penggunaan", penggunaan)
app.use("/tagihan", tagihan)
app.use("/tarif", tarif)
app.use("/auth", auth)

app.listen(8000, () => {
    console.log("server run on port 8000");
})