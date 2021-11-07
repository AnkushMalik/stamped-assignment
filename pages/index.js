import { useEffect, useContext } from 'react'
import Link from 'next/link'

import APIUTIL from '../utils/api_util'
import { Context } from '../utils/useGlobalState'
import { Grid, Card, CardContent } from '@mui/material'

const CompanyIndex = () => {
	const context = useContext(Context)

	useEffect(()=>{
		fetchCompanies()
	})

	const fetchCompanies = async() =>{
		const apiResponse = await APIUTIL.get('/companies')
		if(apiResponse){
			context.set('companies', apiResponse)
		}
	}
	
	return (
		<div className="company-index">
			<Grid container spacing={2} className="company-index-container">
				{context?.companies?.map(e=>
					<Grid item xs={3} key={e._id} className="company-index-items">
						<Link href={`/companies/${e.id}`} passHref>
							<Card>
								<CardContent>
									{e.name}
								</CardContent>
							</Card>
						</Link>
					</Grid>
				)}
			</Grid>
		</div>
	)
}

export default CompanyIndex;