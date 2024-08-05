import { Link } from "react-router-dom"
import background from "../../assets/project6.mp4"
import { Index } from "../../component/nav"

export const Homepage = () => {
  return (
    <div className="bg-black relative">
        <Index />
        <div className="w-screen h-full fixed top-0 right-0 left-0 bottom-0">
            <video src={background} autoPlay muted loop className="w-full h-full object-cover" />   
        </div>
        <div className=" relative py-[20rem]  md:py-[15rem] overflow-hidden  container   flex flex-col items-center justify-center px-20 md:px-0">
            <div className=" w-full flex flex-col items-center mx-10 md:mx-0  md:w-[90%]">
            <h1 className="text-[9rem] md:text-[3rem] sm:text-[2.5rem] xsm:text-[1.5rem] flex items-center justify-center  md:w-[90%] font-bold mb-[30rem] md:mb-[15rem] font-IFkicaMedium">Ymkupnext!</h1>
            <div className="flex justify-between   w-full md:w-[90%] items-center ">
                <Link to="/images"><h1 className="text-[5rem] md:text-[2rem] sm:text-[1.5rem] xsm:text-[1rem] font-bold underline font-IFkicaMedium">IMAGES</h1></Link>
                <Link to="/videos"><h1 className="text-[5rem] md:text-[2rem] sm:text-[1.5rem] xsm:text-[1rem] font-bold underline font-IFkicaMedium">VIDEOS</h1></Link>
            </div>
            </div>
        </div>
        
    </div>
  )
}
