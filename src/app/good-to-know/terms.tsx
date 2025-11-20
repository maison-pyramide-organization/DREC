"use client";

import s from "./_s.module.css";
import Image from "next/image";
import Igtk3 from "@/assets/images/gtk/gtk3.png";
import { useEffect, useState } from "react";
import Iclose from "@ic/close.svg";

export default function Terms() {
  const [opened, setOpened] = useState(false);

  const open = () => {
    setOpened(true);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    setOpened(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const popup = document.getElementById("popup") as HTMLElement;
    const stop = (e) => {
      e.stopPropagation();
    };

    popup.addEventListener("wheel", stop);
    // popup.addEventListener("scroll", (e) => e.stopPropagation());
    // popup.addEventListener("touchmove", (e) => e.stopPropagation());
    return () => popup.removeEventListener("wheel", stop);
  }, []);

  return (
    <>
      <section className={s.g3}>
        <h2 a-t="r">
          <div>
            click here <span>to view</span>
          </div>
          <div>
            <span>our terms</span>& conditions
          </div>
        </h2>
        <figure a-i="r" onClick={open}>
          <Image src={Igtk3} alt="" />
        </figure>
      </section>

      <div className={`${s.popup} ${opened ? s.active : ""}`}>
        <button onClick={close}>
          <Iclose />
        </button>
        <div id="popup">
          <h2>Terms & Conditions</h2>
          <p>
            Please read these ‘Terms and conditions’ carefully. These are
            general terms and conditions of Dubai Real Estate Centre (the
            ‘Company’) governing your access and use of the ‘website’. If you do
            not agree with them, please do not use the website. By continuing to
            use the website, contents and / or any of the services shown on the
            site, you agree to be bound by these terms and conditions.
            <br />
            <br />
            <strong>Acceptance</strong>
            <br />
            You undertake that your use of the website (which includes all
            contents on the screen, web links, emails and other services and
            information, along with the subsequent changes in due course
            [‘content’]) means you fully agree to the terms and conditions. Your
            eligibility to the products and services offered on the website is
            subject to Dubai Real Estate Centre’s determination and acceptance.
            You also undertake that your use of the website shall not:
            <br />
            <br />
            <strong>Violate the respective applicable laws</strong>
            <br />
            Harm the public image of the website and will only be used for all
            defined, permitted and productive means Represent any fraudulent
            business activity; and that your use of the website and any
            consequential business decision will be at your own risk
            <br />
            <br />
            Copyright © Dubai Real Estate Centre. All Rights Reserved.
            <br />
            <br />
            Copyright in the pages and in the screens displaying the pages,
            along with the information and material therein and in their
            arrangement, is owned by Dubai Real Estate Centre unless otherwise
            indicated. Re-use of any content is strictly prohibited unless
            otherwise stated.
            <br />
            <br />
            <strong>Trademarks</strong>
            <br />
            Dubai Real Estate Centre, its subsidiaries, affiliates, contractors
            and / or participating corporations, are the owners of the trade and
            service marks appearing on this website and all rights are reserved
            in respect of such trade and service marks.
            <br />
            <br />
            <strong>No warranty</strong>
            <br />
            The Company does not warrant the accuracy, correctness, completeness
            and acceptance of the content and / or any other information and /
            or materials available on the site. No warranties of any kind are
            given, whether express, implied or by laws, including but not
            limited to the warranties of non-infringement of third party rights,
            security, fitness, quality, compatibility, accuracy and safety.
            <br />
            <br />
            <strong>Limitation of liability</strong>
            <br />
            <br />
            Under no circumstance will Dubai Real Estate Centre be liable for
            any features, functions (programming errors, other errors, linking,
            rectification of the errors, updates, omissions), and safety
            mechanisms built into the website (including loss / damage of any
            personal data / information, or any loss whether foreseen,
            foreseeable, known or otherwise). Dubai Real Estate Centre and / or
            any of its affiliates will not be liable for any consequential,
            incidental damage, whether direct or indirect, arising out of the
            use of the website.
            <br />
            <br />
            Contents of the website have not been investigated or verified and
            are not continuously monitored. The Company reserves all rights to
            disclose information as it deems necessary to satisfy any applicable
            law, or refuse to disclose, edit, or to remove any content or
            information or materials, in whole or in part, at its sole
            discretion.
            <br />
            <br />
            <strong>Submission</strong>
            <br />
            <br />
            All information submitted to Dubai Real Estate Centre via this site
            shall be deemed (and remain) the property of Dubai Real Estate
            Centre, which shall be free to use, for any purpose, any ideas,
            concepts, know-how or techniques contained in information, a visitor
            to this site provides Dubai Real Estate Centre through this site.
            Dubai Real Estate Centre shall not be subject to any obligations of
            confidentiality or privacy regarding information submitted, except
            as agreed by Dubai Real Estate Centre or as otherwise specifically
            agreed or required by law.
            <br />
            <br />
            <strong>Variations</strong>
            <br />
            <br />
            These terms and conditions are subject to change at any time without
            notice and even after any such change, will not alter the obligation
            of the user.
            <br />
            <br />
            <strong>Governing laws and jurisdiction</strong>
            <br />
            <br />
            Your use of the Company website, its content, services and / or any
            information / material posted or available on this website, shall be
            governed by the law of the United Arab Emirates and you agree to
            submit to the exclusive jurisdiction of the courts of the United
            Arab Emirates.
            <br />
            <br />
            <strong>Disclaimer</strong>
            <br />
            <br />
            No representation or warranty of any kind whatsoever is given,
            express or implied, for the accuracy, correctness, completeness,
            fitness to the purpose or non-infringement of any content or any
            other information or material posted or available on the website.
            Any tangible or intangible harm / damage or any consequential or
            incidental damage thereof of any kind to the user, by accessing the
            website and / or any breach of the undertaking, is entirely at the
            user's own risk.
          </p>
        </div>
      </div>
    </>
  );
}
