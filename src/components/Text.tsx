import React, { FunctionComponent } from "react";
import Styles from "./Text.module.css";

export const Text: FunctionComponent = ({ children }) => (
  <p className={Styles.text}>{children}</p>
);
