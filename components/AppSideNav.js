import { useContext } from 'react'
import { Drawer } from '@mui/material'

import AppMenu from './AppMenu'
import { Context } from '../utils/useGlobalState'
import APIUTIL from '../utils/api_util'

const AppSideNav = (props) => {
    const { drawerWidth } = props
    const context = useContext(Context)
    const getCompanyChildren = async(id) => {
        let activeCompany = context?.companies?.filter(e=>e.id===id)[0]
        context.set("activeCompany",activeCompany)
        const apiResponse = await APIUTIL.get(`/employee/by_company/${id}`)
        if(apiResponse){
            let hash = {}
            apiResponse.map(e=>{
                if(hash[e.jobArea]==undefined){
                    hash[e.jobArea] = [e]
                }else{
                    hash[e.jobArea].push(e)
                }
            })
            let payload = [] //
            Object.keys(hash).map(e=>{
                let temp = {}
                temp.name = e
                temp.action = () => console.log('job clicked')
                temp.data = []
                hash[e].forEach(e => {
                    temp.data.push({
                        name: `${e.firstName} ${e.lastName}`,
                        action: () => console.log('user clicked'),
                        ...e
                    })
                });
                payload.push(temp)
            })
            context.set("companyChildren", payload)
            // context.set("activeScreen",0)
        }
    }
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