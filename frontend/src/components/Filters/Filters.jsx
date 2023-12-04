import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/GlobalContext";
import { plus } from "../../utils/Icons";
import Button from "../Button/Button";

const Filters = () => {
	const [type, setType] = useState("");

	const {
		filterData,
		setTransactionHistory,
		incomes,
		getIncomes,
		incomeTypes,
		expenses,
		getExpenses,
		expenseTypes,
	} = useGlobalContext();

	const [filters, setFilters] = useState({
		startDate: "",
		endDate: "",
		category: "",
		amountMin: 0,
		amountMax: 0,
	});

	const { startDate, endDate, category, amountMin, amountMax } = filters;

	const incomeValues = incomeTypes.map((incomeType) => incomeType.value);
	const expenseValues = expenseTypes.map((expenseType) => expenseType.value);

	const categories = type === "income" ? incomeValues : expenseValues;

	const shouldRenderFilters = !!type;

	const handleTabChange = (selectedType) => {
		setType(selectedType);
	};

	const handleInput = (name) => (e) => {
		setFilters({ ...filters, [name]: e.target.value });
	};

	const handleDateChange = (date, name) => {
		setFilters({ ...filters, [name]: date });
	};

	const handleFilter = (e) => {
		e.preventDefault();
		filterData(filters, type);
	};

	const handleReset = async () => {
		getIncomes();
		getExpenses();
		setTransactionHistory(...incomes, ...expenses);
		setFilters({
			startDate: "",
			endDate: "",
			category: "",
			amountMin: 0,
			amountMax: 0,
		});
		setType("");
	};

	return (
		<FiltersStyled onSubmit={handleFilter}>
			<h2>Filters</h2>
			<TabsContainer>
				<TabButton onClick={() => handleTabChange("income")} active={type === "income"}>
					Income
				</TabButton>
				<TabButton onClick={() => handleTabChange("expense")} active={type === "expense"}>
					Expense
				</TabButton>
			</TabsContainer>
			{shouldRenderFilters && (
				<>
					<div className="filter-item input-control">
						<DatePicker
							id="startDate"
							placeholderText="Enter A Date"
							selected={startDate ? new Date(startDate) : ""}
							dateFormat="dd/MM/yyyy"
							onChange={(date) => handleDateChange(date, "startDate")}
						/>
					</div>
					<div className="filter-item input-control">
						<DatePicker
							id="endDate"
							placeholderText="Enter A Date"
							selected={endDate ? new Date(endDate) : ""}
							dateFormat="dd/MM/yyyy"
							onChange={(date) => handleDateChange(date, "endDate")}
						/>
					</div>
					<div className="selects input-control">
						<select
							value={category}
							name="category"
							id="category"
							onChange={handleInput("category")}
						>
							<option value="" disabled>
								Select Category
							</option>
							{categories.map((category) => (
								<option key={category} value={category.toLowerCase()}>
									{category}
								</option>
							))}
						</select>
					</div>
					<div className="filter-item input-control">
						<input
							type="number"
							value={amountMin}
							name="amountMin"
							placeholder="Amount Min"
							onChange={handleInput("amountMin")}
						/>
					</div>
					<div className="filter-item input-control">
						<input
							type="number"
							value={amountMax}
							name="amountMax"
							placeholder="Amount Max"
							onChange={handleInput("amountMax")}
						/>
					</div>
					<div className="submit-btn">
						<Button
							name={"Apply filters"}
							icon={plus}
							bPad={".8rem 1.6rem"}
							bRad={"30px"}
							bg={"var(--color-accent"}
							color={"#fff"}
						/>
					</div>
					<div className="reset-btn" onClick={handleReset}>
						<Button
							name={"Reset filters"}
							icon={plus}
							bPad={".8rem 1.6rem"}
							bRad={"30px"}
							bg={"var(--color-accent"}
							color={"#fff"}
						/>
					</div>
				</>
			)}
		</FiltersStyled>
	);
};

const TabsContainer = styled.div`
	display: flex;
	background: #f6f6f6;
	border-radius: 10px;
	overflow: hidden;
	margin-bottom: 20px;
`;

const TabButton = styled.button`
	flex: 1;
	padding: 10px;
	border: none;
	background: ${(props) => (props.active ? "#ff92a8" : "transparent")};
	color: ${(props) => (props.active ? "#fff" : "rgba(34, 34, 96, 0.9)")};
	cursor: pointer;
	transition: background 0.3s, color 0.3s;

	&:hover {
		background: ${(props) => (props.active ? "#ff92a8" : "#e0e0e0")};
		color: ${(props) => (props.active ? "#fff" : "rgba(34, 34, 96, 0.9)")};
	}
`;

const FiltersStyled = styled.form`
	margin-top: 20px;

	h2 {
		margin-bottom: 10px;
	}

	.filter-item {
		margin-bottom: 15px;

		label {
			margin-right: 10px;
		}

		input {
			padding: 5px;
		}
	}

	input,
	select {
		font-family: inherit;
		font-size: inherit;
		outline: none;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 5px;
		border: 2px solid #fff;
		background: transparent;
		resize: none;
		box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
		color: rgba(34, 34, 96, 0.9);
		&::placeholder {
			color: rgba(34, 34, 96, 0.4);
		}
	}
	.input-control {
		input {
			width: 100%;
		}
	}

	.selects {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 20px;
		select {
			color: rgba(34, 34, 96, 0.4);
			&:focus,
			&:active {
				color: rgba(34, 34, 96, 1);
			}
		}
	}

	.submit-btn,
	.reset-btn {
		margin-top: 20px;
		button {
			box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
			&:hover {
				background: var(--color-green) !important;
			}
		}
	}
`;

export default Filters;
