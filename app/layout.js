import Header from "./_components/Header";
import Logo from "./_components/Logo";
import Navigation from "./_components/navigation";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";

const josefinFont = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "The Wild Oasis",
  },
  description: "Luxurious stays in the heart of the city of Italy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${josefinFont.className} antialiased bg-primary-950 min-h-svh text-primary-50 flex flex-col`}
      >
        <Header />
        <div className=" flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto  w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
