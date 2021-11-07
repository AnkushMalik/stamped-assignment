import { useEffect,useContext, useState } from 'react'
import { ListItemText, ListItem, Collapse, Divider, List} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { Context } from '../utils/useGlobalState'

const AppMenuItem = (props) => {
    const context = useContext(Context)
    const [open,setOpen] = useState(false)

    useEffect(()=>{
        if(props?.item["business"]){
            setOpen(props.item.id===context?.activeCompany?.id && open)
        }
    },[context?.activeCompany])

    const handleClick = () =>{
        setOpen(!open)
        props.menuClickHandler(context, props?.item?.id)
    }

    const MenuItemRoot = (
        <ListItem button onClick={handleClick}>
            <ListItemText primary={props.name}/>
            {/* Display the expand menu if the item has children */}
            {
                props.menuChildren ? (
                    <>
                        {!open && <ExpandMoreIcon />}
                        {open && <ExpandLessIcon />}
                    </>
                ):null
            }
        </ListItem>
    )
    const MenuItemChildren =
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
                {props.menuChildren?.length && props.menuChildren?.map((e, idx) =>
                    <AppMenuItem
                        key={idx}
                        item={e}
                        name={e.name}
                        menuClickHandler={e.action}
                        menuChildren={e.data}
                    />
                )}
            </List>
        </Collapse>
    return (
        <div className="app-menu-item">
            {MenuItemRoot}
            {MenuItemChildren}
        </div>
    )
}
export default AppMenuItem