const { addExpense, getExpenses, deleteExpense, getExpensesUsingFilters, getExpenseTypes } = require("../controllers/expense");
const { addIncome, getIncomes, deleteIncomes, getIncomesUsingFilters, getIncomeTypes } = require("../controllers/income");

const router = require("express").Router();

router
	.post("/add-income", addIncome)
	.get("/get-incomes", getIncomes)
	.get("/get-income-types", getIncomeTypes)
	.get("/get-incomes-filters", getIncomesUsingFilters)
	.delete("/delete-income/:id", deleteIncomes)
	.post("/add-expense", addExpense)
	.get("/get-expenses", getExpenses)
	.get("/get-expense-types", getExpenseTypes)
	.get("/get-expenses-filters", getExpensesUsingFilters)
	.delete("/delete-expense/:id", deleteExpense);

module.exports = router;
