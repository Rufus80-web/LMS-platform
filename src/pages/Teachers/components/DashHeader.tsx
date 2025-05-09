import {} from 'react'
import { useTheme } from '../../../context/ThemeContext'

type SectionHeaderProps = {
  title: string,
  message: string
}

const DashHeader = ( {title, message}: SectionHeaderProps) => {
  const {themeMode} = useTheme()
  return (
    <div className='pt-4'>
        <h1 className={`font-bold text-3xl uppercase ${themeMode === 'dark' && 'text-[#f2f0f0]'}`}>{title}</h1>
        <p className='text-teal-500'>{message}</p>
    </div>
  )
}

export default DashHeader