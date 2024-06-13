import Spinner from "../_components/Spinner";

function loading() {
  return (
    <div className=" grid content-center justify-center">
      <Spinner />
      <p className="text-2xl">Loading Cabins</p>
    </div>
  );
}

export default loading;
