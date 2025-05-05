import { FC } from 'react'

const StudentInfo: FC = () => {
  return (
    <div className='pl-10 pt-3 flex flex-col gap-2'>
        <div>
            <h4 className='font-semibold text-[12px]'>Course</h4>
            <p className='text-sm'>Data science</p>
        </div>
        <div>
            <h4 className='font-semibold text-[12px]'>Name</h4>
            <p className='text-sm'>Itondi Gutanne</p>
        </div>
        <div>
            <h4 className='font-semibold text-[12px]'>DOB</h4>
            <p className='text-sm'>12-05-2005</p>
        </div>
        <div>
            <h4 className='font-semibold text-[12px]'>Email</h4>
            <p className='text-sm'>Guigane@gmail.com</p>
        </div>
        <div>
            <h4 className='font-semibold text-[12px]'>Address</h4>
            <p className='text-sm'>Koundegui-Yaounde</p>
        </div>
        <div>
            <h4 className='font-semibold text-[12px]'>Tel</h4>
            <p className='text-sm'>678 34 35 67</p>
        </div>
    </div>
  )
}

export default StudentInfo