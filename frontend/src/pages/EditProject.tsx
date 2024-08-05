import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom"
import * as apiClient from "../api-Client"
import { ProjectFormData } from "./addProject";
import { useForm } from "react-hook-form";
import { RiVideoUploadLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useEffect } from "react";

export const EditProject = () => {
    const {projectId} = useParams();
  

    const {register , handleSubmit, watch, setValue, reset} = useForm<ProjectFormData>();
    const {data: Project} = useQuery("fetchProjectById", () => apiClient.fetchProjectById(projectId as string),
    {
        enabled: !!projectId
    })

    useEffect(() => {
        reset(Project)
    }, [Project, reset])

    const updateMutation = useMutation(
        ({ projectId, formData }: { projectId: string; formData: ProjectFormData }) => 
            apiClient.updateProjectById(projectId, formData),{
                onSuccess: () => {
                    console.log("Project updated successfully");
                    },
            }
    )

    const {isLoading} = updateMutation
    const existingImages = watch("imageUrls")
    const existingVideos = watch("videoUrls")

    console.log({existingImages})
    console.log(existingVideos)
  

    const deleteImage = (event:  React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl: string) => {
        event.preventDefault();
        setValue("imageUrls", existingImages.filter((url) => url !== imageUrl))
    }

    const deleteVideo = (event:  React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl: string) => {
        event.preventDefault();
        setValue("videoUrls", existingVideos.filter((url) => url !== imageUrl))
    }

      

    const onSubmit = handleSubmit((data: ProjectFormData) => {
        if(projectId){
            updateMutation.mutate({projectId, formData: data})
        }
    })


  return (
    <div className="max-w-[990px] mx-auto my-5 flex flex-col items-center gap-5">
        <Link to="/"><h1>Home</h1></Link>
        <div className="w-full h-full mb-10 md:mb-3 md:w-[90%] bg-[#333] text-[#f3f3f3] p-5 rounded-lg">
               <form action="" className=" py-10" onSubmit={onSubmit}>
               <label htmlFor="" className="flex flex-col items-start my-5">
                <h1 className="text-[20px]">Project name :</h1>
                <input type="text"  className="border bg-transparent border-black outline-none text-[#f3f3f3] placeholder:text-[#f3f3f3] pl-1 mt-3 w-full h-[40px] rounded-[5px]"  {...register("name")}/>
               </label>

               <div>
                <h1 className="text-[20px]">Upload Video: </h1>
                
               <div  className="flex flex-col items-center justify-center my-5 border border-black rounded-[5px] h-[200px] gap-3">
               {
                    existingVideos && (
                        <div>
                        {existingVideos.map((url, index) => (
                            <div key={index} style={{ position: 'relative', display: 'inline-block' }} className="w-[200px] h-[100px] flex">
                                <video src={url} controls className="w-full h-full object-cover rounded-[5px]" />
                        <div>
                        <button onClick={(event) => deleteVideo(event, url)}>
                <MdDeleteOutline fontSize={20}   className="absolute top-0 right-0 cursor pointer"/>
                </button>
                        </div>
                        </div>
                        ))}
                        </div>
                    )
                }
                
                <input type="file" id="videoFiles" placeholder="Project Title" className="border h-[40px] hidden"  {...register("videoFiles")}  />
                <label htmlFor="videoFiles"><RiVideoUploadLine fontSize={40} className=" cursor-pointer"/>
                </label>               
               </div>
               </div>

                <div>
                    <h1 className="text-[20px]">Upload Images: </h1>
               <div className="flex flex-col items-center gap-3 justify-center my-5 border border-black rounded-[5px] h-[200px]">
               {
                existingImages && (
                    <div className="flex gap-3 items-center"> 
                    {existingImages.map((url, index) => (
                        <div key={index} style={{ position: 'relative', display: 'inline-block' }} className="w-[100px] h-[100px]">
                        <img key={index} src={url}  className="w-full h-full rounded-[5px] object-cover"/>
                        <button onClick={(event) => deleteImage(event, url)}>
                        <MdDeleteOutline fontSize={20}   className="absolute top-0 right-0 cursor pointer"/>
                        </button>
                               
                        </div>
                    ))}
                </div>
                )
               }
                
                <input type="file" multiple id="imageFiles" placeholder="Project Title"   className=" hidden" {...register("imageFiles")}
                accept="image/*"
                />
                <label htmlFor="imageFiles"><FaImages fontSize={40} className="cursor-pointer"/></label>
               </div>
               </div>
               <div className="w-full flex justify-end mt-5">
                <button type="submit" className="bg-black text-white px-10 py-3 rounded-md">{isLoading ? "Updating..." : "Update"}</button>
               </div>
               </form>  
            </div>
    </div>
  )
}
