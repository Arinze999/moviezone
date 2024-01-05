import React from "react";
import Main from "./Main";
import Row from "../components/Row";
import requests from "../requests";

export default function Home() {
  return (
    <>
      <Main />
      <div className="flex justify-center items-center my-2 text-center">
        <h1 className="text-center p-10 w-fit text-white text-4xl font-bold "></h1>
      </div>
      <Row rowID="1" title="Up Coming" fetchURL={requests.requestUpcoming} />
      <div className="flex justify-center items-center my-2 text-center">
        <h1 className="text-center p-10 w-fit text-white text-4xl font-bold "></h1>
      </div>
      <Row rowID="2" title="Popular" fetchURL={requests.requestPopular} />
      <div className="flex justify-center items-center my-2 text-center">
        <h1 className="text-center p-10 w-fit text-white text-4xl font-bold "></h1>
      </div>
      <Row rowID="3" title="Trending" fetchURL={requests.requestTrending} />
      <div className="flex justify-center items-center my-2 text-center">
        <h1 className="text-center p-10 w-fit text-white text-4xl font-bold "></h1>
      </div>
      <Row rowID="4" title="Top Rated" fetchURL={requests.requestTopRated} />
      <div className="flex justify-center items-center my-2 text-center">
        <h1 className="text-center p-10 w-fit text-white text-4xl font-bold "></h1>
      </div>
      <Row rowID="5" title="Horror" fetchURL={requests.requestHorror} />
    </>
  );
}
