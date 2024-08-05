import express,{Request, Response} from 'express';
import multer from 'multer';
import {v2 as cloudinary} from "cloudinary"
import Project, { ProjectType } from '../models/project';

const router = express.Router();

const storage = multer.memoryStorage();

const upload =  multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024 //2GB
    }
})



async function uploadImages(imageFiles: Express.Multer.File[]): Promise<string[]> {
    const uploadPromises = imageFiles.map((image) => {
        return new Promise<string>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
                resource_type: 'image',
                chunk_size: 6000000, // 6MB
            }, (error, result) => {
                if (error) {
                    reject(new Error(`Image upload error: ${error.message}`));
                } else if (result && result.secure_url) {
                    resolve(result.secure_url);
                } else {
                    reject(new Error('Image upload failed: No secure URL returned.'));
                }
            });
            uploadStream.end(image.buffer);
        });
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

async function uploadVideos(videoFiles: Express.Multer.File[]): Promise<string[]> {
    const uploadPromises = videoFiles.map((video) => {
        return new Promise<string>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
                resource_type: 'video',
                chunk_size: 6000000, // 6MB
            }, (error, result) => {
                if (error) {
                    reject(new Error(`Video upload error: ${error.message}`));
                } else if (result && result.secure_url) {
                    resolve(result.secure_url);
                } else {
                    reject(new Error('Video upload failed: No secure URL returned.'));
                }
            });
            uploadStream.end(video.buffer);
        });
    });

    const videoUrls = await Promise.all(uploadPromises);
    return videoUrls;
}

router.post('/upload', 
    upload.fields([{ name: 'imageFiles', maxCount: 10 }, { name: 'videoFiles', maxCount: 3 }]) ,
     async (req: Request, res: Response) => {
    try {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        const imageFiles = files.imageFiles || []
        const videoFiles = files.videoFiles || []

        const newProject: ProjectType = req.body

        //upload images and videos to cloudinary
        const [imageUrls, videoUrls] = await Promise.all([
            uploadImages(imageFiles),
            uploadVideos(videoFiles)
        ]) 

        //if upload successful add the urls to the new project
        newProject.imageUrls = imageUrls
        newProject.videoUrls = videoUrls

        //save the project in database
        const project = new Project(newProject)
        await project.save()

        //return a 201 status
        res.status(201).send(project)

    } catch (error) {
        console.log("Error creating project", error);
        res.status(500).json({ message: "something went wrong" });
    }
})

router.get('/', async (req: Request, res: Response) => {
    try {
        const projects = await Project.find()
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({message: "Error fetching projects"})
    }
})

router.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id.toString();
    try {
        const project = await Project.findOne({_id: id})

        res.status(200).json(project)
    } catch (error) {
        res.status(500).json({message: "something went wrong"})
    }
})

router.put("/:projectId",  
    upload.fields([{ name: 'imageFiles', maxCount: 10 }, { name: 'videoFiles', maxCount: 3 }]) , 
async (req: Request, res:Response) => {
  
    try {
    
        const updatedProject: ProjectType = req.body;
        console.log(updatedProject)

        const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
        
        let updatedImageUrls: string[] = [];
        let updatedVideoUrls: string[] = [];

        console.log('Received files:', files);

        if (files) {
          if (files.imageFiles) {
            console.log('Image files:', files.imageFiles);
            updatedImageUrls = await uploadImages(files.imageFiles);
          }
  
          if (files.videoFiles) {
            console.log('Video files:', files.videoFiles);
            updatedVideoUrls = await uploadVideos(files.videoFiles);
          }
        }
  

        const project = await Project.findOneAndUpdate(
            {
                _id: req.params.projectId
            }, 
            updatedProject, 
            {new: true}
        );

       

        if(!project){
            return res.status(404).json({message: "Project not found"})
        }

        if(project){
            project.imageUrls = [...updatedImageUrls, ...(updatedProject.imageUrls || [])]
            project.videoUrls = [ ...updatedVideoUrls, ...(updatedProject.videoUrls || [])]
        }

       //const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    
      
        
        /*if (files) {
          if (files.imageFiles) {
            updatedImageUrls = await uploadImages(files.imageFiles);
          }
  
          if (files.videoFiles) {
            updatedVideoUrls = await uploadVideos(files.videoFiles);
          }
        }*/

         // Debugging logs to check received files
     


       

        console.log(project)

        await project?.save()

        res.status(201).json(project)

    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
        console.log(error)
    }
} )
export default router


