import {} from 'react'

import { useTeacherSidebarContext } from '../../../context/TeacherSidebarContext'
import { useTheme } from '../../../context/ThemeContext'

const ClassRecordGraph = () => {
  const {isOpen} = useTeacherSidebarContext()
  const {themeMode} = useTheme()
  return (
    <div className={`${isOpen ? 'w-[510px] h-[290px]' : 'w-[600px] h-[290px]'} flex flex-col ${themeMode === 'light' ? 'bg-[#f2f0f0] ' : 'bg-sidebar-dark'} `}>
       <div className='flex justify-between items-center px-8 py-8'>
          <div>
             <h2 className={`text-[16px] font-semibold ${themeMode === 'dark' && 'text-[#fff]'}`}>Class Record</h2>
             <p className='text-teal-500 text-2xl'>3 Classes</p>
          </div>
          <div className='w-10 h-10 rounded-full hover:bg-gray-300 hover:cursor-pointer flex justify-center items-center'>
            <span className='fas fa-arrow-down text-teal-500'></span>
          </div>
       </div>
       {/* graph container  */}
       <div></div>
    </div>
  )
}

export default ClassRecordGraph