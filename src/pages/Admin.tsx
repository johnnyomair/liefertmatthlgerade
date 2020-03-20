import { format } from "date-fns";
import React, { FunctionComponent } from "react";
import { Form } from "../components/Form";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { useRides } from "../hooks/useRides";

export const Admin: FunctionComponent = () => {
  const rides = useRides();

  return (
    <div>
      <h1>Admin</h1>
      <Form />
      {rides && (
        <List>
          {rides.map(ride => (
            <ListItem key={ride.id}>
              {format(ride.start, "dd.MM.yy HH:mm")}-{format(ride.end, "HH:mm")}
            </ListItem>
          ))}
          {rides.length === 0 && <ListItem>Keine Fahrten</ListItem>}
        </List>
      )}
    </div>
  );
};
