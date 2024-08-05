import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { Login } from "./pages/Login"
import { Register } from "./pages/register"
import { AddProject } from "./pages/addProject"
import { MyProjects } from "./pages/MyProjects"
import { Homepage } from "./pages/DISPLAY/Homepage"
import { Images } from "./pages/DISPLAY/Images"
import { Videos } from "./pages/DISPLAY/Videos"
import { ImageView } from "./pages/DISPLAY/ImageView"
import { VideoView } from "./pages/DISPLAY/videoView"
import { About } from "./pages/DISPLAY/About"
import { EditProject } from "./pages/EditProject"

const App = () => {
  return (
    <div className="w-screen h-screen bg-black text-white ">
    <Router>
      <Routes>
        <Route path="*" element={<Homepage />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/video/:videoId" element={<VideoView />} />
        <Route path="/images" element={<Images/>} />
        <Route path="/image/:imageId" element={<ImageView/>} />
        <Route path="/edit/:projectId" element={<EditProject/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/my-project" element={<MyProjects />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App