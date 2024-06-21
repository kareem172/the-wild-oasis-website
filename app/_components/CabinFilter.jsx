"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "1-3 guests", value: "small" },
  { label: "4-7 guests", value: "medium" },
  { label: "8-12 guests", value: "large" },
];
function CabinFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";
  function handleFilter(filter) {
    console.log("filter", filter);
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className=" border border-primary-800 flex">
      {FILTERS.map(({ label, value }) => (
        <Button
          key={value}
          filter={value}
          activeFilter={activeFilter}
          handleFilter={handleFilter}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

function Button({ children, handleFilter, filter, activeFilter }) {
  return (
    <button
      className={`px-5 p-2 hover:bg-primary-700 ${
        activeFilter === filter && " bg-primary-700 text-primary-50"
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default CabinFilter;
