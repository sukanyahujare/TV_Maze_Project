import React, { useState, useEffect } from "react";

const Actor = (props) => {
  // const [ApiData, setApiData] = useState([]);
  const [ActorData1, satActorData] = useState([]);
  console.log(props.error);
  console.log(props.input);

  // https://api.tvmaze.com/people/actorId/castcredits?embed=show

  useEffect(() => {
    async function ApiCall() {
      const reapons = await fetch(
        ` https://api.tvmaze.com/search/people?q=${props.input}`
      );
      const Data = await reapons.json();
      // setApiData(Data);
      console.log("data 18" + Data);

      let shows = Data.filter((items, ind) => {
        console.log(items);
        return 0 === ind;
      });

      console.log("hi");
      console.log(shows); //oject
      console.log("hello");

      const ActorApi = await fetch(
        `https://api.tvmaze.com/people/${shows[0].person.id}/castcredits?embed=show`
      );
      const ActorData = await ActorApi.json();
      satActorData(ActorData);
      // console.log(ActorData1[0].ActorData1.show.language);
    }
    ApiCall();
  }, [props.input]);

  return (
    <>
      {ActorData1[0] ? (
        <div className="Tag">
          {console.log(ActorData1)}
          {ActorData1.map((item) => {
            return (
              <div className="items">
                <div>{item._embedded.show.language}</div>
                <img
                  src={
                    item._embedded.show ? item._embedded.show.image.medium : ""
                  }
                  alt="img"
                ></img>{" "}
                <p className="name">{item._embedded.show.name}</p>
                <p className="DisCr">{item._embedded.show.summary}</p>
              </div>
            );
          })}
          {props.error(false)}
        </div>
      ) : (
        props.error(true)
      )}
    </>
  );
};

export default Actor;
