import React from "react";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
const Footer = () => {
  return (
    <div className="bg-[#839e6a] py-5 mt-10">
      <div className="mx-auto text-center">
        <div className="flex justify-evenly">
          <div className="text-white">
            <div className="text-xs font-bold mb-2">Contact Us</div>
            <p className="text-xs font-light mb-1">WhatsApp</p>
            <p className="text-xs font-light mb-1">0812 1349 6549</p>
          </div>
          <div className="text-white">
            <div className="text-xs font-bold mb-2">Operational Hours</div>
            <p className="text-xs font-light mb-1">Monday - Friday</p>
            <p className="text-xs font-light mb-1">07.00 - 22.00</p>
            <p className="text-xs font-light mb-1">Saturday - Sunday</p>
            <p className="text-xs font-light mb-1">07.00 - 20.00</p>
          </div>
          <div className="text-white">
            <div className="text-xs font-bold mb-2">Follow Us</div>
            <a
              href="https://www.purwadhika.com/"
              target="_blank"
              rel="noreferrer"
              className="flex flex-row text-xs font-light mb-1 hover:text-[#86C649]"
            >
              <AiFillFacebook size={15} className="mr-1" />
              Facebook
            </a>
            <a
              href="https://www.purwadhika.com/"
              target="_blank"
              rel="noreferrer"
              className="flex flex-row text-xs font-light mb-1 hover:text-[#86C649]"
            >
              <AiFillTwitterCircle size={15} className="mr-1" />
              Twitter
            </a>
            <a
              href="https://www.purwadhika.com/"
              target="_blank"
              rel="noreferrer"
              className="flex flex-row text-xs font-light mb-1 hover:text-[#86C649]"
            >
              <AiFillYoutube size={15} className="mr-1" />
              Youtube
            </a>
          </div>
        </div>
        <div className="text-white text-sm font-semibold my-5">
          &copy; 2023 Xmart. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
