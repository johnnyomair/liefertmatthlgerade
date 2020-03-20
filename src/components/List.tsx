import React, { FunctionComponent } from "react";
import Styles from "./List.module.css";

export const List: FunctionComponent = ({ children }) => (
  <ul className={Styles.list}>{children}</ul>
);
