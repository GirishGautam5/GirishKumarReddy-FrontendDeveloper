import React, { useState, useEffect } from "react";

export default function Capsules() {
  const [capsules, setCapsules] = useState([]);
  useEffect(() => {
    const fetchCapsulesData = async () => {
      const response = await fetch("https://api.spacexdata.com/v4/capsules");
      const data = await response.json();
      setCapsules(data);
    };
    fetchCapsulesData();
  }, []);
  return (
    <>
      <section>
        <h1 className="heading mb-5">Capsules</h1>
        <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-10">
          {capsules.map((capsule) => (
            <article key={capsule?.capsule_id} className="articles">
              <h2 className="text-xl font-bold mb-5">
                {capsule?.type},{" "}
                <span className="text-base font-normal opacity-75">
                  {capsule?.capsule_serial}
                </span>
              </h2>
              <ul>
                <li className="mb-1">Reused {capsule?.reuse_count} times</li>
                <li className="mb-1">{capsule?.landings} landings</li>
                <li className="mb-1">Details: {capsule?.details} </li>
                <li className="mb-1">
                  Original Launch: {capsule?.original_launch}{" "}
                </li>
                <li className="mb-1">
                  Original Launch Unix: {capsule?.original_launch_unix}
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
        </div>
      </section>
    </>
  );
}
