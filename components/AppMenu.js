import { useContext } from 'react'
import {List} from '@mui/material';

import { Context } from '../utils/useGlobalState'
import AppMenuItem from './AppMenuItem'

const AppMenu = (props) =>{
	// const context = useContext(Context)
	const {menuItems,menuClickHandler,menuChildren} = props

	return(
		<List component="nav" disablePadding sx={{width: '100%'}}>
			{menuItems?.map((item, index) => (
				<AppMenuItem
					key={index}
					item={item}
					name={item.name}
					menuClickHandler={menuClickHandler}
					menuChildren = {menuChildren}
				/>
			))}
		</List>
	)
}

export default AppMenu