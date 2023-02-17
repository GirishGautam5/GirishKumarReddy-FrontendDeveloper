import React, { useEffect, useState } from "react";

export default function Rockets() {
  const [rockets, setRockets] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState({ name: "", status: "", cost: "" });

  useEffect(() => {
    const fetchRockets = async () => {
      const res = await fetch(`https://api.spacexdata.com/v3/rockets`);
      const data = await res.json();
      setRockets(data);
      setLoading(false);
    };

    fetchRockets();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredData = rockets?.filter((item) => {
    return (
      item?.rocket_name.includes(filter.name) &&
      item?.active.toString()?.includes(filter.status) &&
      item?.cost_per_launch.toString()?.includes(filter.cost)
    );
  });

  const showFilteredData = filter.name || filter.status || filter.cost;
  const rocketsData = showFilteredData ? filteredData : rockets;

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
              onChange={handleFilterChange}
            />
          </label>
          <label className="text-white">
            Rocket Status:{" "}
            <input
              type="text"
              name="status"
              placeholder="Search by status(true or false)"
              value={filter.status}
              onChange={handleFilterChange}
            />
          </label>
          <label className="text-white">
            Total Cost:{" "}
            <input
              type="text"
              name="cost"
              placeholder="Search by total cost"
              value={filter.cost}
              onChange={handleFilterChange}
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
          {showFilteredData && filteredData?.length === 0 && (
            <h1 className="noResult">No Search Results ....</h1>
          )}
        </div>
      </div>
    </section>
  );
}
