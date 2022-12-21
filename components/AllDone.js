import Image from "next/image";
import done from "../assets/done.png";

const AllDone = (props) => {
    return (
        <div id="all-done">
            <p >{props.sign}</p>
            <Image src={done} height={300}/>  
        </div>
    )
}

export default AllDone;