import { useState } from "react";
import BackButton from "../buttons/BackButton.jsx";
import Loader from "../Loader.jsx";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({
	translate,
	identifier,
	webSocket,
	onClose,
	handleSocketMessage,
	sendSocketMessage,
}) {
	const navigate = useNavigate();

	const [email, setEmail] = useState(
		identifier.includes("@") ? identifier : ""
	);
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState(
		identifier.includes("@") ? "" : identifier
	);
	const [loader, setLoader] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoader(true);

		if (JSON.stringify(identifier).includes("@")) {
			setEmail(identifier);
		} else {
			setUsername(identifier);
		}

		await sendSocketMessage(
			webSocket,
			JSON.stringify({
				command: "register_user",
				data: {
					username: username,
					email: email,
					password: password,
				},
			})
		);

		webSocket.addEventListener("message", (event) => {
			handleSocketMessage(event.data).then(() => {
				setLoader(false);
				navigate("/app");
			});
		});
	};

	return (
		<>
			<div className="flex items-center">
				<BackButton onClose={onClose} />

				<div className="flex flex-col ml-5">
					<h2 className="text-3xl">{translate("create_your_account")}</h2>
					<p className="text-gray-400 text-sm">
						{translate(
							"please_enter_your_informations_to_create_your_whispee_account"
						)}
					</p>
				</div>
			</div>
			<form
				action=""
				method="post"
				className="flex flex-col space-y-4 my-6"
				onSubmit={handleSubmit}>
				<div className="relative">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg
							className="w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 24 24">
							<path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2a4.505 4.505 0 0 0-4.5 4.5ZM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17Z"></path>
						</svg>
					</div>

					<input
						type="text"
						id="identifier"
						className="bg-white border border-neutral-300 text-black text-sm rounded-lg focus:ring-primary focus:border-primary disabled:bg-slate-100 block w-full pl-10 p-2.5 duration-200"
						disabled={loader}
						minLength={4}
						maxLength={32}
						required
						placeholder={translate("username")}
						onInput={(e) => setUsername(e.currentTarget.value)}
						value={username}
					/>
				</div>

				<div className="relative">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg
							className="w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 24 24">
							<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7Z"></path>
						</svg>
					</div>

					<input
						type="email"
						id="email"
						className="bg-white border border-neutral-300 text-black text-sm rounded-lg focus:ring-primary focus:border-primary disabled:bg-slate-100 block w-full pl-10 p-2.5 duration-200"
						disabled={loader}
						minLength={7}
						maxLength={30}
						required
						placeholder={translate("email")}
						value={email}
						onInput={(e) => setEmail(e.currentTarget.value)}
					/>
				</div>

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
						className="bg-white border border-neutral-300 text-black text-sm rounded-lg focus:ring-primary focus:border-primary disabled:bg-slate-100 block w-full pl-10 p-2.5 duration-200"
						disabled={loader}
						minLength={7}
						maxLength={30}
						required
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
							{loader ? <Loader /> : translate("sign_up")}
						</p>
					</button>
				</div>
			</form>
		</>
	);
}
