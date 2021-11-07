import Head from 'next/head'
import { useEffect } from 'react'
import Router, { withRouter } from 'next/router'
import {CssBaseline} from '@mui/material';
import NProgress from 'nprogress'

import { GlobalStateProvider } from '../utils/useGlobalState'
import Layout from '../components/layout'
import '../styles/globals.scss'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const MyApp = ({ Component, pageProps }) => {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
		  jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);
	
	return (
		<GlobalStateProvider>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			</Head>
			<CssBaseline />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</GlobalStateProvider>
	)
}

export default withRouter(MyApp)
