import { useForm } from "react-hook-form"
import { LOGO } from "../component/LOGO";

import * as apiClient from "../api-Client"
import { useMutation } from "react-query";

export type RegisterType = {
    email: string;
    password: string;
}

export const Register = () => {
    const {register, handleSubmit, formState} = useForm<RegisterType>()
    const {errors} = formState

    const mutation = useMutation(apiClient.register, {
        onSuccess: (data) => {
            console.log("registered", data)
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
        //console.log('submitted', data)
    })

  return (
    <div className="flex">
         <LOGO />
    <div className=" w-[100%] h-screen bg-[#1b1b1b] text-black flex items-center justify-center">
       
        <form onSubmit={onSubmit} className=" bg-black text-white p-3 rounded-[10px] w-[350px] flex flex-col gap-3">
            <h1 className="text-2xl capitalize text-center">Sign Up</h1>
            <label className="flex flex-col gap-2">
                Email:
                <input type="email" className="bg-transparent border border-[#383838] rounded-[5px] pl-1 outline-none" {...register("email",{
                    required: true,
                    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`@]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/             
                })}/>
            </label>
            <p className="text-sm text-red-500">{errors.email?.message}</p>
            <label className="flex flex-col gap-2">
                Password:
                <input type="text" className="bg-transparent border border-[#383838] rounded-[5px] pl-1 outline-none" {...register("password",{
                    required: true,
                    minLength: 6
                })}/>
            </label>
            <p className="text-sm text-red-500">{errors.password?.message}</p>
            <div className="flex  items-center justify-center">
                <button type="submit" className="bg-[#383838] text-slate-100 w-full h-[30px] rounded-md">Signup</button>
            </div>
        </form>
    </div>
    </div>
  )
}
