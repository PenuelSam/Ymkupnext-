import { useQuery } from "react-query"
import * as apiClient from "../api-Client"
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

export const MyProjects = () => {
    const {data: Projects} = useQuery("fetchProjects", apiClient.fetchProjects,{
        onError: () => {
            console.log("Error fetching hotels")
        }
    })
    if(!Projects){
        return <span>No Projects Found</span>
    }
  return (
    <div className=" md:w-[90%] md:mx-auto h-full  flex flex-col items-center">
        <h1 className="text-center py-10">My Projects</h1>
        <div className="mt-10">
        {
            Projects.map((project, index) => {
                const videos = project.videoUrls
                        return(
                            <div key={index} className="flex items-center gap-4   my-5 w-[500px] bg-[#242323] rounded-[10px]" >
                                <div className="w-[200px] h-[100px]">
                                    {videos.map((url) => (
                                        <video src={url} className="w-full h-full object-cover rounded-tl-[10px] rounded-bl-[10px]"/>
                                    ))}
                                </div>
                                <div className=" flex flex-col h-full w-full gap-5">
                                <h2>{project.name}</h2>
                                <div className="w-full  flex justify-end ">
                                    <Link to={`/edit/${project._id}`}>
                                    <button className="px-5  rounded-[10px] bg-black text-white mx-2 flex items-center gap-3 py-1"><CiEdit fontSize={20}/> Edit</button>
                                    </Link>
                                    <button className="px-5  rounded-[10px] bg-red-700 text-white mx-2 flex gap-3 items-center py-1"><RiDeleteBin6Line fontSize={20}/> Delete</button>
                                </div>
                                </div>
                            </div>
                        )              
            })
        }
        </div>
    </div>
  )
}
