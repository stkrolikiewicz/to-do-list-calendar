// import Head from "next/head";
import Link from "next/link";

function Header() {
    return (
        <header id="navbar">
            <nav>
                <button id="sidebar__trigger" onClick="moveSideBar()">
                    <div id="sidebar-icon">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </button>
                <ul>
                    <li id="tasks-tab" className="nav-item active">
                        <Link href="/">to do list</Link>
                    </li>
                    <li id="calendar-tab" className="nav-item not-active">
                        <Link href="/">calendar</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
