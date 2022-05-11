import React, { useEffect, useRef } from "react";
import { client } from "../client";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
	const navigate = useNavigate();

	const GoogleAuthSuccess = (response) => {
		const token = response.credential;
		const decodedResponse = jwtDecode(token);

		localStorage.setItem("user", JSON.stringify(decodedResponse));

		const { name, sub, picture } = decodedResponse;
		const doc = {
			_id: sub,
			_type: "user",
			userName: name,
			image: picture,
		};

		client.createIfNotExists(doc).then(() => {
			navigate("/", { replace: true });
		});
	};

	if (typeof window !== "undefined") {
		window.GoogleAuthSuccess = GoogleAuthSuccess;
	}

	const scriptRef = useRef(null);

	useEffect(() => {
		const script = document.createElement("script");

		script.src = "https://accounts.google.com/gsi/client";
		script.async = true;
		script.defer = true;

		if (scriptRef.current) {
			scriptRef.current.appendChild(script);
		}

		return () => {
			scriptRef.current?.removeChild(script);
		};
	}, [scriptRef]);

	return (
		<>
			<div ref={scriptRef}></div>

			<div
				id="g_id_onload"
				data-client_id={process.env.REACT_APP_GOOGLE_API_TOKEN}
				data-text="Continue with google"
				data-auto_prompt="false"
				data-callback="GoogleAuthSuccess"
			></div>

			<div className="flex flex-col items-center">
				<div
					className="g_id_signin"
					data-type="standard"
					data-size="large"
					data-theme="outline"
					data-text="continue_with"
					data-shape="rectangular"
					data-logo_alignment="center"
				></div>
			</div>
		</>
	);
};

export default GoogleLogin;
