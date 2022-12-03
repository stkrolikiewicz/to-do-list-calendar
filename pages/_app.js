import "../css/style.css";
import "../css/form.css";
import "../css/header.css";
import "../css/newTask.css";
import "../css/taskList.css";
import "../css/sidebar.css";
import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

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
            <main>
                <Sidebar />
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default MyApp;
