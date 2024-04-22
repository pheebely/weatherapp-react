import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoicGhlZWJlbHkiLCJhIjoiY2x2NnAxOXNyMDA4czJpcnRueTZ4ZjBzMSJ9.fprS8AwIVovrJzr6mN52jQ";

export default function Map(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [lng, setLng] = useState(props.coordinates.lon);
  const [lat, setLat] = useState(props.coordinates.lat);
  const [zoom, setZoom] = useState(6);
  const apiKey = "73a00877081bd43422bdee0f3022beb5";

  useEffect(() => {
    setLoaded(false); // Reset loaded state when coordinates change
    setLng(props.coordinates.lon); // Update lng state with new coordinates
    setLat(props.coordinates.lat); // Update lat state with new coordinates
  }, [props.coordinates]);

  useEffect(() => {
    if (map.current) {
      map.current.setCenter([lng, lat]);
      map.current.setZoom(zoom);

      return;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/pheebely/clgwfsrps009q01qy55zzdphw",
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 10,
      minZoom: 2,
    });

    map.current.on("load", () => {
      map.current.addSource("precipitation", {
        type: "raster",
        tiles: [
          `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
        ],
        tileSize: 256,
      });

      map.current.addLayer({
        id: "precip",
        type: "raster",
        source: "precipitation",
      });

      // Add navigation control (the +/- zoom buttons)
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      map.current.addControl(new mapboxgl.ScaleControl());
    });
  }, [props.coordinates, lng, lat, zoom]);

  useEffect(() => {
    if (loaded) {
      map.current.on("move", () => {
        setLng(map.getCenter().lng.toFixed(4));
        setLat(map.getCenter().lat.toFixed(4));
        setZoom(map.getZoom().toFixed(2));
      });
    }
  }, [loaded]);

  // Include lng and lat in the dependency array
  //useEffect will rerun whenever lng and lat change,
  //ensuring that map.current.setCenter([lng, lat]) is called with
  //the updated values from the useState hooks.

  const precipColorStops = [
    { precipmm: 0, color: "rgba(225, 200, 100, 0.1)" },
    { precipmm: 0.1, color: "rgba(200, 150, 150, 0.1)" },
    { precipmm: 0.2, color: "rgba(150, 150, 170, 0.1)" },
    { precipmm: 0.5, color: "rgba(120, 120, 190, 0.1)" },
    { precipmm: 1, color: "rgba(110, 110, 205, 0.3)" },
    { precipmm: 10, color: "rgba(80,80, 225, 0.5)" },
    { precipmm: 140, color: "rgba(20, 20, 255, 0.6)" },
  ];
  function createLegend() {
    // console.log(precipColorStops);
    return precipColorStops.map(function (stop, index) {
      return (
        <div
          className="col legend"
          key={index}
          style={{ backgroundColor: stop.color }}
        >
          <span>{stop.precipmm}</span>
        </div>
      );
    });
  }

  return (
    <div className="map">
      <div className="p-3 row justify-content-center map-legend">
        <h3>Precipitation Map (mm)</h3>
        <div className="row align-items-center mx-3 pt-3">{createLegend()}</div>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
