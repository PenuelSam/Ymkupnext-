import { useState } from "react"
import { Nav } from "./navbar/nav"
import { AnimatePresence } from "framer-motion"



export const Index = () => {
    const [isActive, setIsActive] = useState(false)
  return (
    <>
        <div className="button z-[999] cursor-pointer" onClick={() => setIsActive(!isActive)}>
            <div className={`burger ${isActive ? 'burgeractive' : ''}`} ></div>
        </div>
        <AnimatePresence mode="wait">
            {isActive && <Nav /> }
        </AnimatePresence>
    </>
  )
}
