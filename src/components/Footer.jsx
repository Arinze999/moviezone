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
        <div>
          <h3 className="text-sm">Contact Developer</h3>
          <ul>
            <li>
              <a
                className="flex"
                href="https://wa.me/qr/6UCFRQGKACDJF1"
                target="blank"
              >
                <FaWhatsapp /><small className="hidden lg:block">whatsapp</small>
              </a>
            </li>
            <li>
              <a
              className="flex"
                href="https://twitter.com/aRinze_999?t=RrfGKbLs61ZySHR0QJOGjw&s=09"
                target="blank"
              >
                <FaTwitter /><small className="hidden lg:block">twitter</small>
              </a>
            </li>
            <li>
              <a
              className="flex"
                href="https://www.instagram.com/arinze_999?igsh=ODA1NTc5OTg5Nw=="
                target="blank"
              >
                <FaInstagram /><small className="hidden lg:block">instagram</small>
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
