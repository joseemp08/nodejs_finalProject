const router = require("express").Router();
const { models } = require("mongoose");
const pin = require("../models/pin");
const res = require("express/lib/response");


//create a pin
router.post("/", async (req, res)=>{
    const newPin = new pin(req.body);
    try {
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    } catch (err) {
        res.status(500).json(err)
    }
})


//get all pins
router.get("/", async(req, res)=>{
    try {
        const pins = await pin.find();
        res.status(200).json
    } catch (err) {
        res.status(500).json(er)
    }
})

module.exports = router
