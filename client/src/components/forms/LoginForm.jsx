import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../buttons/BackButton.jsx";
import Loader from "../Loader.jsx";
import { useEffect } from "react";

export default function LoginForm({
	translate,
	identifier,
	username,
	onClose,
	handleSocketMessage,
	webSocket,
	sendSocketMessage,
	connectedUser,
	session,
}) {
	const [password, setPassword] = useState("");
	const [loader, setLoader] = useState(false);
	const [isRedirecting, setRedirecting] = useState(false);
	const navigate = useNavigate();

	let data;
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoader(true);
		data = {
			identifier,
			password,
		};

		await sendSocketMessage(
			webSocket,
			JSON.stringify({
				command: "login_user",
				data,
			})
		);

		/* 		webSocket.addEventListener("message", (event) => {
			handleSocketMessage(event.data).then(() => {
				setLoader(false);
			});
		}); */
	};
	useEffect(() => {
		if (connectedUser && !isRedirecting) {
			setLoader(false);
			setRedirecting(true);
			navigate("/app");
		}
	}, [connectedUser, isRedirecting]);

	return (
		<>
			<div className="flex items-center">
				<BackButton onClose={onClose} />

				<div className="flex flex-col ml-5">
					<h2 className="text-3xl">
						Hey{" "}
						{JSON.stringify(identifier).includes("@") ? username : identifier},
					</h2>

					<p className="text-gray-400 text-sm">
						{translate(
							"please_enter_your_password_to_log_back_to_your_whispee_account"
						)}
					</p>
				</div>
			</div>
			<form
				action=""
				method=""
				className="flex flex-col space-y-4 my-6"
				onSubmit={handleSubmit}>
				<div className="relative">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg
							className="w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 24 24">
							<path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5ZM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7Zm4 10.723V20h-2v-2.277a1.994 1.994 0 0 1 1.454-3.672 2 2 0 0 1 1.277 2.945 1.99 1.99 0 0 1-.731.727Z"></path>
						</svg>
					</div>

					<input
						type="password"
						id="password"
						className="bg-white border border-neutral-300 text-black text-sm rounded-lg focus:ring-primary focus:border-primary disabled:bg-slate-100 disabled:cursor-not-allowed block w-full pl-10 p-2.5 duration-200"
						minLength={7}
						maxLength={30}
						required
						autoComplete="password"
						disabled={loader}
						placeholder={translate("password")}
						value={password}
						onInput={(e) => setPassword(e.currentTarget.value)}
					/>
				</div>
				<div className="flex w-full justify-end">
					<button
						type="submit"
						className="relative py-2 px-3 w-24 bg-primarydark hover:bg-primarydarker disabled:bg-primary disabled:cursor-not-allowed duration-200 hover:shadow active:scale-95 text-white right-0 rounded-md"
						disabled={loader}>
						<p className="mx-auto">
							{loader ? <Loader /> : translate("login")}
						</p>
					</button>
				</div>
			</form>
		</>
	);
}
