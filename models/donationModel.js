const { Schema, model } = require("mongoose");

const DonationSchema = new Schema(
  {
    date: { type: Date },
    amount: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Donation", DonationSchema);
