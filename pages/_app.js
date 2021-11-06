import Head from 'next/head'
import {CssBaseline} from '@mui/material';

import { GlobalStateProvider } from '../utils/useGlobalState'
import Layout from '../components/layout'
import '../styles/globals.scss'

const MyApp = ({ Component, pageProps }) => {
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

export default MyApp
