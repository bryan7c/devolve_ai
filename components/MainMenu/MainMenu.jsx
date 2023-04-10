import { useRef } from "react";
import Link from "next/link";
import style from "./MainMenu.module.css";
import { CallMissedOutgoing, Home } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function MainMenu() {

  const menuList = [
    {icon: <Home />,url: "/", label: "Home"},
    {icon: <CallMissedOutgoing  />,url: "/devolucao", label: "Devoluções"}
  ];

  return (
    <aside className={style.menu}>
      <ul className={style.items}>
        {menuList.map((item, index) => (
          <li key={index}>
            <Link href={item.url}>
              <Button variant="text" fullWidth={true} size="medium" startIcon={item.icon}>{item.label}</Button>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}