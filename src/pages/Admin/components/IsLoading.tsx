import React from 'react'

const IsLoading: React.FC = () => {
  return (
    <div className='w-20 h-20 rounded-full transition-all duration-100 flex justify-center items-center bg-slate-200 z-50 absolute left-[44rem] top-60 animate-spin'>
        <span className='w-6 h-6 bg-green-400 rounded-full transform-view transition-all duration-75 animate-spin ease-in-out text-white flex justify-center items-center'>L</span>
        <span className='w-6 h-6 bg-red-400 rounded-full transform-view transition-all duration-75 animate-spin ease-in-out text-white flex justify-center items-center'>M</span>
        <span className='w-6 h-6 bg-yellow-400 rounded-full transform-view transition-all duration-75 animate-spin ease-in-out text-white flex justify-center items-center'>S</span>
    </div>
  )
}

export default IsLoading