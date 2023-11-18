import { useParams, Link, useLocation } from "react-router-dom";
import React from "react";

export default function VanDetail() {
  const [van, setVans] = React.useState(null);
  const location = useLocation();
  const params = useParams();
  React.useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((response) => response.json())
      .then((responseData) => setVans(responseData.vans));
  }, [params.id]);

  console.log(location.state);
  return (
    <div className="van-detail-container">
      {van ? (
        <div className="van-detail">
          <Link
            to={`..${location.state.search ? `?${location.state.search}` : ""}`}
            relative="path"
            className="back-button"
          >
            &larr;{" "}
            <span>
              Back to all {location.state ? location.state.type : ""} Vans
            </span>
          </Link>
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
