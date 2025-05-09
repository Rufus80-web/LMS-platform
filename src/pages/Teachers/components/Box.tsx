import { useTeacherSidebarContext } from "../../../context/TeacherSidebarContext"
import { useTheme } from "../../../context/ThemeContext"


type BoxUtilProps = {
    image: string,
    total?: number,
    name?: string
}

const BoxUtil = ( {image}: BoxUtilProps) => {
  const {isOpen} = useTeacherSidebarContext()
  const {themeMode} = useTheme()
  return (
    <div className={`${isOpen ? 'w-[250px] h-[223px]' : 'w-[290px] h-[223px]'} rounded-md flex flex-col gap-1.5 px-2 py-2 justify-center items-center 
    ${themeMode === 'light' ? 'bg-[#f2f0f0] ' : 'bg-sidebar-dark'}`}>
       <div className={`w-25 h-25 flex justify-center items-center rounded-full ${themeMode === 'dark' && 'bg-white'}`}>
         <img className='w-15 h-15' src={image} alt={image} />
       </div>
       <div className='text-2xl'><h2 className='text-teal-500'>3500</h2></div>
       <div className={`${themeMode === 'dark' && 'text-[#fff]'}`}><p>Total Students</p></div>
    </div>
  )
}

export default BoxUtil