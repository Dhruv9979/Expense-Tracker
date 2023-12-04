import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import { InnerLayout } from "../../styles/Layouts";
import Filters from "../Filters/Filters";
import History from "../History/History";

const Transactions = () => {
	const { getIncomes, getExpenses } = useGlobalContext();

	useEffect(() => {
		getIncomes();
		getExpenses();
		// eslint-disable-next-line
	}, []);

	return (
		<TransactionsStyled>
			<InnerLayout>
				<h1>All Transactions</h1>
				<div className="filters-and-history-con">
					<div className="filters-con">
						<Filters />
					</div>
					<div className="history-con">
						<History />
					</div>
				</div>
			</InnerLayout>
		</TransactionsStyled>
	);
};

const TransactionsStyled = styled.div`
	.filters-and-history-con {
		display: flex;
		flex-wrap: wrap;

		@media screen and (max-width: 768px) {
			flex-direction: column;
		}
	}

	.filters-con {
		margin-right: 20px;
		flex: 0 0 300px;

		@media screen and (max-width: 768px) {
			margin-right: 0;
			margin-bottom: 20px;
			flex: 0 0 100%;
		}
	}

	.history-con {
		flex-grow: 1;
		h2 {
			margin: 1rem 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.salary-title {
			font-size: 1.2rem;
			span {
				font-size: 1.8rem;
			}
		}
		.salary-item {
			background: #fcf6f9;
			border: 2px solid #ffffff;
			box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
			padding: 1rem;
			border-radius: 20px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			p {
				font-weight: 600;
				font-size: 1.6rem;
			}
		}
	}
`;

export default Transactions;
