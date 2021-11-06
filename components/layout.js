import {AppBar, Container,Typography,Toolbar} from '@mui/material';

const Layout = (props) => {
	return (
		<Container maxWidth={false} disableGutters={true}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Stamped.io
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                {props.children}
            </Container>
        </Container>
	)
}

export default Layout
