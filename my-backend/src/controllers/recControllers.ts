import axios from 'axios';
import { Request, RequestHandler, Response } from 'express';

const COLAB_BASE_URL = 'https://652c-34-86-5-35.ngrok-free.app/recommend'; 
const COLAB_API_URL = 'https://7f32-34-30-71-244.ngrok-free.app';
const COLAB_BASE_URL2 = 'https://65b4-35-229-210-177.ngrok-free.app/recommend'
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


export const quizUser: RequestHandler = async (req:Request,res:Response):Promise<void> =>{
    const { quiz_context, num_questions, quiz_type } = req.body;

    try {
        const response = await axios.post(`${COLAB_API_URL}/quiz`, {
            quiz_context,
            num_questions,
            quiz_type,
        });
        res.json(response.data);
    } catch (err: any) {
        console.error('Error connecting to Colab API:', err.message);
        res.status(500).json({ error: err.message });
    }
}


export const recommendMoreUser: RequestHandler = async (req:Request,res:Response):Promise<void> =>{
    const {current_course} = req.body;
    if(!current_course){
        res.status(400).json({message:'All fields are required'});
        return;
    }
    try{
        const response = await axios.post(COLAB_BASE_URL2,{current_course});
        res.status(200).json(response.data);
        return;
    }catch(err){
        res.status(500).json({message:'Server error',error:err});
        return;
    }
}
