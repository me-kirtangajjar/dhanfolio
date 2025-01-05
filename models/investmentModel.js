const { Schema, model } = require("mongoose");

const InvestmentSchema = new Schema(
  {
    date: { type: Date },
    amount: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Investment", InvestmentSchema);
