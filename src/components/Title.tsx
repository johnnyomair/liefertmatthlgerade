import React, { FunctionComponent } from "react";
import Styles from "./Title.module.css";

export const Title: FunctionComponent<{ as?: "h1" | "h2" }> = ({
  children,
  as
}) => {
  const Component = as || "h1";

  return <Component className={Styles.title}>{children}</Component>;
};
