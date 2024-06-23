import ReservationCard from "@/app/_components/ReservationCard";
import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const { user } = await auth();
  const bookings = await getBookings(user.guestId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      <ReservationList bookings={bookings} />
    </div>
  );
}
