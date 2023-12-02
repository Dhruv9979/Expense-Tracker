import React, { useState } from "react";
import styled from "styled-components";
import avatar from "../../img/avatar.png";
import { bars } from "../../utils/Icons";
import { menuItems } from "../../utils/menuItems";

const Navigation = ({ active, setActive }) => {
	const [menuVisible, setMenuVisible] = useState(false);

	const toggleMenu = () => {
		setMenuVisible(!menuVisible);
	};

	const handleMenuItemClick = (itemId) => {
		setActive(itemId);
		setMenuVisible(false); // Collapse the menu when a menu item is clicked
	};

	return (
		<NavStyled menuVisible={menuVisible}>
			<div className="header">
				<BurgerMenu onClick={toggleMenu}>{bars}</BurgerMenu>
				<div className={`user-con ${menuVisible ? "collapsed" : ""}`}>
					{menuVisible && (
						<>
							<img src={avatar} alt="" />
							<div className="text">
								<h2>
									Dhruv
									<p>Your Money</p>
								</h2>
							</div>
						</>
					)}
				</div>
			</div>
			{menuVisible && (
				<ul className="menu-items">
					{menuItems.map((item) => (
						<li
							key={item.id}
							onClick={() => handleMenuItemClick(item.id)}
							className={active === item.id ? "active" : ""}
						>
							{item.icon}
							<span>{item.title}</span>
						</li>
					))}
				</ul>
			)}
		</NavStyled>
	);
};

const NavStyled = styled.nav`
	padding: 2rem 1.5rem;
	width: ${({ menuVisible }) => (menuVisible ? "275px" : "74px")};
	height: 100%;
	background: rgba(252, 246, 249, 0.78);
	border: 3px solid #ffffff;
	backdrop-filter: blur(4.5px);
	border-radius: 32px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 2rem;
	transition: width 0.4s ease-in-out;

	.toggle-menu {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		color: rgba(34, 34, 96, 0.6);
	}

	@media (max-width: 768px) {
		.toggle-menu {
			display: block;
		}
		.menu-items {
			display: none;
			flex-direction: column; /* Change the flex direction to column */
			width: 100%;
			width: 100%;
			
			z-index: 1;
		}
		.menu-items.visible {
			display: flex;
		}
		.menu-items li {
			margin: 0.6rem 0;
			padding: 0.5rem 1rem; /* Adjust padding for better spacing */
		}
	}
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.user-con {
		height: 100px;
		display: flex;
		align-items: center;
		gap: 1rem;
		img {
			width: 80px;
			height: 80px;
			border-radius: 50%;
			object-fit: cover;
			background: #fcf6f9;
			border: 2px solid #ffffff;
			padding: 0.2rem;
			box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
		}
		h2 {
			color: rgba(34, 34, 96, 1);
		}
		p {
			color: rgba(34, 34, 96, 0.6);
		}
		&.collapsed {
			img,
			.text {
				display: block;
			}
		}
	}

	.menu-items {
		flex: 1;
		display: flex;
		flex-direction: column;
		li {
			display: grid;
			grid-template-columns: 40px auto;
			align-items: center;
			margin: 0.6rem 0;
			font-weight: 500;
			cursor: pointer;
			transition: all 0.4s ease-in-out;
			color: rgba(34, 34, 96, 0.6);
			padding-left: 1rem;
			position: relative;
			i {
				color: rgba(34, 34, 96, 0.6);
				font-size: 1.4rem;
				transition: all 0.4s ease-in-out;
			}
		}
	}

	.active {
		color: rgba(34, 34, 96, 1) !important;
		i {
			color: rgba(34, 34, 96, 1) !important;
		}
		&::before {
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			width: 4px;
			height: 100%;
			background: #222260;
			border-radius: 0 10px 10px 0;
		}
	}
`;

const BurgerMenu = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	color: rgba(34, 34, 96, 0.6);
	font-size: 1.5rem;
	position: absolute;
	top: 1rem;
	right: 1rem;
`;

export default Navigation;
