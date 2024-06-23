"use client";
import { deleteReservation } from "../_lib/actions";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";

function ReservationList({ bookings }) {
  const [optimisticBookings, deleteOptimisticBookings] = useOptimistic(
    bookings,
    (bookings, reservationId) => {
      return bookings.filter((booking) => booking.id !== reservationId);
    }
  );
  async function handleDelete(reservationId) {
    deleteOptimisticBookings(reservationId);
    await deleteReservation(reservationId);
  }

  if (optimisticBookings.length === 0) {
    return (
      <p className="text-lg">
        You have no reservations yet. Check out our{" "}
        <a className="underline text-accent-500" href="/cabins">
          luxury cabins &rarr;
        </a>
      </p>
    );
  }
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
