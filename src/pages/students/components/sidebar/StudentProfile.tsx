import { FC } from 'react'
import  studentPro from "../../../../assets/images/teacher1.jpeg"

const StudentProfile: FC = () => {
  const today: Date = new Date()
  return (
    <div className='flex justify-center items-center gap-4 pt-12'>
        <div className='w-20 h-20 rounded-full border-1 border-solid border-indigo-200 hover:scale-110 hover:border-indigo-400 hover:ease-in hover:duration-150 hover:border-2'>
            <img className='w-full h-full rounded-full' src={studentPro} alt={studentPro} />
        </div>
        <div className='text-sm flex flex-col gap-0.5'>
            <span>Hey,</span>
            <span>{today.toDateString()}</span>
        </div>
    </div>
  )
}

export default StudentProfile