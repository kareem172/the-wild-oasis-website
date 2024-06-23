import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const { user } = (await auth()) || {};
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors flex items-center gap-2"
          >
            {user && (
              <img
                src={user.image}
                alt={user.name}
                className="w-8 h-8 rounded-full"
                referrerPolicy="no-referrer"
              />
            )}
            Guest area
          </Link>
        </li>
      </ul>
    </nav>
  );
}
