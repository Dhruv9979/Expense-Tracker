import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/Icons";
import Chart from "../Chart/Chart";

const Dashboard = () => {
	const {
		getIncomes,
		getExpenses,
		totalIncome,
		totalExpenses,
		totalBalance,
	} = useGlobalContext();

	useEffect(() => {
		getIncomes();
		getExpenses();
		// eslint-disable-next-line
	}, []);

	return (
		<DashboardStyled>
			<InnerLayout>
				<h1>All Transactions</h1>
				<div className="stats-con">
					<div className="chart-con">
						<Chart />
						<div className="amount-con">
							<div className="income">
								<h2>Total Income</h2>
								<p>
									{dollar} {totalIncome()}
								</p>
							</div>
							<div className="expense">
								<h2>Total Expense</h2>
								<p>
									{dollar} {totalExpenses()}
								</p>
							</div>
							<div className="balance">
								<h2>Total Balance</h2>
								<p
									style={{
										color:
											totalIncome() >= totalExpenses()	
												? "var(--color-green)"
												: "red",
									}}
								>
									{dollar} {totalBalance()}
								</p>
							</div>
						</div>
					</div>
				</div>
			</InnerLayout>
		</DashboardStyled>
	);
};

const DashboardStyled = styled.div`
	.stats-con {
		.chart-con {
			height: 400px;

			.amount-con {
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				gap: 1rem;
				margin-top: 1rem;

				@media (max-width: 768px) {
					grid-template-columns: repeat(2, 1fr);
				}

				.income,
				.expense {
					grid-column: span 2;
				}

				.income,
				.expense,
				.balance {
					background: #fcf6f9;
					border: 2px solid #ffffff;
					box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
					border-radius: 20px;
					padding: 1rem;

					p {
						font-size: 2.5rem;
						font-weight: 700;
					}
				}

				.balance {
					grid-column: 2 / 4;
					@media (max-width: 768px) {
						grid-column: span 2;
					}
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					p {
						opacity: 0.6;
						font-size: 3.5rem;
						@media (max-width: 768px) {
							font-size: 2rem;
						}
					}
				}
			}
		}
	}
`;

export default Dashboard;
