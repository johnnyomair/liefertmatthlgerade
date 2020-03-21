import { format } from "date-fns";
import { firestore } from "firebase/app";
import React, { FunctionComponent } from "react";
import { Form } from "../components/Form";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { Text } from "../components/Text";
import { Title } from "../components/Title";
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
      <Title>Admin</Title>
      <Title as="h2">Neue Fahrt</Title>
      <Form />
      {rides && (
        <>
          <Title as="h2">Fahrten</Title>
          <List>
            {rides.map(ride => (
              <ListItem key={ride.id}>
                <div className={Styles.listItem}>
                  <span>
                    {format(ride.start, "dd.MM.yyyy, HH:mm")}-
                    {format(ride.end, "HH:mm")}
                  </span>
                  <button onClick={() => handleDeleteClick(ride)}>
                    Löschen
                  </button>
                </div>
              </ListItem>
            ))}
            {rides.length === 0 && <Text>Keine geplanten Fahrten</Text>}
          </List>
        </>
      )}
    </div>
  );
};
