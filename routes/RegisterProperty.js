const  RegisterProperty = require("../models/RegisterProperty");
const auth = require("../middlewares/auth");

const mongoose = require("mongoose");
const router = require("express").Router();

// create contact.
router.post("/registerProperty",auth, async (req, res) => {
    const { error } = (req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const { title, area, address, pincode, state, city, propertyType, upload, village, propertyCondition ,busStandDistance,autoStandDistance, shopNearProperty, hospitalNearProperty, distFromMainRoad, schoolNearProperty, collegeNearProperty, mallNearProperty, purchaseDate, propertySize, unit } = req.body;

    try {
        const newRegisterproperty = new RegisterProperty({
            title, area, address, pincode, state, city, propertyType, upload, village, propertyCondition, busStandDistance,autoStandDistance, shopNearProperty, hospitalNearProperty, distFromMainRoad, schoolNearProperty, collegeNearProperty, mallNearProperty, purchaseDate, propertySize, unit,
            postedBy: req.user._id,
        });
        const result = await newRegisterproperty.save();

        return res.status(201).json({ ...result._doc });
    } catch (err) {
        console.log(err);
    }
});

// fetch property.
router.get("/registerProperty", auth, async (req, res) => {
    try {
        const registerProperty = await RegisterProperty.find({ postedBy: req.user._id }).populate(
            "postedBy",
            "-password"
        );

        return res.status(200).json({ properties: registerProperty.reverse() });
    } catch (err) {
        console.log(err);
    }
});

// update property.
router.put("/registerProperty", auth, async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ error: "no id specified." });
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ error: "please enter a valid id" });

    try {
        const registerProperty = await RegisterProperty.findOne({ _id: id });

        if (req.user._id.toString() !== registerProperty.postedBy._id.toString())
            return res
                .status(401)
                .json({ error: "you can't edit other people contacts!" });

        const updatedData = { ...req.body, id: undefined };
        const result = await RegisterProperty.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        return res.status(200).json({ ...result._doc });
    } catch (err) {
        console.log(err);
    }
});

// delete a property.
router.delete("/deleteProperty/:id", auth, async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "no id specified." });

    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ error: "please enter a valid id" });
    try {
        const registerProperty = await RegisterProperty.findOne({ _id: id });
        if (!contact) return res.status(400).json({ error: "no contact found" });

        if (req.user._id.toString() !== registerProperty.postedBy._id.toString())
            return res
                .status(401)
                .json({ error: "you can't delete other people contacts!" });

        const result = await RegisterProperty.deleteOne({ _id: id });
        const myregisterproperty = await RegisterProperty.find({ postedBy: req.user._id }).populate(
            "postedBy",
            "-password"
        );

        return res
            .status(200)
            .json({ ...registerProperty._doc, myregisterproperty: myregisterproperty.reverse() });
    } catch (err) {
        console.log(err);
    }
});

// to get a single contact.
router.get("/myregisterproperty/:id", auth, async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "no id specified." });

    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ error: "please enter a valid id" });

    try {
        const myregisterproperty = await RegisterProperty.findOne({ _id: id });

        return res.status(200).json({ ...myregisterproperty._doc });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
