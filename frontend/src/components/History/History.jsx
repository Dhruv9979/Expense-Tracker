import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import { dateFormat } from "../../utils/dateFormat";

const History = () => {
	const { transactionHistory } = useGlobalContext();

	const sortedHistory = transactionHistory.sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	);

	useEffect(() => {}, [transactionHistory]);

	return (
		<HistoryStyled>
			<h2>Recent History</h2>
			{sortedHistory.map((item) => {
				const { _id, title, amount, type, date } = item;
				return (
					<HistoryItem key={_id}>
						<HistoryText
							style={{
								color: type === "expense" ? "red" : "var(--color-green)",
							}}
						>
							{title}
						</HistoryText>

						<HistoryText
							style={{
								color: type === "expense" ? "red" : "var(--color-green)",
							}}
						>
							{type === "expense"
								? `-${amount <= 0 ? 0 : amount}`
								: `+${amount <= 0 ? 0 : amount}`}
						</HistoryText>
						<HistoryText
							style={{
								color: type === "expense" ? "red" : "var(--color-green)",
							}}
						>
							{dateFormat(date)}
						</HistoryText>
					</HistoryItem>
				);
			})}
		</HistoryStyled>
	);
};

const HistoryStyled = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	/* Media query for tablets */
	@media screen and (max-width: 768px) {
		flex-direction: row;
		flex-wrap: wrap;
	}
`;

const HistoryItem = styled.div`
	background: #fcf6f9;
	border: 2px solid #ffffff;
	box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
	padding: 1rem;
	border-radius: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	/* Media query for tablets */
	@media screen and (max-width: 768px) {
		width: 48%;
		margin-bottom: 1rem;
	}

	/* Media query for mobile */
	@media screen and (max-width: 480px) {
		width: 100%;
		flex-direction: column; /* Ensure paragraphs are on separate lines */
	}
`;

const HistoryText = styled.p`
	margin-bottom: 0.5rem; /* Add margin to separate each paragraph on mobile */
`;

export default History;
