import Link from "next/link";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBars } from "@fortawesome/free-solid-svg-icons";

function Header() {
    const moveSideBar = () => {
        const sideBar = document.getElementById("sidebar");
        if (sideBar.classList.contains("isHidden")) {
            // sideBar__trigger.innerText = "CLOSE";
            sideBar.classList.remove("isHidden");
        } else {
            // sideBar__trigger.innerText = "OPEN";
            sideBar.classList.add("isHidden");
        }
    };

    return (
        <header id="navbar">
            <nav>
                <button
                    className="nav-item"
                    id="sidebar__trigger"
                    onClick={moveSideBar}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <ul>
                    <li id="tasks-tab" className="nav-item">
                        <Link href="/">
                            <FontAwesomeIcon icon={faHouse} className="home" />
                        </Link>
                    </li>
                    {/* <li id="calendar-tab" className="nav-item not-active">
                        <Link href="/">calendar</Link>
                    </li> */}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
