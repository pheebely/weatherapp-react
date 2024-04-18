import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoicGhlZWJlbHkiLCJhIjoiY2s2aGZoZTR4MDJsdTNlcXI2NnI1bXhuaiJ9.l0hhT8MPnRuT8LuyPP8Ovw";

export default function App(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [lng, setLng] = useState(props.coordinates.lon);
  const [lat, setLat] = useState(props.coordinates.lat);
  const [zoom, setZoom] = useState(9);
  const apiKey = "5b2c8972a4cffca524e4b2ca8fbed7f0";

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
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  }, [props.coordinates, lng, lat, zoom]);

  useEffect(() => {
    if (loaded) {
      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });

      map.current.addSource("precipitation", {
        type: "raster",
        tiles: [
          "https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=" +
            apiKey,
        ],
        tileSize: 256,
      });

      map.current.addLayer({
        id: "precip",
        type: "raster",
        source: "precipitation",
        paint: {
          "raster-opacity": 0.5,
        },
      });
    }
  }, [loaded]);

  // Include lng and lat in the dependency array
  //useEffect will rerun whenever lng and lat change,
  //ensuring that map.current.setCenter([lng, lat]) is called with
  //the updated values from the useState hooks.

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
