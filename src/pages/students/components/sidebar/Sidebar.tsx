import React from 'react'
import Hero from './Hero'
import StudentProfile from './StudentProfile'
import StudentInfo from './StudentInfo'
import { useTheme } from '../../../../context/ThemeContext'

const Sidebar: React.FC = () => {
  const {themeMode} = useTheme()
  return (
    <div className={`${themeMode === 'light' ? 'bg-[#f6f6f9] text-black' : 'bg-sidebar-dark text-white'} w-[18vw] fixed h-screen flex flex-col overflow-y-auto`}>
       <Hero />
       <StudentProfile />
       <div><hr className='w-[70%] ml-10 border-1 text-[#96929259] border-solid mt-2' /></div>

       <StudentInfo />
    </div>
  )
}

export default Sidebar