import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import { InnerLayout } from "../../styles/Layouts";
import IncomeForm from "./IncomeForm";
import Item from "../Item/Item";

const Incomes = () => {
	const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

	useEffect(() => {
		getIncomes();
	}, []);

	return (
		<IncomesStyled>
			<InnerLayout>
				<h1>Incomes</h1>
				<h2 className="total-income">
					Total Income: <span>${totalIncome()}</span>
				</h2>
				<div className="income-content">
					<div className="form-container">
						<IncomeForm />
					</div>
					<div className="incomes">
						{incomes.map((income) => {
							const { _id, title, amount, date, category, description, type } =
								income;
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
									deleteItem={deleteIncome}
								/>
							);
						})}
					</div>
				</div>
			</InnerLayout>
		</IncomesStyled>
	);
};

const IncomesStyled = styled.div`
	display: flex;
	overflow: auto;
	.total-income {
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
		.total-income {
			font-size: 1rem;
		}
		span {
			font-size: 1.5rem !important;
		}
	}

	.income-content {
		display: flex;
		flex-direction: column; /* Change to column on mobile */
		gap: 2rem;
		.form-container {
			order: 1; /* Move the form to the top on mobile */
		}
		.incomes {
			flex: 1;
			order: 2; /* Move the incomes below the form on mobile */
		}
	}

	@media only screen and (min-width: 768px) {
		/* Add styles for larger screens if needed */
		.income-content {
			flex-direction: row; /* Change back to row on larger screens */
			.form-container {
				order: 1; /* Move the form back to the original position */
			}
			.incomes {
				order: 2; /* Move the incomes back to the original position */
			}
		}
	}
`;

export default Incomes;
