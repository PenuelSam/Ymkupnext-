import mongoose from "mongoose";

export type ProjectType = {
    _id: string;
    name: string;
    videoUrls: string[];
    imageUrls: string[];
}

const projectSchema = new mongoose.Schema<ProjectType>({
    name: String,
    videoUrls: [String],
    imageUrls: [String]
})

const Project = mongoose.model<ProjectType>("Project", projectSchema)

export default Project