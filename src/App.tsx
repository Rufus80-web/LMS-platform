import { StrictMode } from 'react'
import {router} from "./route/route"
import {RouterProvider} from 'react-router-dom'


function App() {


  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}

export default App
