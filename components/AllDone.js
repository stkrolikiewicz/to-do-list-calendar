import Image from "next/image";
import done from "../assets/done.png";

const AllDone = (props) => {
    return (
        <div id="all-done">
            <div>
                <p>{props.sign}</p>
            </div>
            <Image src={done} className={"image"} />{" "}
        </div>
    );
};

export default AllDone;
