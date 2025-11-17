import s from "./_s.module.css";
import places from "@/data/places";
import { InfoWindow, MarkerF } from "@react-google-maps/api";
import { useState } from "react";

export default function () {
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  return (
    <>
      {places.map((p) => (
        <MarkerF
          key={p.name}
          position={{ lat: p.lat, lng: p.lng }}
          title={p.name}
          onClick={() => {
            p === selectedPlace ? setSelectedPlace(null) : setSelectedPlace(p);
          }}
        />
      ))}
      {selectedPlace && (
        <InfoWindow
          position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
          zIndex={1}
          options={{
            pixelOffset: {
              width: 0,
              height: -40,
            },
          }}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <div className={s.infoW}>
            <h3>{selectedPlace.name}</h3>
            <a target="_blank" href={selectedPlace.gml}>
              View google maps
            </a>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
