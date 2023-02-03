import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import L from "leaflet";
import axios from "../axios";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapScreen() {
  const [pageNo, setPageNo] = useState(1);
  const [next, setNext] = useState({});
  const [previous, setPrevious] = useState({});
  const [weatherData, setWeatherData] = useState([]);

  const center = [42.5, 1.5]
  //use effect for getting intial data 
  useEffect(() => {
    (async () => {
      const url = `/city/weather/data?page=${pageNo}&limit=10`;
      const paginatedData = await axios.get(url);
      setWeatherData(paginatedData.data.result);
      console.log(paginatedData.data);
      setNext(paginatedData.data.next);
      setPrevious(paginatedData.data.previous);
    })();
  }, []);
  // this use effect is used for getting data after change in page  no
  useEffect(() => {
    (async () => {
      const url = `/city/weather/data?page=${pageNo}&limit=10`;
      const paginatedData = await axios.get(url);
      setWeatherData(paginatedData.data.result);
      console.log(paginatedData.data);
      setNext(paginatedData.data.next);
      setPrevious(paginatedData.data.previous);
    })();
  }, [pageNo]);
  
  async function getWeatherData() {
    const url = `/city/weather/data?page=${pageNo}&limit=10`;
    const paginatedData = await axios.get(url);
    setWeatherData(paginatedData.data.result);
    console.log(paginatedData.data);
    setNext(paginatedData.data.next);
    setPrevious(paginatedData.data.previous);
  
  }

  setInterval(() => {
    getWeatherData();
  }, 300000);

  return (
    <div>
      <div className="flex justify-center ">
        <MapContainer center={center} zoom={4} className="w-[90vw] h-[60vh]">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {weatherData?.map((data) => {
            return (
              <Marker position={[data.coord.lat, data.coord.lon]}>
                <Popup>
                  {data.main.temp}
                  <br />
                  {data.name}
                  <br />
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      <div class="flex flex-col items-center mt-6">
        <span class="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span class="font-semibold text-gray-900 dark:text-white">
            {pageNo}
          </span>{" "}
          to <span class="font-semibold text-gray-900 dark:text-white">10</span>{" "}
          of <span class="font-semibold text-gray-900 dark:text-white">30</span>{" "}
          Entries
        </span>

        <div class="inline-flex mt-2 xs:mt-0">
          {previous?.page && (
            <button
              onClick={() => setPageNo(pageNo - 1)}
              class="px-4 py-2 text-lg font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Prev
            </button>
          )}

          {next?.page && (
            <button
              onClick={() => setPageNo(pageNo + 1)}
              class="px-4 py-2 text-lg font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MapScreen;
