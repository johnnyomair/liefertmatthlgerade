import { Interval, parse } from "date-fns";
import { firestore } from "firebase/app";
import React, { FormEvent, FunctionComponent } from "react";

export const Form: FunctionComponent = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const date = event.currentTarget.date.value;
    const start = event.currentTarget.start.value;
    const end = event.currentTarget.end.value;

    const newRide: Interval = {
      start: parse(`${date} ${start}`, "yyyy-MM-dd HH:mm", new Date()),
      end: parse(`${date} ${end}`, "yyyy-MM-dd HH:mm", new Date())
    };

    firestore()
      .collection("rides")
      .add(newRide);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Datum</label>
        <input id="date" name="date" type="date" required />
      </div>
      <div>
        <label htmlFor="start">Start</label>
        <input id="start" name="start" type="time" required />
      </div>
      <div>
        <label htmlFor="end">Ende</label>
        <input id="end" name="end" type="time" required />
      </div>
      <button>Speichern</button>
    </form>
  );
};
