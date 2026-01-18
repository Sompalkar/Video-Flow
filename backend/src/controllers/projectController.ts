

import type { Request, Response } from "express";

import { createProjectSchema, updateProjectSchema } from "../types/project.types.js";
import Project from "../models/project.js";

export const createProject = async (req: Request, res: Response) => {
    try {

        const createProjectData = createProjectSchema.parse(req.body)
        const { title, description, status } = createProjectData

        const creator= req.user?.userID

        const project = await Project.create({
            title,
            creator,
            status,
            ...(description !== undefined && { description })
        })

        if (!project ){
            return res.status(400).json({message:"Failed to create project"})
        }

        return res.status(201).json({message:"Project created successfully", project})
  
    } catch (error:any) {
        if ( error.name === 'ZodError'){
            return res.status(400).json({ error: error.errors });
        } 
        console.log("Project create error: ", error)
        return res.status(500).json({ error: "Internal server error" });
    }




}



export const getProjects = async (req: Request, res: Response) => {
    
    try {
        const project = await Project.find({creator:req.user?.userID})
        if (!project ){
            return res.status(404).json({message:"Project not found "})
        }
    
        return res.status(200).json({project})
    } catch (error:any) {

        if ( error.name === 'ZodError'){
            return res.status(400).json({error}) 
        }
    
        console.log("Project get error: ", error)
        return res.status(500).json({ error: "Internal server error" });
    }

}


export const updateProject = async (req: Request, res: Response) => {

    try { 
        const updateProjectData = updateProjectSchema.parse(req.body)
        const { id, title, description, status} = updateProjectData

        const updatedProject= await Project.findByIdAndUpdate(id, {tittle:title, description:description, status:status})

        if (!updatedProject){
            return res.status(404).json({message:"Project not found "})
        } 
        return res.status(200).json({ message:"project updated successfully", updatedProject})

    } catch (error:any) {

        if ( error.name === 'ZodError'){
            return res.status(400).json({ error: error.errors });
        }  
        console.log('Project update Error:   ', error)
        return res.status(500).json({ message:'Failed to update project'}) 
        
    }

}


export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { id }= req.body
        const deletedProject = await  Project.findByIdAndDelete(id)

        if(!deletedProject){
            return res.status(404).json({message:"Project not found "})
        }
        return res.status(200).json({ message:"project deleted successfully", deletedProject})
        
    } catch (error:any) {
        if(error.name === 'ZodError'){
            return res.status(400).json({error: error.errors })
        }
        console.log(error)
        return res.status(500).json({ error:"Internal server error"})
        
    }
}

