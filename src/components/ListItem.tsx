import React, { FunctionComponent } from "react";
import Styles from "./ListItem.module.css";

export const ListItem: FunctionComponent = ({ children }) => (
  <li className={Styles.item}>{children}</li>
);
