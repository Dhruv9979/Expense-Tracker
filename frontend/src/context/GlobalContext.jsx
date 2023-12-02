import React, { useContext, useState } from "react";
import axios from "axios";
import moment from "moment";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
	const [incomes, setIncomes] = useState([]);
	const [expenses, setExpenses] = useState([]);
	const [transactionHistory, setTransactionHistory] = useState([...incomes, ...expenses]);
	const [error, setError] = useState(null);

	//calculate incomes
	const addIncome = async (income) => {
		await axios.post(`${BASE_URL}add-income`, income).catch((err) => {
			setError(err.response.data.message);
		});
		getIncomes();
	};

	const getIncomes = async () => {
		const currentDate = moment();
		const firstDayOfMonth = currentDate.clone().startOf("month");
		const formattedDate = firstDayOfMonth.format("DD-MM-YYYY");

		const response = await axios.get(`${BASE_URL}get-incomes-filters`, {
			params: {
				startDate: formattedDate,
			},
		});
		setIncomes(response.data);
	};

	const deleteIncome = async (id) => {
		await axios.delete(`${BASE_URL}delete-income/${id}`);
		getIncomes();
	};

	const totalIncome = () => {
		let totalIncome = 0;
		incomes.forEach((income) => {
			totalIncome = totalIncome + income.amount;
		});

		return totalIncome;
	};

	const addExpense = async (expense) => {
		await axios.post(`${BASE_URL}add-expense`, expense).catch((err) => {
			setError(err.response.data.message);
		});
		getExpenses();
	};

	const getExpenses = async () => {
		const currentDate = moment();
		const firstDayOfMonth = currentDate.clone().startOf("month");
		const formattedDate = firstDayOfMonth.format("DD-MM-YYYY");

		const response = await axios.get(`${BASE_URL}get-expenses-filters`, {
			params: {
				startDate: formattedDate,
			},
		});
		setExpenses(response.data);
	};

	const deleteExpense = async (id) => {
		await axios.delete(`${BASE_URL}delete-expense/${id}`);
		getExpenses();
	};

	const totalExpenses = () => {
		let totalExpense = 0;
		expenses.forEach((income) => {
			totalExpense = totalExpense + income.amount;
		});

		return totalExpense;
	};

	const totalBalance = () => {
		return totalIncome() - totalExpenses();
	};

	const filterData = async (filters, type) => {
		const formattedFilters = {
			...filters,
			startDate: filters.startDate ? moment(filters.startDate).format("DD-MM-YYYY") : null,
			endDate: filters.endDate ? moment(filters.endDate).format("DD-MM-YYYY") : null,
		};

		try {
			let response;

			if (type === "income") {
				response = await axios.get(`${BASE_URL}get-incomes-filters`, {
					params: formattedFilters,
				});
				setIncomes(response.data);
				setExpenses([]);
			} else if (type === "expense") {
				response = await axios.get(`${BASE_URL}get-expenses-filters`, {
					params: formattedFilters,
				});
				setExpenses(response.data);
				setIncomes([]);
			}

			// Set transactionHistory to the filtered results
			setTransactionHistory(response.data);
		} catch (error) {
			console.error(`Error fetching ${type}s:`, error.message);
			throw error;
		}
	};

	return (
		<GlobalContext.Provider
			value={{
				addIncome,
				getIncomes,
				incomes,
				deleteIncome,
				expenses,
				totalIncome,
				addExpense,
				getExpenses,
				deleteExpense,
				totalExpenses,
				totalBalance,
				transactionHistory,
				setTransactionHistory,
				filterData,
				error,
				setError,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => {
	const { incomes, expenses, transactionHistory, ...rest } = useContext(GlobalContext);

	const combinedTransactionHistory =
		transactionHistory?.length > 0 ? transactionHistory : [...incomes, ...expenses];

	return { incomes, expenses, transactionHistory: combinedTransactionHistory, ...rest };
};
