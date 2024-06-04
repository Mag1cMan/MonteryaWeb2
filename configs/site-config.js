import {
  FaGithub,
  FaDev,
  FaLinkedin,
  FaQuora,
  FaTwitter
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const siteConfig = {
  copyright: `Copyright © ${new Date().getFullYear()} Monterya. All Rights Reserved.`,
  author: {
    name: "Monterya",
    accounts: [
      {
        url: "https://twitter.com/Monterya",
        label: "Twitter Account",
        type: "twitter",
        icon: <FaTwitter />
      },
      {
        url: "mailto:monteryaofficial@gmail.com",
        label: "Monterya",
        type: "gray",
        icon: <FiMail />
      }
    ]
  }
};

export default siteConfig;
