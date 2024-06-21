import CabinCard from "../_components/CabinCard";
import { getCabins } from "../_lib/data-service";

async function CabinsList({ filter }) {
  const cabins = await getCabins();
  let filteredCabins = cabins;
  if (filter !== "all") {
    filteredCabins = cabins.filter((cabin) => {
      if (filter === "small") return cabin.maxCapacity <= 3;
      if (filter === "medium")
        return cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7;
      if (filter === "large")
        return cabin.maxCapacity >= 8 && cabin.maxCapacity <= 12;
    });
  }
  if (!cabins.length) return null;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinsList;
