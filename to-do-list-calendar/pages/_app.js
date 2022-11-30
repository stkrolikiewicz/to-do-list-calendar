import "../css/style.css";
import "../css/form.css";
import "../css/header.css";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import NewTask from "./new";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>To Do List & Calendar App</title>
                <meta charset="UTF-8" />
                <meta name="title" content="To Do List & Calendar" />
                <meta
                    name="description"
                    content="To do list app synchronized with the Google Calendar API"
                />
                <meta name="author" content="Stanisław Królikiewicz" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <Header />
            <div className="top-bar">
                <div className="nav">
                    <Link href="/">Home</Link>
                    <Link href="/new">Add Task</Link>
                </div>
            </div>
            <div className="grid wrapper">
                <Component {...pageProps} />
            </div>
        </>
    );
}

export default MyApp;
