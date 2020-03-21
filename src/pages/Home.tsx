import { format, isWithinInterval } from "date-fns";
import React, { FunctionComponent } from "react";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { Text } from "../components/Text";
import { Title } from "../components/Title";
import { useRides } from "../hooks/useRides";
import Styles from "./Home.module.css";

const Home: FunctionComponent = () => {
  const rides = useRides();

  if (!rides) {
    return <Text>Ermittle...</Text>;
  }

  const currentRide = rides.find(ride => isWithinInterval(new Date(), ride));

  if (currentRide) {
    return (
      <>
        <span className={Styles.emoji} role="img" aria-label="A cyclist">
          🚴🏼‍♂️
        </span>
        <Title>Jawohl!</Title>
        <Text>
          Matthl ist noch bis{" "}
          <strong>{format(currentRide.end, "HH:mm")}</strong> unterwegs.
        </Text>
        <a className={Styles.orderLink} href="https://foodninjas.at">
          Bestellen
        </a>
      </>
    );
  }

  return (
    <>
      <span className={Styles.emoji} role="img" aria-label="A crying face">
        😭
      </span>
      <Title>Leider nein!</Title>
      <Title as="h2">Matthls nächste Fahrten</Title>
      <List>
        {rides.map(ride => (
          <ListItem key={ride.id}>
            <div className={Styles.listItem}>
              {format(ride.start, "dd.MM.yyyy, HH:mm")}-
              {format(ride.end, "HH:mm")}
            </div>
          </ListItem>
        ))}
        {rides.length === 0 && <Text>Keine geplanten Fahrten</Text>}
      </List>
    </>
  );
};

export default Home;
