import Link from "next/link";
import style from './MainMenu.module.css'

export default function MainMenu() {
    return (
        <li className={style.items}>
            <Link href="/">
                <i className="fas fa-home"></i> Início
            </Link>
        </li>
    )
}