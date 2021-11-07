import { useContext } from 'react'
import { Drawer } from '@mui/material'

import AppMenu from './AppMenu'
import { Context } from '../utils/useGlobalState'
import { getCompanyChildren } from '../utils/helper'

const AppSideNav = (props) => {
    const { drawerWidth } = props
    const context = useContext(Context)

    return(
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: drawerWidth,
                position: "relative",
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    position: 'fixed',
                    paddingTop: 10
                }
            }}
        >
            <AppMenu 
                menuItems={context?.companies}
                menuClickHandler={getCompanyChildren}
                menuChildren={context?.companyChildren || []}
            />
        </Drawer>
    )
}

export default AppSideNav