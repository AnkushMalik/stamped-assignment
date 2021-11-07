import {List} from '@mui/material';

import AppMenuItem from './AppMenuItem'

const AppMenu = (props) =>{
	const {menuItems,menuClickHandler,menuChildren} = props

	return(
		<List component="nav" disablePadding sx={{width: '100%'}} className="app-menu">
			{menuItems?.map((item, index) => (
				<AppMenuItem
					key={index}
					item={item}
					name={item.name}
					menuClickHandler={menuClickHandler||[]}
					menuChildren = {menuChildren}
				/>
			))}
		</List>
	)
}

export default AppMenu