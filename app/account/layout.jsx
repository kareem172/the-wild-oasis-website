import SideNavigation from "../_components/SideNavigation";

function layout({ children }) {
  return (
    <div className=" grid grid-cols-[16rem_1fr] gap-12 h-full">
      <SideNavigation />
      <main className="py-1">{children}</main>
    </div>
  );
}

export default layout;
