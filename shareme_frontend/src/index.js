import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "./index.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById("root")
);
