import { useQuery } from "react-query"
import * as apiclient from "../../api-Client"
import { Index } from "../../component/nav"
import { Link } from "react-router-dom"

export const Videos = () => {
    const {data: Projects} = useQuery("fetchProjects",apiclient.fetchProjects,{
        // cacheTime: 1000 * 60 * 10, // 10 minutes
        // staleTime: 1000 * 60 * 10, // 10 minutes
        // refetchOnWindowFocus: false,
        // refetchOnMount: false,
    })

    if(!Projects){
        return <></>
    }

  return (
    <div>
        <Index />
        <div className="ml-5  relative top-[10rem] ">
            <h1 className="text-[15rem] md:text-[6rem]  sm:text-[3.5rem] xsm:text-[3rem] md:flex md:justify-center font-bold uppercase font-IFkicaMedium">Videos</h1>
        </div>
        {
            Projects && (
                <div className="max-w-[1800px] mx-auto grid grid-cols-2 grid-4 mt-[30rem] md:mt-[20rem] mb-[10rem]">
                    {
                        Projects.map((prod) => (
                            <div className="flex gap-4  m-2">
                                {prod.videoUrls.map((url) => (
                                    <Link to={`/video/${prod._id}`}>
                                      <div className="">
                                     <video src={url} autoPlay loop muted className="w-full h-full object-cover" />
                                   </div>
                                    </Link>
                                 
                                ))}
                            </div>
                        ))
                    }
                </div>
            )
        }
    </div>
  )
}
