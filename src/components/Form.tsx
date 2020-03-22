import { Interval, parse, isPast, endOfDay } from "date-fns";
import { FormApi, ValidationErrors } from "final-form";
import { firestore } from "firebase/app";
import React, { FunctionComponent } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { Input } from "./Input";
import Styles from "./Form.module.css";

interface FormValues {
  date?: string;
  start?: string;
  end?: string;
}

const validate = (values: FormValues): ValidationErrors => {
  const { date, start, end } = values;

  const errors: ValidationErrors = {};

  if (date) {
    const parsedDate = parse(date, "yyyy-MM-dd", new Date());

    if (isPast(endOfDay(parsedDate))) {
      errors.date = "Datum darf nicht in der Vergangenheit sein";
    }
  } else {
    errors.date = "Pflichtfeld";
  }

  if (start) {
    if (end) {
      const parsedStart = parse(start, "HH:mm", new Date());
      const parsedEnd = parse(end, "HH:mm", new Date());

      if (parsedStart.getTime() > parsedEnd.getTime()) {
        errors.start = "Start darf nicht nach Ende sein";
      }
    }
  } else {
    errors.start = "Pflichtfeld";
  }

  if (end) {
    if (start) {
      const parsedStart = parse(start, "HH:mm", new Date());
      const parsedEnd = parse(end, "HH:mm", new Date());

      if (parsedStart.getTime() > parsedEnd.getTime()) {
        errors.end = "Ende darf nicht vor Start sein";
      }
    }
  } else {
    errors.end = "Pflichtfeld";
  }

  return errors;
};

export const Form: FunctionComponent = () => {
  const handleSubmit = (values: FormValues, form: FormApi<FormValues>) => {
    const { date, start, end } = values;

    const newRide: Interval = {
      start: parse(`${date} ${start}`, "yyyy-MM-dd HH:mm", new Date()),
      end: parse(`${date} ${end}`, "yyyy-MM-dd HH:mm", new Date()),
    };

    return firestore().collection("rides").add(newRide);
  };

  return (
    <FinalForm
      onSubmit={handleSubmit}
      validate={validate}
      render={({ handleSubmit, invalid, pristine, form }) => (
        <form
          onSubmit={async (event) => {
            await handleSubmit(event);
            form.reset();
          }}
        >
          <Field
            id="date"
            name="date"
            type="date"
            label="Datum"
            component={Input}
            required
          />
          <Field
            id="start"
            name="start"
            type="time"
            label="Start"
            component={Input}
            required
          />
          <Field
            id="end"
            name="end"
            type="time"
            label="End"
            component={Input}
            required
          />
          <div className={Styles.buttonContainer}>
            <button disabled={invalid || pristine}>Speichern</button>
          </div>
        </form>
      )}
    />
  );
};
