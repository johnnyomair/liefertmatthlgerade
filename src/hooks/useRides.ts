import { isFuture } from "date-fns";
import { firestore } from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

export interface Ride {
  id: string;
  start: Date;
  end: Date;
}

export const useRides = (): Ride[] | undefined => {
  const [rides] = useCollectionData<{
    id: string;
    start: firestore.Timestamp;
    end: firestore.Timestamp;
  }>(firestore().collection("rides"), { idField: "id" });

  return rides
    ?.map((ride) => ({
      ...ride,
      start: ride.start.toDate(),
      end: ride.end.toDate(),
    }))
    .filter((ride) => isFuture(ride.end))
    .sort((rideA, rideB) => rideA.start.getTime() - rideB.start.getTime());
};
