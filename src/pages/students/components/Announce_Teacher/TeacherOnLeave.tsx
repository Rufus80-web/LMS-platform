import { FC } from 'react'

import teacher from "../../../../assets/images/teacher2.jpeg"

const TeacherOnLeave: FC = () => {
  return (
    <div className='flex gap-4 justify-start items-center'>
        <div className='w-10 h-10 rounded-full'>
            <img src={teacher} alt="image.png" className='w-full h-full rounded-full' />
        </div>
        <div className='text-[12px] text-dark-bg'>
            <h2>Alamine Ousmane</h2>
            <p>Full Day</p>
        </div>
    </div>
  )
}

export default TeacherOnLeave