import React, { useState } from "react";
import styled from "styled-components";
import dlticon from "../assets/delete.svg";
import plusicon from "../assets/plus.svg";
import tick from "../assets/tick-green.svg";
import revert from "../assets/revert.svg";

export default function Interface() {
	const [datas, setData] = useState([]);
	const [todo, setTodone] = useState({
		id: 0,
		todo: "",
	});
	const [compleated, setCompleated] = useState([]);
	let update = () => {
		setData((prestate) => [...prestate, todo]);
		setTodone({ id: 0, todo: "" });
	};
	let handleKeypress = (e) => {
		if (e.key === "Enter") {
			update();
		}
	};
	let AddCompleate = (e, id) => {
		if (e.target.checked) {
			let obj = datas.filter((data) => id === data.id);
			obj.map((obj2) => {
				Remove(obj2.id);
				return setCompleated((prestate) => [...prestate, obj2]);
			});
		}
	};
	let Remove = (id, check) => {
		if (check) {
			let new_list = compleated.filter((item) => item.id !== id);
			setCompleated(new_list);
		} else {
			let new_list = datas.filter((data) => data.id !== id);
			setData(new_list);
		}
	};
	let Undo = (id) => {
		let datas = compleated.filter((data) => id === data.id);
		datas.map((data) => {
			Remove(data.id, true);
			return setData((prestate) => [...prestate, data]);
		});
	};

	return (
		<div>
			<Container>
				<Heading>Todo List</Heading>
				<Sectiontop>
					<Heading2>Things to be done</Heading2>
					<List>
						{datas.map((data) => {
							if (data.todo.trim()) {
								return (
									<Item key={data.id}>
										<Content>
											<Checkbox
												type="checkbox"
												onChange={(e) => {
													AddCompleate(e, data.id);
												}}
											></Checkbox>
											{data.todo}
										</Content>
										<Dltbttn
											onClick={() => Remove(data.id)}
										>
											<img src={dlticon} alt="Delete" />
										</Dltbttn>
									</Item>
								);
							}
						})}
					</List>
					<Div>
						<Plus>
							<img src={plusicon} alt="Plus" />
						</Plus>
						<Input
							value={todo.todo}
							onChange={(e) =>
								setTodone({
									...todo,
									id: Date.now(),
									todo: e.target.value,
								})
							}
							onKeyPress={handleKeypress}
						></Input>
						<Add onClick={() => update()}> Add New</Add>
					</Div>
				</Sectiontop>
				<SectionBottom>
					<Heading2>Completed</Heading2>
					<List>
						{compleated.map((Clist) => (
							<Item key={Clist.id}>
								<Content>
									<Tick>
										<img src={tick} alt="Tick" />
									</Tick>
									{Clist.todo}
								</Content>

								<div>
									<Revert onClick={() => Undo(Clist.id)}>
										<img src={revert} alt="Revert" />
									</Revert>
									<Dltbttn
										onClick={() => Remove(Clist.id, true)}
									>
										<img src={dlticon} alt="Delete" />
									</Dltbttn>
								</div>
							</Item>
						))}
					</List>
				</SectionBottom>
			</Container>
		</div>
	);
}
const Container = styled.section`
	width: 400px;
	margin: 0 auto;
	box-shadow: 0px 1px 13px 3px rgba(0, 0, 0, 0.75);
	padding: 25px;
	margin-top: 50px;
`;
const Heading = styled.h2`
	text-align: center;
	font-size: 34px;
`;
const Sectiontop = styled.section`
	width: 100%;
`;
const Heading2 = styled.h2`
	font-size: 24px;
	color: #081341;
`;
const List = styled.ul`
	list-style: none;
`;
const Item = styled.li`
	display: flex;
	justify-content: space-between;
`;
const Content = styled.div`
	font-size: 18px;
`;
const Checkbox = styled.input`
	width: 16px;
	height: 16px;
	border-radius: 50%;
	border: 2px solid #081341;
	display: inline-block;
	margin-right: 10px;
`;
const Dltbttn = styled.div`
	width: 20px;
	display: inline-block;
	margin-left: 20px;
`;
const Div = styled.div`
	padding-left: 40px;
	position: relative;
`;
const Input = styled.input`
	width: 270px;
	height: 40px;
	padding-left: 32px;
	position: relative;
	background-color: #fff;
	border: 1px solid #e7e7e7;
`;
const Add = styled.button`
	background-color: #081341;
	width: 95px;
	height: 40px;
	color: #fff;
	border: none;
	border-radius: 5px;
	position: absolute;
	right: 2px;
	font-size: 16px;
`;
const Plus = styled.span`
	width: 25px;
	height: 25px;
	position: absolute;
	z-index: 2;
	left: 47px;
	top: 7px;
`;
const SectionBottom = styled.section`
	width: 100%;
`;
const Tick = styled.div`
	width: 16px;
	height: 16px;
	border-radius: 50%;
	border: 2px solid #7ddfc2;
	display: inline-block;
	margin-right: 10px;
`;
const Revert = styled.div`
	width: 15px;
	height: 15px;
	display: inline-block;
	margin-right: 15px;
`;
