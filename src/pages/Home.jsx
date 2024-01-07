import React from "react";
import Main from "./Main";
import Row from "../components/Row";
import requests from "../requests";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Main />
      <div className="flex justify-center items-center my-10 text-center">
        <div className="text-white wall relative">
          <img src={process.env.PUBLIC_URL + "/images/wall2.png"} alt="" />
          <div className="wall-fix"></div>
          <small className="text-white absolute top-15 left-12 italic w-[20%] wall-text">
            Stay Updated with our Upcoming movies
          </small>
        </div>
      </div>
      <Row rowID="1" title="Up Coming" fetchURL={requests.requestUpcoming} />
      <div className="flex justify-center items-center my-10 text-center">
        <div className="text-white wall relative">
          <img src={process.env.PUBLIC_URL + "/images/wall3.png"} alt="" />
          <div className="wall-fix"></div>
          <small className="text-white absolute top-15 left-12 italic w-[20%] wall-text">
            Catch up with movies that everyone knows
          </small>
        </div>
      </div>
      <Row rowID="2" title="Popular" fetchURL={requests.requestPopular} />
      <div className="flex justify-center items-center my-10 text-center">
        <div className="text-white wall relative">
          <img src={process.env.PUBLIC_URL + "/images/wall4.png"} alt="" />
          <div className="wall-fix"></div>
          <div className="left"></div>
          <small className="text-white absolute top-15 left-12 italic w-[20%] wall-text">
            Follow the latest Trends
          </small>
        </div>
      </div>
      <Row rowID="3" title="Trending" fetchURL={requests.requestTrending} />
      <div className="flex justify-center items-center my-10 text-center">
      <div className="text-white wall relative">
          <img src={process.env.PUBLIC_URL + "/images/wall5.png"} alt="" />
          <div className="wall-fix"></div>
          <small className="text-white absolute top-15 left-12 italic w-[20%] wall-text">
            Evergreen Classics, that have stood the test of time "TOP RATED"
          </small>
        </div>
      </div>
      <Row rowID="4" title="Top Rated" fetchURL={requests.requestTopRated} />
      <div className="flex justify-center items-center my-10 text-center">
        <div className="text-white wall relative">
          <img src={process.env.PUBLIC_URL + "/images/wall1.png"} alt="" />
          <div className="wall-fix"></div>
          <small className="text-white absolute top-5 left-5 italic w-[20%] wall-text">
            Love the Dark....?
          </small>
          <small className="text-white absolute bottom-15 right-5 italic w-[20%] wall-text">
            Try out our Horror section......
          </small>
        </div>
      </div>
      <Row rowID="5" title="Horror" fetchURL={requests.requestHorror} />
      <Footer />
    </>
  );
}
