import { FC, ReactElement } from 'react'
import {Outlet, ScrollRestoration} from 'react-router-dom'

const AppLayout: FC = (): ReactElement | null => {
    return (
        <div>
          <Outlet />
          <ScrollRestoration />
        </div>
    )
}

export default AppLayout