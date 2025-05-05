import React from 'react'

import Sidebar from './components/sidebar/Sidebar'
import Main from './components/main/Main'

const StudentDashboard: React.FC = () => {
  return (
    <div className='w-screen min-h-screen bg-[#f6f6f9]'>
        <Sidebar />
        <Main />
    </div>
  )
}

export default StudentDashboard