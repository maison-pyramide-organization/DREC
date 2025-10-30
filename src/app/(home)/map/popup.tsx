"useClient";

import { useState } from "react";
import s from "./_s.module.css";
import {
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import places from "@/data/places";

export default function Popup(props: any) {
  const { closePopup } = props;
  const containerStyle = { width: "100%", height: "100%" };
  const defaultZoom = 10;
  const center = { lat: 25.024442, lng: 55.123428 };
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (e.currentTarget == e.target) closePopup();
    const $cursor = document.getElementById("cursor") as any;
    $cursor.classList.remove("close",'v');
  };

  const onEnter = (e) => {
    const $cursor = document.getElementById("cursor") as any;
    $cursor.classList.remove("v" );
  };
  const onLeave = () => {
    const $cursor = document.getElementById("cursor") as any;
    $cursor.classList.add("v");
  };
  return (
    <div className={s.popup} onClick={handleClick}>
      <div className={s.map_} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={defaultZoom}
        >
          {places.map((p) => (
            <Marker
              key={p.name}
              position={{ lat: p.lat, lng: p.lng }}
              title={p.name}
              onClick={() => {
                p === selectedPlace
                  ? setSelectedPlace(null)
                  : setSelectedPlace(p.name);
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
}
