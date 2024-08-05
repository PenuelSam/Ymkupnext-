import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { RiVideoUploadLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import * as apiClient from "../api-Client"
import { useState } from "react";

export type ProjectFormData = {
    name: string;
    videoFiles?: FileList;
    imageFiles?: FileList;
    videoUrls: string[];
    imageUrls: string[];
}
export const AddProject = () => {
    const {register , handleSubmit, watch, setValue, reset} = useForm<ProjectFormData>();
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
   
    const mutation = useMutation(apiClient.addProject,{
        onSuccess: (data) => {
            console.log(data);
            reset()
        },
    })

    const  {isLoading} = mutation

   

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.name === 'imageFiles') {
                const files = Array.from(e.target.files || []);
                setImagePreviews(files.map(file => URL.createObjectURL(file)));
            }
            if (e.target.name === 'videoFiles') {
                const files = Array.from(e.target.files || []);
                setVideoPreviews(files.map(file => URL.createObjectURL(file)));
            }
        };
        
    
        const handleDeleteImage = (index: number) => {
            setImagePreviews((prev) => prev.filter((_, i) => i !== index));
            const filesArray = Array.from(watch('imageFiles') || []);
            filesArray.splice(index, 1);
            const dataTransfer = new DataTransfer();
            filesArray.forEach(file => dataTransfer.items.add(file));
            setValue('imageFiles', dataTransfer.files);
        };
    
        const handleDeleteVideo = (index: number) => {
            setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
            const filesArray = Array.from(watch('videoFiles') || []);
            filesArray.splice(index, 1);
            const dataTransfer = new DataTransfer();
            filesArray.forEach(file => dataTransfer.items.add(file));
            setValue('videoFiles', dataTransfer.files);
        };

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
        console.log(data)
    })



  return (
    <div className="w-full h-full bg-black text-white py-20">
        <div className="max-w-[990px] mx-auto my-5 flex flex-col items-center gap-5">
            <h1 className="text-2xl ">Add Project</h1>
       
            <div className="w-full h-full mb-10 md:mb-3 md:w-[90%] bg-[#333] text-[#f3f3f3] p-5 rounded-lg">
               <form action="" className=" py-10" onSubmit={onSubmit}>
               <label htmlFor="" className="flex flex-col items-start my-5">
                <h1 className="text-[20px]">Project name :</h1>
                <input type="text" placeholder="Project Title" className="border bg-transparent border-black outline-none text-[#f3f3f3] placeholder:text-[#f3f3f3] pl-1 mt-3 w-full h-[40px] rounded-[5px]"  {...register("name", {
                    required: true,
                })}/>
               </label>

               <div>
                <h1 className="text-[20px]">Upload Video: </h1>
               <div  className="flex flex-col items-center justify-center my-5 border border-black rounded-[5px] h-[200px] gap-3">
                {videoPreviews.map((url, index) => (
                                    <div key={index} style={{ position: 'relative', display: 'inline-block' }} className="w-[200px] h-[100px] flex">
                                        <video src={url} controls className="w-full h-full object-cover rounded-[5px]" />
                                <div>
                                <MdDeleteOutline fontSize={20}  onClick={() => handleDeleteVideo(index)} className="cursor-pointer"/>
                                </div>
                                </div>
                ))}
                <input type="file" id="videoFiles" placeholder="Project Title" className="border h-[40px] hidden"  {...register("videoFiles",{
                    required: true,
                    onChange: handleFileChange
                })}  />
                <label htmlFor="videoFiles"><RiVideoUploadLine fontSize={40} className=" cursor-pointer"/>
                </label>               
               </div>
               </div>

                <div>
                    <h1 className="text-[20px]">Upload Images: </h1>
               <div className="flex flex-col items-center gap-3 justify-center my-5 border border-black rounded-[5px] h-[200px]">
               
                 <div className="flex gap-3 items-center">
                    {imagePreviews.map((url, index) => (
                        <div key={index} style={{ position: 'relative', display: 'inline-block' }} className="w-[100px] h-[100px]">
                        <img key={index} src={url} alt={`preview ${index}`} className="w-full h-full rounded-[5px] object-cover"/>
                                <MdDeleteOutline fontSize={20}  onClick={() => handleDeleteImage(index)} className="absolute top-0 right-0 cursor pointer"/>
                        </div>
                    ))}
                </div>
                <input type="file" multiple id="imageFiles" placeholder="Project Title"   className=" hidden" {...register("imageFiles", { 
                    required: true, 
                    onChange: handleFileChange
                })}
                accept="image/*"
                />
                <label htmlFor="imageFiles"><FaImages fontSize={40} className="cursor-pointer"/></label>
               </div>
               </div>
               <div className="w-full flex justify-end mt-5">
                <button type="submit" className="bg-black text-white px-10 py-3 rounded-md">{isLoading ? "Adding..." : "Add Project"}</button>
               </div>
               </form>  
            </div>
        </div>
    </div>
  )
}
