

const Seachbar = () => {
  return (
    <div className="bg-[#f2f0f0]  w-55 h-9 flex rounded-lg">
       <div className="w-45 h-full">
          <input type="text" placeholder="Search" className="w-full h-full outline-0 border-none indent-5 text-[14px]" />
       </div>
       <div className="w-10 h-full flex justify-center items-center">
         <span className="fas fa-search"></span>
       </div>
    </div>
  )
}

export default Seachbar