import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/firestore";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import firebaseConfig from "./config/firebase.json";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
