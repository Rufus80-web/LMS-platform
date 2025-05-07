import teacher2 from "../../assets/images/profile-2.jpeg";
import { teacherSidebarItems as Items } from "../../static/utils";
import { Link, useLocation } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  handleWidth: () => void;
};

export const Sidebar = ({ isOpen, handleWidth }: SidebarProps) => {
  const location = useLocation();
  return (
    <div
      className={`${
        isOpen
          ? "duration-300 transition-all ease-linear w-[25vw]"
          : "duration-300 transition-all ease-linear w-[8vw]"
      }  h-[100vh] ${isOpen && 'overflow-auto'} overflow-x-hidden bg-[#f2f0f0] flex flex-col`}
    >
      {" "}
      {/** Bars icon of sidebar */}
      <div
        className={`w-full p-0 flex ${
          isOpen ? "justify-end" : "justify-center"
        }`}
      >
        <div
          className="w-8 h-8 flex justify-center items-center hover:bg-gray-200 hover:rounded-full hover:cursor-pointer"
          onClick={handleWidth}
        >
          <span className="fas fa-bars"></span>
        </div>
      </div>
      {/* teacher profile  */}
      {isOpen && (
        <div className="w-full h-max flex flex-col justify-center items-center gap-2 mt-0 pt-4 pb-4">
          <div className="w-20 h-20 rounded-full">
            <img
              className="w-full h-full rounded-full"
              src={teacher2}
              alt="teacher"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">Kapnang</h1>
            <span className="text-teal-300">Teacher</span>
          </div>
        </div>
      )}
      {/* sidebar navigation pages  */}
      <div className="w-full pt-4">
        {isOpen ? ( // Displayed if sidebar with is >= 25vw (25%)
          Items?.open.elements?.map((item) => (
            <>
              <h2 key={item.id} className="pl-6 text-[14px]">
                {item.title}
              </h2>
              {item?.children?.map((el, index) => (
                <ul key={index} className="list-none flex flex-col gap-x-2">
                  <Link to={el?.goto} className="decoration-0 mt-2">
                    <li
                      className={`w-full ml-[1.15em] ${
                        location.pathname === el.goto && "bg-gray-300"
                      } cursor-pointer  h-[7vh] flex items-center justify-start pl-7 gap-2 text-[13px]`}
                    >
                      <span className={`${el?.icon}`}></span>
                      <span>{el.name}</span>
                    </li>
                  </Link>
                </ul>
              ))}
            </>
          ))
        ) : ( // Displayed if sidebar width = 6vw (6%)
          <ul className="flex flex-col justify-center items-center gap-0">
            {Items?.closed.icons?.map((item) => (
              <Link key={item.id} to={item.url} className={`w-full ${location.pathname === item.url && 'bg-[#0000005e]'} p-3 flex justify-center items-center hover:bg-[#0000005e]`}>
                <span className={`${item.name} text-[20px] text-[#7a7a7afb] ${location.pathname === item.url && 'text-black'}`}></span>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
