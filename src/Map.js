import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoicGhlZWJlbHkiLCJhIjoiY2x2NnAxOXNyMDA4czJpcnRueTZ4ZjBzMSJ9.fprS8AwIVovrJzr6mN52jQ";

export default function Map(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [lng, setLng] = useState(props.coordinates.lon);
  const [lat, setLat] = useState(props.coordinates.lat);
  const [zoom, setZoom] = useState(7);
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
      style: "mapbox://styles/pheebely/clgwfsrps009q01qy55zzdphw",
      center: [lng, lat],
      zoom: zoom,
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

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
