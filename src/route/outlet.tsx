import { FC, ReactElement } from 'react'
import {Outlet} from 'react-router-dom'

const AppLayout: FC = (): ReactElement | null => {
    return (
        <>
          <Outlet />
        </>
    )
}

export default AppLayout