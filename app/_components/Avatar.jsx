import { auth } from "../_lib/auth";

async function Avatar() {
  const { user } = (await auth()) || {};
  if (!user) return null;

  return (
    <img
      src={user.image}
      alt={user.name}
      className="w-8 h-8 rounded-full"
      referrerPolicy="no-referrer"
    />
  );
}

export default Avatar;
