import React from 'react'
import Hero from './Hero'
import StudentProfile from './StudentProfile'
import StudentInfo from './StudentInfo'

const Sidebar: React.FC = () => {
  return (
    <div className='bg-gray-50 w-[18vw] fixed h-screen flex flex-col'>
       <Hero />
       <StudentProfile />
       <div><hr className='w-[70%] ml-10 border-1 text-[#96929259] border-solid mt-2' /></div>

       <StudentInfo />
    </div>
  )
}

export default Sidebar