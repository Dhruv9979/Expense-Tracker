import React from "react";
import styled from "styled-components";
import { dateFormat } from "../../utils/dateFormat";
import {
	calender,
	car,
	circle,
	comment,
	dollar,
	food,
	garbage,
	haircut,
	house,
	hydro,
	mobile,
	money,
	piggy,
	racquet,
	stocks,
	takeaway,
	trash,
	travel,
	wifi,
} from "../../utils/Icons";
import Button from "../Button/Button";

const Item = ({
	id,
	title,
	amount,
	date,
	category,
	description,
	deleteItem,
	indicatorColor,
	type,
}) => {
	const incomeIconMapping = {
		salary: money,
		stocks: stocks,
		tennis: racquet,
		other: piggy,
	};

	const expenseIconMapping = {
		rent: house,
		hydro: hydro,
		garbage: garbage,
		carInsurance: car,
		car: car,
		mobile: mobile,
		wifi: wifi,
		grocery: food,
		haircut: haircut,
		food: takeaway,
		stocks: stocks,
		tennis: racquet,
		travelling: travel,
		other: circle,
	};

	const categoryIcon = (type, category) => {
		const iconMapping = type === "income" ? incomeIconMapping : expenseIconMapping;
		const icon = iconMapping[category];
		return icon || "";
	};

	return (
		<ItemStyled indicator={indicatorColor}>
			<div className="icon">{categoryIcon(type, category)}</div>
			<div className="content">
				<h5>{title}</h5>
				<div className="inner-content">
					<div className="text">
						<p>
							{dollar} {amount}
						</p>
						<p>
							{calender} {dateFormat(date)}
						</p>
						<p>
							{comment}
							{description}
						</p>
					</div>
					<div className="btn-con">
						<Button
							icon={trash}
							bPad={"1rem"}
							bRad={"50%"}
							bg={"var(--primary-color"}
							color={"#fff"}
							iColor={"#fff"}
							hColor={"var(--color-green)"}
							onClick={() => deleteItem(id)}
						/>
					</div>
				</div>
			</div>
		</ItemStyled>
	);
};

const ItemStyled = styled.div`
	background: #fcf6f9;
	border: 2px solid #ffffff;
	box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
	border-radius: 20px;
	padding: 1rem;
	margin-bottom: 1rem;
	display: flex;
	flex-direction: column; /* Adjusted to column layout for responsiveness */
	align-items: center;
	gap: 1rem;
	width: 100%;
	color: #222260;

	.icon {
		width: 80px;
		height: 80px;
		border-radius: 20px;
		background: #f5f5f5;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid #ffffff;
		i {
			font-size: 2.6rem;
		}
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		h5 {
			font-size: 1.3rem;
			padding-left: 2rem;
			position: relative;
			&::before {
				content: "";
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 0.8rem;
				height: 0.8rem;
				border-radius: 50%;
				background: ${(props) => props.indicator};
			}
		}

		.inner-content {
			display: flex;
			flex-direction: column; /* Adjusted to column layout for responsiveness */
			gap: 0.2rem;
			.text {
				display: flex;
				flex-direction: column; /* Adjusted to column layout for responsiveness */
				gap: 0.5rem;
				p {
					display: flex;
					align-items: center;
					gap: 0.5rem;
					color: var(--primary-color);
					opacity: 0.8;
				}
			}
		}
	}

	/* Media Query for Responsive Design */
	@media screen and (min-width: 768px) {
		flex-direction: row;

		.content {
			flex-direction: row;
			align-items: flex-start;

			h5::before {
				margin-top: 0.3rem;
			}

			h5 {
				padding-top: 0.7rem;
				margin-right: 1rem;
			}

			.inner-content {
				flex-direction: row;
				justify-content: space-between; /* Added space-between */

				.text {
					flex-direction: row;
					gap: 2rem; /* Added gap between elements */
				}
			}

			.btn-con {
				margin-left: 1rem; /* Added margin-top for space before the button */
			}
		}
	}
`;

export default Item;
