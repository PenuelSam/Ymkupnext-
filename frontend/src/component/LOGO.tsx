import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export const LOGO = () => {
  return (
    <div className="w-full h-screen md:h-[40vh] bg-black  text-white flex items-center justify-center relative"> 
        <Link to="/" className="absolute top-5 left-5">
            <IoArrowBackCircleOutline fontSize={50} color="#838181" className="" />
        </Link>
        <h1 className="text-[5rem] font-IFkicaMedium md:text-[3rem] sm:text-[2.5rem] xsm:text-[1.5rem] ">Ymkupnext!</h1>
    </div>
  )
}
