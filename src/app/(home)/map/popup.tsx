"useClient";

import s from "./_s.module.css";
import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import Markers from "./markers";

export default function Popup(props) {
  const { closePopup } = props;
  const containerStyle = { width: "100%", height: "100%" };
  const defaultZoom = 12;
  const center = { lat: 25.209143416862815, lng: 55.28045000457731 };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (!isLoaded) return null;

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (e.currentTarget != e.target) return;
    closePopup();
    const $cursor = document.getElementById("cursor") as any;
    $cursor.classList.remove("close", "v");
  };

  const onEnter = () => {
    const $cursor = document.getElementById("cursor") as any;
    $cursor.classList.remove("v");
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
          <Markers />
        </GoogleMap>
      </div>
    </div>
  );
}
