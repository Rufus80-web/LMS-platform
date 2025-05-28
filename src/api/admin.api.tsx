import API from "./axios";
import { BASE_REQUEST_URL } from "./axios";
import { Course, FormData } from "../static/types";
import { Announcement } from "../static/Interface";

export const addTeacherRequest = (config: RequestInit) =>  fetch(`${BASE_REQUEST_URL}/users`, config)
export const addNewStudent = (data: RequestInit) => fetch(`${BASE_REQUEST_URL}/add-teacher-student`, data)
export const addCourseRequest = (data: RequestInit) => fetch(`${BASE_REQUEST_URL}/add-course`, data)
export const updateUser = (id: string, body: FormData) => API.put(`${BASE_REQUEST_URL}/update-user/${id}`, body)
export const updateCourse = (id: string, body: Course) => API.put(`${BASE_REQUEST_URL}/update-course?courseId=${id}`, body)
export const deleteUser = (id: string) => API.delete(`${BASE_REQUEST_URL}/users/delete/${id}`)
export const deleteCourse = (cid: string) => API.delete(`${BASE_REQUEST_URL}/delete-course?courseId=${cid}`)
export const getUsers = () => API.get(`${BASE_REQUEST_URL}/users`)
export const getTeachers = () => API.get(`${BASE_REQUEST_URL}/users/Teacher`)
export const getStudents = () => API.get(`${BASE_REQUEST_URL}/users/Student`)
export const getUser = (id: string | undefined) => API.get(`${BASE_REQUEST_URL}/get-user/${id}`)
export const getCourses = () => API.get(`${BASE_REQUEST_URL}/get-courses`)
export const getOneCourse = (courseId: string) => API.get(`${BASE_REQUEST_URL}/get-course/${courseId}`)
export const addAnnouncementRequest = (configs: RequestInit) => fetch(`${BASE_REQUEST_URL}/add-announcement`, configs)
export const fetchAnnouncements = () => API.get(`${BASE_REQUEST_URL}/all-announcement`)
export const getAnnouncement = (announId: string) => API.get(`${BASE_REQUEST_URL}/announcement/${announId}`)
export const updateAnnouncement = (announId: string, data: Announcement) => API.put(`${BASE_REQUEST_URL}/announcement/${announId}`, data)
export const deleteAnnouncementRequest = (announId: string) => API.delete(`${BASE_REQUEST_URL}/announcement/${announId}`)
export const adminProfileUpdate = (id: string, config: RequestInit) => fetch(`${BASE_REQUEST_URL}/user/update/${id}`, config)
export const upadteUserRolerequest = (id: string, role: string) => API.patch(`${BASE_REQUEST_URL}/users/patch/${id}/${role}`)
export const getLogsRequest = () => API.get(`${BASE_REQUEST_URL}/logs`)