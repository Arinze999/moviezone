import React from "react";
import {
  FaCopyright,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className="text-gray-300 w-full mt-20">
        {/* <div>
          <div className="foot-1">
            <p className="footer-logo">
              <img src={process.env.PUBLIC_URL + "/logo192.png"} alt="" />
            </p>
            <p className="text-lg">MOVIEZONE</p>
          </div>
          <div>
          <p className="text-left text-sm footer-talk">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            fugit accusamus ad laboriosam harum illo? Repudiandae eum odit
            voluptatum reiciendis doloremque fuga quasi iusto fugiat deserunt
            itaque, facere perferendis quos.
          </p>
          </div>
          <div>
            <input type="text" />
            <button>click</button>
          </div>
        </div> */}
        <div>
          {/* <h3 className="text-sm">Contact Developer</h3> */}
          <ul>
            <li>
              <a
                className="flex"
                href="https://wa.me/qr/6UCFRQGKACDJF1"
                target="blank"
              >
                <FaWhatsapp />
                {/* <small className="hidden lg:block">whatsapp</small> */}
              </a>
            </li>
            <li>
              <a
                className="flex"
                href="https://twitter.com/aRinze_999?t=RrfGKbLs61ZySHR0QJOGjw&s=09"
                target="blank"
              >
                <FaTwitter />
                {/* <small className="hidden lg:block">twitter</small> */}
              </a>
            </li>
            <li>
              <a
                className="flex"
                href="https://www.instagram.com/arinze_999?igsh=ODA1NTc5OTg5Nw=="
                target="blank"
              >
                <FaInstagram />
                {/* <small className="hidden lg:block">instagram</small> */}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm">MOVIEZONE 2024</p>
        </div>
        <div>
          <p className=" text-sm flex flex-col justify-center items-center">
            <FaCopyright /> All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
}
