"use client";

import s from "./_s.module.css";
import { useState } from "react";
import GymI from "@/assets/icons/amenities/gym.svg";
import PoolI from "@/assets/icons/amenities/pool.svg";
import PlaygroundI from "@/assets/icons/amenities/playground.svg";
import CommunityI from "@/assets/icons/amenities/community.svg";
import FloorsI from "@/assets/icons/amenities/floors.svg";
import SchoolI from "@/assets/icons/amenities/school.svg";
import PetsI from "@/assets/icons/amenities/pets.svg";
import StorageI from "@/assets/icons/amenities/storage.svg";
import EventsI from "@/assets/icons/amenities/events.svg";
import SpaI from "@/assets/icons/amenities/spa.svg";
import SportsI from "@/assets/icons/amenities/sports.svg";
import ParkingI from "@/assets/icons/amenities/parking.svg";
import AcI from "@/assets/icons/amenities/ac.svg";
import formatPrice from "@/utils/formatPrice";

const tabs = ["overview", "location", "property details", "get in contact"];

const Overview = (props: any) => {
  const { bedrooms, bathrooms, area, price } = props;
  return (
    <div className={s.ov}>
      <div>
        <h3>BEDROOMS</h3>
        <p>{bedrooms} Bedrooms</p>
      </div>
      <div>
        <h3>BATHROOMS</h3>
        <p>{bathrooms} Bathrooms</p>
      </div>
      <div>
        <h3>AREA</h3>
        <p>{area} sq. ft.</p>
      </div>
      <div>
        <h3>PRICE</h3>
        <p>{formatPrice(price)}</p>
      </div>
    </div>
  );
};

const Location = (props: any) => {
  const { location } = props;
  return (
    <div className={s.map}>
      <iframe
        title="Google Map"
        src={location}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

const Contact = () => {
  return (
    <div className={s.contact}>
      <div>
        <h3>CONTACT US</h3>
        <a href="tel:+97143451111">+971 4 345 1111</a>
      </div>
      <div>
        <h3>EMAIL US</h3>
        <a href="mailto:leasing@drec.ae">leasing@drec.ae</a>
      </div>
    </div>
  );
};

const Amenity = (props: any) => {
  let { amenity } = props;
  amenity = amenity?.toLowerCase();

  return (
    <>
      <div className={s.amenity}>
        {amenity == "gym" && <GymI />}
        {amenity == "access to playground" && <PlaygroundI />}
        {amenity == "pool" && <PoolI />}
        {amenity == "heated floors" && <FloorsI />}
        {amenity == "gated community" && <CommunityI />}
        {amenity == "school district" && <SchoolI />}
        {amenity == "parking" && <ParkingI />}
        {amenity == "sports courts" && <SportsI />}
        {amenity == "spa" && <SpaI />}
        {amenity == "sauna" && <SpaI />}
        {amenity == "steam" && <SpaI />}
        {amenity == "pets allowed" && <PetsI />}
        {amenity == "events hall" && <EventsI />}
        {amenity == "central ac" && <AcI />}
        {amenity == "storage" && <StorageI />}
        <h4>{amenity}</h4>
      </div>
    </>
  );
};

export default function Info(props: any) {
  const { prp } = props;
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const amenities =
    prp.amenities?.items?.map((item) => item._system_.name) || [];

  return (
    <>
      <nav className={s.info_n}>
        {tabs.map((tab) => (
          <div
            className={activeTab == tab ? s.active : ""}
            onClick={() => setActiveTab(tab)}
            key={tab}
          >
            {tab}
          </div>
        ))}
      </nav>
      <div className={s.info_c}>
        {activeTab == "overview" && (
          <Overview
            bedrooms={prp.bedrooms}
            bathrooms={prp.bathrooms}
            area={prp.area}
            price={prp.price}
          />
        )}
        {activeTab == "location" && <Location location={prp.googleMapsLink} />}
        {activeTab == "get in contact" && <Contact />}
        {activeTab == "property details" && (
          <div className={s.amenities}>
            <h3>AMENTIES</h3>
            <div>
              {amenities.map((amen) => (
                <Amenity amenity={amen} key={amen} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
