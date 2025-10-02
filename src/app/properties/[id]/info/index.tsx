"use client";

import s from "./_s.module.css";
import { useState } from "react";
import GymI from "@/assets/icons/gym.svg";
import PoolI from "@/assets/icons/pool.svg";
import PlaygroundI from "@/assets/icons/playground.svg";
import CommunityI from "@/assets/icons/community.svg";
import FloorsI from "@/assets/icons/floors.svg";
import SchoolI from "@/assets/icons/school.svg";

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
        <p>{price > 0 || "Price upon request"}</p>
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
  const { amenity } = props;
  return (
    <>
      <div className={s.amenity}>
        {amenity == "gym" && <GymI />}
        {amenity == "access to playground" && <PlaygroundI />}
        {amenity == "pool" && <PoolI />}
        {amenity == "heated floors" && <FloorsI />}
        {amenity == "gated community" && <CommunityI />}
        {amenity == "school district" && <SchoolI />}
        <h4>{amenity}</h4>
      </div>
    </>
  );
};

export default function Info(props: any) {
  const { prp } = props;
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <nav className={s.info_n}>
        {tabs.map((tab) => (
          <div
            className={activeTab == tab ? s.active : ""}
            onClick={() => setActiveTab(tab)}
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
        {activeTab == "location" && <Location location={prp.location} />}
        {activeTab == "get in contact" && <Contact />}
        {activeTab == "property details" && (
          <div className={s.amenities}>
            <h3>AMENTIES</h3>
            <div>
              {prp.amenities.map((amen) => (
                <Amenity amenity={amen} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
