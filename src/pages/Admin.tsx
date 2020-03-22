import { format } from "date-fns";
import { auth, firestore } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React, { FunctionComponent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Form } from "../components/Form";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { LoginForm } from "../components/LoginForm";
import { Text } from "../components/Text";
import { Title } from "../components/Title";
import { Ride, useRides } from "../hooks/useRides";
import Styles from "./Admin.module.css";

const Admin: FunctionComponent = () => {
  const [user, initialising] = useAuthState(auth());
  const rides = useRides();

  const handleDeleteClick = (ride: Ride) => {
    firestore().doc(`rides/${ride.id}`).delete();
  };

  if (initialising) {
    return <Text>Ermittle...</Text>;
  }

  if (!user) {
    return (
      <>
        <Title>Admin</Title>
        <LoginForm />
      </>
    );
  }

  return (
    <>
      <Title>Admin</Title>
      <Title as="h2">Neue Fahrt</Title>
      <Form />
      {rides && (
        <>
          <Title as="h2">Fahrten</Title>
          <List>
            {rides.map((ride) => (
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
    </>
  );
};

export default Admin;
