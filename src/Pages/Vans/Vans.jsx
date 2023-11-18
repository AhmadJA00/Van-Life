import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";
export default function Vans() {
  const [vans, setVans] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const typeFilter = searchParams.get("type");

  React.useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVans();
        setVans(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadVans();
  }, []);

  const displaySearch = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  const vanElement = displaySearch.map((van) => {
    return (
      <div key={van.id} className="van-tile">
        <Link
          to={van.id}
          state={{
            search: searchParams.toString(),
            type: typeFilter,
          }}
        >
          <img src={van.imageUrl} />
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </Link>
      </div>
    );
  });

  const genParm = (key, value) => {
    const sp = new URLSearchParams(searchParams);
    if (value === null) {
      sp.delete("type");
    } else {
      sp.set(key, value);
    }
    return `?${sp.toString()}`;
  };

  const handleFilter = (key, value) => {
    setSearchParams((prevState) => {
      if (value === null) {
        prevState.delete(key);
      } else {
        prevState.set(key, value);
      }
      return prevState;
    });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>There was an Error: {error.message}</h1>;
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          className={`van-type simple ${
            typeFilter === "simple" ? "selected" : null
          }`}
          onClick={() => handleFilter("type", "simple")}
        >
          Simple
        </button>
        <button
          className={`van-type luxury ${
            typeFilter === "luxury" ? "selected" : null
          }`}
          onClick={() => handleFilter("type", "luxury")}
        >
          Luxury
        </button>
        <button
          className={`van-type rugged ${
            typeFilter === "rugged" ? "selected" : null
          }`}
          onClick={() => handleFilter("type", "rugged")}
        >
          Rugged
        </button>
        {typeFilter ? (
          <button
            className="van-type clear-filters"
            onClick={() => handleFilter("type", null)}
          >
            Clear Filters
          </button>
        ) : (
          ""
        )}

        {/* <Link className="van-type simple" to={"?type=simple"}>
          Simple
        </Link>
        <Link className="van-type luxury" to={"?type=luxury"}>
          Luxury
        </Link>
        <Link className="van-type rugged" to={"?type=rugged"}>
          Rugged
        </Link>
        <Link className="van-type clear-filters" to={"."}>
          Clear Filters
        </Link> */}
      </div>
      <div className="van-list">{vanElement}</div>
    </div>
  );
}
{
  /* <Link className="van-type simple" to={genParm("type", "simple")}>
Simple
</Link>
<Link className="van-type luxury" to={genParm("type", "luxury")}>
Luxury
</Link>
<Link className="van-type rugged" to={genParm("type", "rugged")}>
Rugged
</Link>
<Link className="van-type clear-filters" to={genParm("type", null)}>
Clear Filters
</Link> */
}
{
  /* <button
className="van-type simple"
onClick={() => setSearchParams({ type: "simple" })}
>
Simple
</button>
<button
className="van-type luxury"
onClick={() => setSearchParams({ type: "luxury" })}
>
Luxury
</button>
<button
className="van-type rugged"
onClick={() => setSearchParams({ type: "rugged" })}
>
Rugged
</button>
<button
className="van-type clear-filters"
onClick={() => setSearchParams({})}
>
Clear Filters
</button> */
}
