import React from "react";

export const handleFilterChange = (event, setFilter, filter) => {
  const { name, value } = event.target;
  setFilter({ ...filter, [name]: value });
};

export  const filteredData =(rockets, filter)=> rockets?.filter((item) => {
  return (
    item?.rocket_name?.includes(filter.name) &&
    item?.active?.toString()?.includes(filter.status) &&
    item?.cost_per_launch?.toString()?.includes(filter.cost)
  );
});
export default function Rockets() {
  const [rockets, setRockets] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const [filter, setFilter] = React.useState({ name: "", status: "", cost: "" });

  React.useEffect(() => {
    const fetchRockets = async () => {
      const res = await fetch(`https://api.spacexdata.com/v3/rockets`);
      const data = await res.json();
      setRockets(data);
      setLoading(false);
    };

    fetchRockets();
  }, []);

  

 
const rocketsDataAfterFilter = filteredData(rockets, filter)
  const showFilteredData = filter.name || filter.status || filter.cost;
  const rocketsData = showFilteredData ? rocketsDataAfterFilter : rockets;

  return loading ? (
    <div className="loader"></div>
  ) : (
    <section className="rocket">
      <div className="overlay">
        <h1 className="heading">Rockets</h1>

        <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-10">
          <label className="text-white">
            Rocket Name:{" "}
            <input
              type="text"
              name="name"
              placeholder="Search by Rocket name"
              value={filter.name}
              onChange={(event)=>handleFilterChange(event, setFilter,filter)}
            />
          </label>
          <label className="text-white">
            Rocket Status:{" "}
            <input
              type="text"
              name="status"
              placeholder="Search by status(true or false)"
              value={filter.status}
              onChange={(event)=>handleFilterChange(event, setFilter,filter)}
            />
          </label>
          <label className="text-white">
            Total Cost:{" "}
            <input
              type="text"
              name="cost"
              placeholder="Search by total cost"
              value={filter.cost}
              onChange={(event)=>handleFilterChange(event, setFilter,filter)}
            />
          </label>
          {rocketsData?.map((rocket) => (
            <article key={rocket?.id} className="articles">
              <img
                src={rocket?.flickr_images[0]}
                alt={rocket?.rocket_name}
                className="h-72 w-full object-cover"
              />
              <div className="p-5">
                <h2 className="text-white font-bold text-xl my-1">
                  {rocket?.rocket_name}
                </h2>
                <h3
                  className={`capitalize ${
                    rocket?.active === true ? "text-green-500" : "text-red-500"
                  }`}
                >
                  Status: {rocket?.active === true ? "true" : "false"}
                </h3>
                <p>Cost per launch: {rocket?.cost_per_launch}</p>
                <p className="text-white opacity-75 text-sm mb-5">{`${rocket?.description.substring(
                  0,
                  100
                )}...`}</p>
                <button className="btn">Learn more</button>
              </div>
            </article>
          ))}
          {showFilteredData && rocketsDataAfterFilter?.length === 0 && (
            <h1 className="noResult">No Search Results ....</h1>
          )}
        </div>
      </div>
    </section>
  );
}
