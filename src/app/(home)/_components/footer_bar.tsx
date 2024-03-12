

import { Youtube, Facebook, Linkedin, Github } from "lucide-react";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";


const FooterBar = () => {
  const footerLinks = [
    {
      title: "LEARN",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Start Tutorial", href: "#" },
        { name: "Video Demonstration", href: "#" },
      ],
    },
    {
      title: "BUILD",
      links: [
        { name: "Dashboard", href: "#" },
        { name: "Authencation", href: "#" },
        { name: "Wallet Management", href: "#" },
        { name: "Build React application", href: "#" },
      ],
    },
    {
      title: "NETWORK",
      links: [
        { name: "Join Us", href: "#" },
        { name: "Sponsor", href: "#" },
        { name: "Grants", href: "#" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-black text-white p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Logo and description */}
        {/* <div className="md:col-span-3 h-12"> */}
        <div className="md:col-span-3 h-12 flex flex-col items-center">
          <Image
            src="/images/unitxn.svg" // Assuming your SVG file is named Aptos-logo.svg and located in the public folder
            width={120}
            height={120}
            alt="UniTxn"
          />
          <div className="flex-1 flex items-center justify-end space-x-4">
            <a
              href="/trade"
              className="bg-[#27A750] text-[#FFFFFF] font-bold mt-4 px-5 py-2 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-[#67e2c2]"
            >
              Trade Now
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 md:col-span-9 gap-8">
          {footerLinks.map((column) => (
            <div key={column.title} className="md:col-span-2">
              <h5 className="text-lg mb-4 px-2">{column.title}</h5>
              <ul>
                {column.links.map((link) => (
                  <li key={link.name} className="mt-1">
                    <a
                      href={link.href}
                      className="text-sm hover:text-[#909090] cursor-pointer px-2 py-2 transition-colors duration-300 ease-in-out hover:bg-white/20 hover:rounded-xl hover:shadow-md hover:backdrop-blur-md"
                      style={{ display: "block" }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright and Social icons */}
        {/* <div className="md:col-span-12 flex justify-between items-center mt-8 md:mt-0"> */}
        <div className="md:col-span-12 flex flex-col md:flex-row justify-between items-center mt-12">
          <p className="flex justify-end">
            © 2023 UniTxn. All Rights Reserved.
          </p>
          <div className="flex">
            <a href="#" className="hover:text-gray-300">
              <Github size={20} />
            </a>
            <a href="#" className="hover:text-gray-300 ml-4">
              <FaXTwitter size={20} />
            </a>
            <a href="#" className="hover:text-gray-300 ml-4">
              <Youtube size={20} />
            </a>
            <a href="#" className="hover:text-gray-300 ml-4">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-gray-300 ml-4">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
