import axios from "axios";
import { RegisterType } from "./pages/register";
import { ProjectFormData } from "./pages/addProject";
import {ProjectType} from "../../backend/src/models/project"

const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
})

export const register = async (data: RegisterType) => {
    const response = await api.post('/api/user/register', data)
    return response.data
} 

export const login = async (data: RegisterType) => {
    const response = await api.post('/api/auth/login', data)
    return response.data
} 

export const addProject = async (data: ProjectFormData ) => {
    const project = new FormData();
    project.append("name", data.name)
    if(data.imageUrls) {
        data.imageUrls.forEach((url, index) => {
            project.append(`imageUrls[${index}]`, url);
        });
    }
    if(data.videoUrls) {
        data.videoUrls.forEach((url, index) => {
            project.append(`videoUrls[${index}]`, url);
        });
    }

    if(data.imageFiles){
        Array.from(data.imageFiles).forEach((imageFile) => {
            project.append(`imageFiles`, imageFile);
        });
    }
   
    if(data.videoFiles){
        Array.from(data.videoFiles).forEach((videoFile) => {
            project.append(`videoFiles`, videoFile);
        });
    }
   

    const response = await api.post(`/api/project/upload`, project)
    return response.data
}

export const fetchProjects = async (): Promise<ProjectType[]> => {
    const response = await api.get("/api/project/")
    return response.data
}

export const fetchProjectById = async (projectId: string): Promise<ProjectType> => {
    const response = await api.get(`/api/project/${projectId}`)
    return response.data
}

export const updateProjectById = async (projectId: string, formData: ProjectFormData) => {
    const response = api.put(`/api/project/${projectId}`, formData)
    return response
}