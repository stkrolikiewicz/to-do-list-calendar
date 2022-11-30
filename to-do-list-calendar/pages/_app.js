import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>To Do List & Calendar App</title>
            </Head>

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
