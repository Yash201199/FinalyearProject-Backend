const mongoose = require("mongoose");

const RegisterPropertySchema = new mongoose.Schema({
  title: {
    type: String,
    // required: [true, "title is required."],
  },
  area: {
    type: String,
    // required: [true, "Area is required."],
  },
  address: {
    type: String,
    // required: [true, "Address is required."],
  },
  pincode: {
    type: Number,
    // required: [true, "Pincode is required."],
  },
  state: {
    type: String,
    // required: [true, "State is required."],
  },
  city: {
    type: String,
    // required: [true, "City is required."],
  },
  propertyType: {
    type: String,
    // required: [true, "PropertyType is required."],
  },
  upload: {
    type: String,
  //  required: [true, "Upload is required."],
  },
  village: {
    type: String,
    // required: [true, "Village is required."],
  },
  propertyCondition: {
    type: String,
    // required: [true, "PropertyCondition is required."],
  },
  busStandDistance: {
    type: String,
    // required: [true, "AddrbusStandDistanceess is required."],
  },
  autoStandDistance: {
    type: String,
    // required: [true, "AutoStandDistance is required."],
  },
  shopNearProperty: {
    type: String,
    // required: [true, "ShopNearProperty is required."],
  },
  hospitalNearProperty: {
    type: String,
    // required: [true, "HospitalNearProperty is required."],
  },
  distFromMainRoad: {
    type: String,
    // required: [true, "DistFromMainRoad is required."],
  },
  schoolNearProperty: {
    type: String,
    // required: [true, "SchoolNearProperty is required."],
  },
  collegeNearProperty: {
    type: String,
    // required: [true, "CollegeNearProperty is required."],
  },
  mallNearProperty: {
    type: String,
    // required: [true, "MallNearProperty is required."],
  },
  purchaseDate: {
    type: String,
    // required: [true, "PurchaseDate is required."],
  },
  propertySize: {
    type: String,
    // required: [true, "propertySize is required."],
  },
  unit: {
    type: String,
    // required: [true, "Unit is required."],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

});

const RegisterProperty = new mongoose.model("RegisterProperty", RegisterPropertySchema);

module.exports = RegisterProperty;
