const mongoose = require("mongoose")

const CitySchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    search: [{ type: String, required: true }]


})

const CityModel = mongoose.model("user", CitySchema)

module.exports = { CityModel }
