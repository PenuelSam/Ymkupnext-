import { useQuery } from "react-query"
import * as apiclient from "../../api-Client"
import { Index } from "../../component/nav"
import { Modal } from "./Modal"
import { IoClose } from "react-icons/io5";
import { useState } from "react";


export const Images = () => {
   const [modal, setModal] = useState(false)
    

    const {data: Projects} = useQuery("fetchProjects",apiclient.fetchProjects)

    if(!Projects){
        return <></>
    }

    

    
 
      
      



    //const imageLength = Projects.map((prod) => prod.imageUrls )
//const totalLength = imageLength.length



    

  return (
    <div>
        {modal && <Modal />}
        {modal && (
            <div className="fixed right-5 top-5 z-[999] cursor-pointer " onClick={() => setModal(!modal)}><IoClose fontSize={40}/></div>
        )}
        
        {!modal && <Index />}
        <div className=" h-full top-[10rem] relative flex flex-col items-start justify-between">
       
        <div className=" flex  h-[40rem] md:h-[20rem] items-center gap-5 ml-10 md:ml-5 md:w-[90%] md:justify-center">
            {/*<h1 className="text-[15rem] font-IFkicaBold">{totalLength < 10 ? `0${totalLength}` : totalLength} -</h1>*/}
            <h1 className="text-[15rem] md:text-[6rem]  sm:text-[3.5rem] xsm:text-[3rem] md:flex md:justify-center font-bold uppercase font-IFkicaMedium ">Images</h1>
        </div>
        
      
        {
            Projects && (
                <div className=" w-full flex flex-col"  >
      
                
                    {
                        
                        Projects.map((prod) => {
                            const Images = prod.imageUrls
                            return (
                                <div onClick={() => setModal(!modal)} className="cursor-pointer">
                                     
                                     <p className="text-[3rem] md:text-[1.5rem] my-5 w-[95%] mx-auto font-IFkicaLight">{`${prod.name}`}</p>
                                   
                                <div className="w-[95%] mx-auto grid grid-cols-3 md:grid-cols-2 gap-4">
                               
                                {Images.map((url) => (
                                    
                                       <div className="  w-full my-2">
                                         <img src={url} alt="" className="w-full rounded-md" />
                                       </div>
                                    ))}
                                   
                                </div>
                                </div>
                            )      
                           
                    }   )
                        
                    }
                
                </div>
            )
        }


        </div>
    </div>
  )
}
