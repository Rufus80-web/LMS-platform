import {} from 'react'

type SectionHeaderProps = {
  title: string,
  message: string
}

const DashHeader = ( {title, message}: SectionHeaderProps) => {
  return (
    <div className='pt-4'>
        <h1 className='font-bold text-3xl uppercase'>{title}</h1>
        <p className='text-teal-500'>{message}</p>
    </div>
  )
}

export default DashHeader