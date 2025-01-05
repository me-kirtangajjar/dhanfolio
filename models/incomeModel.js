const { Schema, model } = require("mongoose");

const IncomeSchema = new Schema(
  {
    date: { type: Date, require: true },
    amount: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Income", IncomeSchema);
