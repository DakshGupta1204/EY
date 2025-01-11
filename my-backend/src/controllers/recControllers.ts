import axios from 'axios';
import { Request, RequestHandler, Response } from 'express';

const COLAB_BASE_URL = 'https://4b8c-34-106-77-119.ngrok-free.app/recommend'; 

// Proxy route to forward requests to Colab

export const recommendUser: RequestHandler = async (req:Request,res:Response):Promise<void> =>{
    const {interest,skills,level} = req.body;
    if(!interest || !skills || !level){
        res.status(400).json({message:'All fields are required'});
        return;
    }
    try{
        const response = await axios.post(COLAB_BASE_URL,{interest,skills,level});
        res.status(200).json(response.data);
        return;
    }catch(err){
        res.status(500).json({message:'Server error',error:err});
        return;
    }
}

