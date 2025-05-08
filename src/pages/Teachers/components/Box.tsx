import { useTeacherSidebarContext } from "../../../context/TeacherSidebarContext"


type BoxUtilProps = {
    image: string,
    total?: number,
    name?: string
}

const BoxUtil = ( {image}: BoxUtilProps) => {
  const {isOpen} = useTeacherSidebarContext()
  return (
    <div className={`${isOpen ? 'w-[250px] h-[223px]' : 'w-[290px] h-[223px]'} bg-[#f2f0f0] rounded-md flex flex-col gap-1.5 px-2 py-2 justify-center items-center`}>
       <div className='w-20 h-20 rounded-full'>
         <img className='w-full h-full' src={image} alt={image} />
       </div>
       <div className='text-2xl'><h2 className='text-teal-500'>3500</h2></div>
       <div><p>Total Students</p></div>
    </div>
  )
}

export default BoxUtil