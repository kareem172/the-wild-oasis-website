import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const [setting, bookedDays] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className=" grid grid-cols-2 border border-primary-800 max-h-[400px] ">
      <DateSelector setting={setting} cabin={cabin} bookedDays={bookedDays} />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default Reservation;
