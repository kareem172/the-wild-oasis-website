"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBooking } from "./data-service";
import { redirect } from "next/navigation";
export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Invalid national ID");
  const updatedData = {
    nationalID,
    nationality,
    countryFlag,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const booking = await getBooking(bookingId);
  if (booking.guestId !== session.user.guestId)
    throw new Error("Unauthorized to delete this reservation");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Reservation could not be deleted");

  revalidatePath("/account/reservations");
}
export async function updateReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized to update reservation");

  const reservationId = formData.get("reservationId");
  const numGuests = parseInt(formData.get("numGuests"), 10);
  const observations = formData.get("observations");

  const reservation = await getBooking(reservationId);
  if (reservation.guestId !== session.user.guestId)
    throw new Error("Unauthorized to update this reservation");

  const updatedData = {
    numGuests,
    observations,
  };

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", reservationId);

  if (error) throw new Error("Reservation could not be updated");

  revalidatePath(`/account/reservations`);
  revalidatePath(`/account/reservations/edit/${reservationId}`);
  redirect(`/account/reservations`);
}
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
