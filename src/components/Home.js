import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

function Home() {
  const [weatherData, setWeatherData] = useState({});

  const style = {
    wrapper: `relative`,
    container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://www.nasa.gov/sites/default/files/thumbnails/image/smap-weather.jpg')] before:bg-cover before:bg-center before:opacity-30 before:blur`,
    contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
    copyContainer: `w-1/2`,
    title: `relative text-white text-[46px] font-semibold`,
    description: `text-[#8a939b] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
    ctaContainer: `flex`,
    accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
    button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
    cardContainer: `rounded-xl bg-[#313338] ml-10`,
    infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
    author: `flex flex-col justify-center ml-4`,
    name: ``,
    infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
  };

  useEffect(() => {
    (async () => {
      const weatherData = await axios.get("/city/weather/specificCity");
      setWeatherData(weatherData.data);
    })();
  }, []);

  console.log(weatherData);
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className={style.copyContainer}>
            <div className={style.title}>
              Weather Forecast for your city through OpenWeather API
            </div>
            <div className={style.description}>
             OpenWeather API is a free service that provides weather data, including current weather data, forecasts, nowcasts and historical weather data for any geographical location.
            </div>
            <div className={style.ctaContainer}>
              <Link to="/map">
              <button className={style.accentedButton}>Map</button>              
              </Link>
              <button className={style.button}>Explore</button>
            </div>
          </div>
          <div className={style.cardContainer}>
            {
              <div className="text-[#1868b7] h-[22rem] w-[28rem] p-5 pl-7  border-2 rounded-xl border-cyan-700">
           
                  <div className="relative text-white  font-semibold text-[3.5rem]"> {weatherData?.name}</div>
                  <div className="relative text-white  font-semibold text-[2.5rem]">
                    Temp: {weatherData.main?.temp}
                  </div>
                  <div className=" text-[2rem]">
                    {weatherData?.weather?.map((info) => (
                      <div>{info.description}</div>
                    ))}{" "}
                  </div>
                </div>
           
            }

            <div className={style.infoContainer}>
              <img
                className="h-[2.25rem] rounded-full"
                src="https://lh3.googleusercontent.com/qQj55gGIWmT1EnMmGQBNUpIaj0qTyg4YZSQ2ymJVvwr_mXXjuFiHJG9d3MRgj5DVgyLa69u8Tq9ijSm_stsph8YmIJlJQ1e7n6xj=s64"
                alt=""
              />
              <div className={style.author}>
                <div className={style.name}>OpenWeather API</div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
