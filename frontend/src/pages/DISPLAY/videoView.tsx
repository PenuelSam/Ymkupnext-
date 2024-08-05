import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from "../../api-Client"
import { Index } from "../../component/nav";
export const VideoView = () => {
        const {videoId} = useParams();
        const {data: Project} = useQuery("fetchProjectById", () => apiClient.fetchProjectById(videoId as string),{
            enabled: !!videoId
        })

        if(!Project){
            return <></>
        }

    return (
        <div>
            <Index />
        <div className="container mx-auto h-screen flex flex-col md:w-[95%]   md:relative md:top-20  justify-center items-center">
            <div className="flex justify-center items-center gap-4">
               {
                Project?.videoUrls.map((vid) => (
                    <div>
                        <div className="flex items-center gap-4 my-2">
                            <div className="w-[50px] h-[50px]"><video src={vid} className="w-full h-full object-cover rounded-[50%]"/></div>
                            <div className="w-[10px] h-[1px] bg-white"></div>
                            <h1 className="text-[2rem] font-bold capitalize font-IFkicaMedium">{Project.name}</h1>
                        </div>
                    <div className="w-full h-[700px]">
                        <video src={vid} controls className="w-full h-full object-cover"/>
                    </div>
                    </div>
                   
                ))
               }     
            </div>
        </div>
        </div>
    )
}