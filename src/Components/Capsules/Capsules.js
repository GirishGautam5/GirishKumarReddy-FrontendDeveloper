import React from "react";
import Pagination from "../Pagination/Pagination";

export const filteredData = (capsules, filter) =>
  capsules?.filter((item) => {
    return (
      item?.capsule_serial?.includes(filter.type) &&
      item?.status?.includes(filter.status) &&
      item?.landings?.toString().includes(filter.landings)
    );
  });

export default function Capsules() {
  const [capsules, setCapsules] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState({
    type: "",
    status: "",
    landings: "",
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
  };

  const capsulesPerPage = 9;
  React.useEffect(() => {
    const fetchCapsulesData = async () => {
      const response = await fetch("https://api.spacexdata.com/v3/capsules");
      const data = await response.json();
      setCapsules(data);
      setLoading(false);
    };
    fetchCapsulesData();
  }, []);

  const filteredCapsulesData = filteredData(capsules, filter);
  const showFilteredData = filter.type || filter.status || filter.landings;
  const displayCapsules = showFilteredData ? filteredCapsulesData : capsules;
  const lastCapsuleIndex = currentPage * capsulesPerPage;
  const firstCapsuleIndex = lastCapsuleIndex - capsulesPerPage;
  const capsulesData = displayCapsules?.slice(
    firstCapsuleIndex,
    lastCapsuleIndex
  );

  return loading ? (
    <div className="loader"></div>
  ) : (
    <>
      <section>
        <h1 className="heading mb-5">Capsules</h1>
        <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-10">
          <label className="text-white">
            Capsule type:{" "}
            <input
              type="text"
              name="type"
              placeholder="Search by Capsule type(C101)"
              value={filter.type}
              onChange={handleFilterChange}
            />
          </label>
          <label className="text-white">
            Capsule Status:{" "}
            <input
              type="text"
              name="status"
              placeholder="Search by status"
              value={filter.status}
              onChange={handleFilterChange}
            />
          </label>
          <label className="text-white">
            Total Landings:{" "}
            <input
              type="text"
              name="landings"
              placeholder="Search by total landings"
              value={filter.landings}
              onChange={handleFilterChange}
            />
          </label>
          {capsulesData.map((capsule) => (
            <article
              key={capsule?.capsule_serial}
              className="articles capsules"
            >
              <h2 className="text-xl font-bold mb-5">
                {capsule?.type},{" "}
                <span className="text-base font-normal opacity-75">
                  {capsule?.capsule_serial}
                </span>
              </h2>
              <ul>
                <li className="mb-1">Reused times: {capsule?.reuse_count}</li>
                <li className="mb-1">landings: {capsule?.landings}</li>
                <li className="mb-1">Details: {capsule?.details || "NA"} </li>
                <li className="mb-1">
                  Original Launch: {capsule?.original_launch || "NA"}
                </li>
                <li className="mb-1">
                  Original Launch Unix: {capsule?.original_launch_unix || "NA"}
                </li>
                <li
                  className={`capitalize ${
                    capsule?.status === "active"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  Status: {capsule?.status}
                </li>
              </ul>
            </article>
          ))}
          {showFilteredData && filteredCapsulesData?.length === 0 && (
            <h1 className="noResult">No Search Results ....</h1>
          )}
        </div>
      </section>
      <Pagination
        totalCapsules={displayCapsules?.length}
        capsulesPerPage={capsulesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
