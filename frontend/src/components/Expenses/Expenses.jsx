import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import { InnerLayout } from "../../styles/Layouts";
import Item from "../Item/Item";
import ExpenseForm from "./ExpenseForm";

const Expenses = () => {
	const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();

	useEffect(() => {
		getExpenses();
	}, []);

	return (
		<ExpensesStyled>
			<InnerLayout>
				<h1>Expenses</h1>
				<h2 className="total-expense">
					Total Expense: <span>${totalExpenses()}</span>
				</h2>
				<div className="expense-content">
					<div className="form-container">
						<ExpenseForm />
					</div>
					<div className="expenses">
						{expenses.map((expenses) => {
							const { _id, title, amount, date, category, description, type } =
								expenses;
							return (
								<Item
									key={_id}
									id={_id}
									title={title}
									description={description}
									amount={amount}
									date={date}
									type={type}
									category={category}
									indicatorColor="var(--color-green)"
									deleteItem={deleteExpense}
								/>
							);
						})}
					</div>
				</div>
			</InnerLayout>
		</ExpensesStyled>
	);
};

const ExpensesStyled = styled.div`
	display: flex;
	overflow: auto;
	.total-expense {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fcf6f9;
		border: 2px solid #ffffff;
		box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
		border-radius: 20px;
		padding: 1rem;
		margin: 1rem 0;
		font-size: 2rem;
		gap: 0.5rem;
		span {
			font-size: 2.5rem;
			font-weight: 800;
			color: var(--color-green);
		}
	}

	@media only screen and (max-width: 768px) {
		.total-expense {
			font-size: 1rem;
		}
		span {
			font-size: 1.5rem !important;
		}
	}

	.expense-content {
		display: flex;
		flex-direction: column; /* Change to column on mobile */
		gap: 2rem;
		.form-container {
			order: 1; /* Move the form to the top on mobile */
		}
		.expenses {
			flex: 1;
			order: 2; /* Move the expenses below the form on mobile */
		}
	}

	@media only screen and (min-width: 768px) {
		/* Add styles for larger screens if needed */
		.expense-content {
			flex-direction: row; /* Change back to row on larger screens */
			.form-container {
				order: 1; /* Move the form back to the original position */
			}
			.expenses {
				order: 2; /* Move the expenses back to the original position */
			}
		}
	}
`;

export default Expenses;
