import React, { FunctionComponent } from "react";
import { FieldRenderProps } from "react-final-form";
import Styles from "./Input.module.css";

export const Input: FunctionComponent<
  FieldRenderProps<any, HTMLElement> & {
    label: string;
  }
> = ({ input, meta, label }) => (
  <>
    <div className={Styles.inputContainer}>
      <label className={Styles.label}>{label}</label>
      <input className={Styles.input} {...input} />
    </div>
    {meta.dirty && meta.error && (
      <span className={Styles.error}>{meta.error}</span>
    )}
  </>
);
