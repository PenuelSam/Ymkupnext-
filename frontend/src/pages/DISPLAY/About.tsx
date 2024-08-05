import { IoLogoInstagram } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Index } from "../../component/nav";

export const About = () => {
  return (
    <div className="flex  ">
        <Index />
       <div className="flex flex-col gap-10  ml-10 my-[20rem]">
       <h1 className="text-[20rem] md:text-[5rem] sm:text-[3rem] xsm:text-[2rem] uppercase font-IFkicaMedium ">About</h1>
        <div className="flex flex-col gap-10">
            <p className="font-IFkicaMedium text-[1.5rem] md:text-[1rem] sm:text-[0.8rem] xsm:text-[0.5rem]">YMKUPNEXT! IS YOUR FAVOURITE DIRECTOR'S FAVOURITE DIRECTOR</p>
            <div className="flex items-center gap-5">
            <p className="text-[1.5rem] md:text-[1rem] sm:text-[0.8rem] xsm:text-[0.5rem]">contactymk30@gmail.com</p>
            <div className="w-[0.5px] h-10 md:h-5 bg-white"></div>
           <Link to="https://www.instagram.com/ymkupnext" target="_blank">
           <IoLogoInstagram className="text-[30px] md:text-[20px]"/>
           </Link>
            </div>
        </div>
       </div>
    </div>
  )
}
