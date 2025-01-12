import { Router,Request,Response } from 'express';
import { getUsers, createUser, registerUser, loginUser, addCourse, deleteCourse, getUserCourses, getCourseById } from '../controllers/userControllers';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/users/:id/courses/add', addCourse);
router.delete('/users/:id/courses/:courseId/delete', deleteCourse);
router.get('/users/:id/courses',getUserCourses)
router.get('/users/:id/courses/:courseId',getCourseById)
export default router;
