import { ValidationErrors } from "final-form";
import { auth } from "firebase/app";
import "firebase/auth";
import React, { FunctionComponent } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { Input } from "./Input";
import Styles from "./LoginForm.module.css";

interface FormValues {
  password?: string;
}

const validate = (values: FormValues): ValidationErrors => {
  const { password } = values;
  const errors: ValidationErrors = {};

  if (!password || password.trim().length === 0) {
    errors.password = "Pflichtfeld";
  }

  return errors;
};

export const LoginForm: FunctionComponent = () => {
  const handleSubmit = (values: FormValues) => {
    const { password } = values;

    return auth().signInWithEmailAndPassword(
      "login@liefertmatthlgerade.at",
      password!
    );
  };

  return (
    <FinalForm
      onSubmit={handleSubmit}
      validate={validate}
      render={({ handleSubmit, invalid, pristine }) => (
        <form onSubmit={handleSubmit}>
          <Field
            id="password"
            name="password"
            type="password"
            label="Passwort"
            component={Input}
            required
          />
          <div className={Styles.buttonContainer}>
            <button disabled={invalid || pristine}>Anmelden</button>
          </div>
        </form>
      )}
    />
  );
};
