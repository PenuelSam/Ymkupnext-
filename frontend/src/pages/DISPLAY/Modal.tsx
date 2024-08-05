import { useRef } from "react";
import { useQuery } from "react-query"
import * as apiclient from "../../api-Client"
import { Link } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

export const Modal = () => {
    const galleryRef = useRef<HTMLDivElement>(null);

    const {data: Projects} = useQuery("fetchProjects",apiclient.fetchProjects)

    if(!Projects){
        return <></>
    }

    const scroll = (direction: 'left' | 'right') => {
        if (galleryRef.current) {
          const scrollAmount = galleryRef.current.clientWidth;
          if (direction === 'left') {
            galleryRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
          } else {
            galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
          }
        }
      };

  return (
   
    <>
    
    {
        Projects && (
            <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/60 z-[999] w-full h-full flex items-center justify-center">
       
            <button
              onClick={() => scroll('left')}
              className="absolute left-32 md:left-10 z-10 p-2 "
            >
              <IoArrowBackCircleOutline fontSize={50}/>
            </button>
           
            <div className=" w-[900px] md:w-[90%] md:h-[80vh] h-[90vh] mx-auto flex" >
           
                    <div className=" w-full h-full flex overflow-hidden" ref={galleryRef}>
                    {
                        
                        Projects.map((prod) => {
                            const Images = prod.imageUrls
                            return (
                                <Link to={`/image/${prod._id}`}>
                                     
                                  
                                   
                                <div className="w-full h-full flex">
                               
                                {Images.map((url) => (
                                    
                                       <div className="  w-[900px]  h-full ">
                                         <img src={url} alt="" className="w-full h-full object-cover rounded-md" />
                                       </div>
                                    ))}
                                   
                                </div>
                                </Link>
                            )      
                           
                    }   )
                        
                    }
                    </div>
            
            </div>
            <button
              onClick={() => scroll('right')}
              className=" absolute right-32 md:right-10 z-10 p-2"
            >
            <IoArrowForwardCircleOutline fontSize={50}/>
            </button>
        </div>
        )
    }
    </>
  )
}
