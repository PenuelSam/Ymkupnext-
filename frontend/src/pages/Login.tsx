import { useForm } from "react-hook-form"
import { LOGO } from "../component/LOGO";
import * as apiClient from "../api-Client"
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export type RegisterType = {
    email: string;
    password: string;
}

export const Login = () => {
    const navigate = useNavigate()
    const {register, handleSubmit, formState, reset} = useForm<RegisterType>()
    const {errors} = formState

    const mutation = useMutation(apiClient.login, {
        onSuccess: (data) => {
            console.log("registered", data)
            reset()
            navigate("/add-project")
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
        //console.log('submitted', data)
    })

  return (
    <div className="flex md:flex-col">
         <LOGO />
    <div className=" w-[100%] h-screen md:h-[60vh] bg-[#1b1b1b] md:bg-black text-black flex items-center justify-center ">
       
        <form onSubmit={onSubmit} className=" bg-black text-slate-100 p-3 rounded-[10px] w-[350px] flex flex-col gap-3">
            <h1 className="text-2xl md:text-lg capitalize text-center font-IFkicaMedium">Sign In</h1>
            <label className="flex flex-col gap-2 font-IFkicaLight">
                Email:
                <input type="email" className="bg-transparent border border-[#383838] rounded-[5px] pl-1 outline-none text-[12px]" {...register("email",{
                    required: true,
                    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`@]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/             
                })}/>
            </label>
            <p className="text-sm text-red-500">{errors.email?.message}</p>
            <label className="flex flex-col gap-2 font-IFkicaLight">
                Password:
                <input type="password" className="bg-transparent border border-[#383838] rounded-[5px] pl-1 outline-none text-[12px]" {...register("password",{
                    required: true,
                    minLength: 6
                })}/>
            </label>
            <p className="text-sm text-red-500">{errors.password?.message}</p>
            <div className="flex  items-center justify-center">
                <button type="submit" className="bg-[#383838] text-slate-100 w-full h-[30px] rounded-md font-IFkicaLight">Sign in</button>
            </div>
        </form>
    </div>
    </div>
  )
}
