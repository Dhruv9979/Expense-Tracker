const ExpenseSchema = require("../models/Expense");
const ExpenseTypeSchema = require("../models/ExpenseType");
const { db } = require("../db/db");
const moment = require("moment");
const { validationResult, query } = require("express-validator");

exports.addExpense = async (req, res) => {
	const { title, amount, category, description, date } = req.body;

	const expense = ExpenseSchema({
		title,
		amount,
		category,
		description,
		date,
	});

	try {
		//validations
		if (!title || !category || !description || !date) {
			return res.status(400).json({ message: "All fields are required!" });
		}
		if (amount <= 0 || !amount === "number") {
			return res.status(400).json({ message: "Amount must be a positive number!" });
		}
		await expense.save();
		res.status(200).json({ message: "Expense Added" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getExpenses = async (req, res) => {
	try {
		const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
		res.status(200).json(expenses);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getExpenseTypes = async (req, res) => {
	try {
		const expenseTypes = await ExpenseTypeSchema.find().sort({ value: 1});
		res.status(200).json(expenseTypes);
	} catch(error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getExpensesUsingFilters = async (req, res) => {
	try {
		// Validate request query parameters
		await query("startDate").optional().isString().run(req);
		await query("endDate").optional().isString().run(req);
		await query("category").optional().isString().run(req);
		await query("amountMin").optional().isFloat().toFloat().run(req);
		await query("amountMax").optional().isFloat().toFloat().run(req);

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Extract filters from request query parameters
		const { startDate, endDate, category, amountMin, amountMax } = req.query;

		// Build the filter object based on provided parameters
		const filter = {};
		if (startDate || endDate) {
			filter.date = {};
			if (startDate) {
				const parsedStartDate = moment(startDate, "DD-MM-YYYY", true);
				if (parsedStartDate.isValid()) {
					filter.date.$gte = parsedStartDate.toDate();
				} else {
					return res.status(400).json({ message: "Invalid startDate format" });
				}
			}
			if (endDate) {
				const parsedEndDate = moment(endDate, "DD-MM-YYYY", true);
				if (parsedEndDate.isValid()) {
					filter.date.$lte = parsedEndDate.toDate();
				} else {
					return res.status(400).json({ message: "Invalid endDate format" });
				}
			}
		}
		if (category) {
			filter.category = { $eq: category.toLowerCase() };
		}
		if (amountMin || amountMax) {
			filter.amount = {};
			if (amountMin) {
				filter.amount.$gte = parseFloat(amountMin);
			}
			if (amountMax) {
				filter.amount.$lte = parseFloat(amountMax);
			}
		}
		const expenses = await ExpenseSchema.find(filter).sort({ createdAt: -1 });

		res.status(200).json(expenses);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.deleteExpense = async (req, res) => {
	const { id } = req.params;
	ExpenseSchema.findByIdAndDelete(id)
		.then((expense) => {
			res.status(200).json({ message: "Expense Deleted" });
		})
		.catch((error) => {
			res.status(500).json({ message: error.message });
		});
};
