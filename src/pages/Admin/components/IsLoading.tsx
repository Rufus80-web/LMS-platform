import React from 'react'

const IsLoading: React.FC = () => {
  return (
    <div className='w-50 h-10 bg-gray-500 text-white p-2 absolute left-[50rem] top-[20em] text-center text-sm animate-pulse'>
       <span>Loading...</span>
    </div>
  )
}

export default IsLoading