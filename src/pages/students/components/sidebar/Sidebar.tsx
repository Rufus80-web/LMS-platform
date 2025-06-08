import React from 'react'
import Hero from './Hero'
import StudentProfile from './StudentProfile'
import StudentInfo from './StudentInfo'
// import { useTheme } from '../../../../context/ThemeContext'

//${themeMode === 'light' ? 'bg-white' : 'bg-gray-800 text-slate-50'}

const Sidebar: React.FC = () => {
  // const {themeMode} = useTheme()
  return (
    <div className={`bg-gradient-to-r from-[#111] to-[#082520c5] shadow-sm w-[18vw] fixed h-screen flex flex-col overflow-y-auto
     font-light text-[#e8e6e6]
    `}>
       <Hero />
       <StudentProfile />
       <div><hr className='w-[70%] ml-10 border-1 text-[#96929259] border-solid mt-2' /></div>

       <StudentInfo />
    </div>
  )
}

export default Sidebar