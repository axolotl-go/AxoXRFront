import React from "react";
import { BadgePlus, Bolt, CircleUser, House } from "lucide-react";

const Navdata = () => {
  return [
    { linkName: "Home", link: "/", icon: <House /> },
    { linkName: "New Project", link: "/new", icon: <BadgePlus /> },
    { linkName: "Account", link: "/account", icon: <CircleUser /> },
    { linkName: "Config", link: "/config", icon: <Bolt /> },
  ];
};

export default Navdata;
