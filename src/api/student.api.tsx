import axios from "axios"

// const examURL = 'http://localhost:8000/api/exam'
const globalURL = 'http://localhost:8000/api/all'
const baseURL = 'http://localhost:8000/api/student'
const studentApi = axios.create({
    baseURL: baseURL,
    headers: {'Authorization': `Bearer ${localStorage.getItem('token') || ''}`}
})
const globalApi = axios.create({
    baseURL: globalURL,
    headers: {'Authorization': `Bearer ${localStorage.getItem('token') || ''}`}
})


export const studentAttendaceApi = (id: string) => studentApi.get(`/attendance/${id}`) // Display all the attendances (courses) for a student
export const announcementApi = () => studentApi.get(`/announcement`) 
export const examScheduleInfoApi = (id: string) => studentApi.get(`/${id}/exam-scheduled`) // Gets announcements about exams published by teachers
export const getEventExam = (examId: string, teacherId: string) => globalApi.get(`/${examId}/exam-scheduled/${teacherId}`)
export const studentInstructorApi = (studId: string) => studentApi.get(`/instructors/${studId}`)
export const studentPasswordRessesionApi = <T,>(data: T) => studentApi.patch('/password/update', data)