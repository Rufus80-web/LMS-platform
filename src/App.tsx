import { StrictMode } from 'react'
import {router} from "./route/route"
import {RouterProvider} from 'react-router-dom'
import {Provider} from 'react-redux'

import "./assets/css/fontawesome/css/all.css"
import ReduxStore from './Redux/configureStrore'


function App() {


  return (
    <StrictMode>
      <Provider store={ReduxStore}>
         <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  )
}

export default App
