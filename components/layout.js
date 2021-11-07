import Link from 'next/link'
import {
    AppBar,
    Container,
    Typography,
    Toolbar,
} from '@mui/material'

import AppSideNav from './AppSideNav'
const drawerWidth = 275

const Layout = (props) => {
	return (
		<Container maxWidth={false} disableGutters={true} className="layout-container">
            <AppBar position="sticky" sx={{zIndex:9999}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link href="/"> Stamped.io </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <AppSideNav/>
            <Container sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                {props.children}
            </Container>
        </Container>
	)
}

export default Layout
