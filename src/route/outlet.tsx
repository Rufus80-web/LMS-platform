import { FC, ReactElement } from 'react'
import {Outlet, ScrollRestoration} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast'

const AppLayout: FC = (): ReactElement | null => {
    return (
        <div>
          <ToastContainer 
              position='top-right'
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false} 
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable 
              pauseOnHover
              theme='colored'
           />
           <Toaster
             position='top-right'
             reverseOrder={false}
           />
          <Outlet />
          <ScrollRestoration />
        </div>
    )
}

export default AppLayout