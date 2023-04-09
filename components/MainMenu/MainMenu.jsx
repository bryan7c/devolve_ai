import { useRef } from "react";
import Link from "next/link";
import style from "./MainMenu.module.css";

export default function MainMenu() {
  const menuRef = useRef(null);

  function toggleMenu() {
    const menu = menuRef.current;
    if (menu.style.left === "-250px") {
      menu.style.left = "0";
    } else {
      menu.style.left = "-250px";
    }
  }

  const menuList = ["Início", "Perfil", "Mensagens", "Configurações"];

  return (
    <aside ref={menuRef} className={style.menu}>
      <div className={style.icon} onClick={toggleMenu}>
        <span className={style.line}></span>
        <span className={style.line}></span>
        <span className={style.line}></span>
      </div>
      <ul className={style.items}>
        {menuList.map((item, index) => (
          <li key={index}>
            <Link href="/">
              <i className="fas fa-home"></i> {item}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}