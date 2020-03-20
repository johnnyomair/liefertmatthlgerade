import { format } from "date-fns";
import { firestore } from "firebase";
import React, { FunctionComponent } from "react";
import { Form } from "../components/Form";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { Ride, useRides } from "../hooks/useRides";
import Styles from "./Admin.module.css";

export const Admin: FunctionComponent = () => {
  const rides = useRides();

  const handleDeleteClick = (ride: Ride) => {
    firestore()
      .doc(`rides/${ride.id}`)
      .delete();
  };

  return (
    <div>
      <h1>Admin</h1>
      <h2>Neue Fahrt</h2>
      <Form />
      {rides && (
        <>
          <h2>Fahrten</h2>
          <List>
            {rides.map(ride => (
              <ListItem key={ride.id}>
                <div className={Styles.listItem}>
                  <span>
                    {format(ride.start, "dd.MM.yy, HH:mm")}-
                    {format(ride.end, "HH:mm")}
                  </span>
                  <button onClick={() => handleDeleteClick(ride)}>
                    Löschen
                  </button>
                </div>
              </ListItem>
            ))}
            {rides.length === 0 && <div>Keine geplanten Fahrten</div>}
          </List>
        </>
      )}
    </div>
  );
};
