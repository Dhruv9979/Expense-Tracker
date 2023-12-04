const mongoose = require("mongoose");

const IncomeTypeSchema = new mongoose.Schema(
	{
		key: {
			type: String,
			required: true,
			unique: true,
		},
		value: {
			type: String,
			required: true,
		},
	}
);

module.exports = mongoose.model("IncomeType", IncomeTypeSchema);
