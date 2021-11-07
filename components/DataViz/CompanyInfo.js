import { useContext, useEffect } from "react"
import { Context } from '../../utils/useGlobalState'
import { Container, Divider, Card, CardContent, CardActions, Button, Grid, Typography } from '@mui/material'
import APIUTIL from '../../utils/api_util'

const CompanyInfo = () => {
	const context = useContext(Context)
	const company = context?.activeCompany || null
	const employees = context?.activeCompanyEmployees || null

	useEffect(()=>{
		fetchProjects()
	},[context.activeCompany])

	const fetchProjects = async() =>{
		if(!company) return
		const apiResponse = await APIUTIL.get(`/projects/${company?.id}`)
		if (apiResponse){
			context.set('projects',apiResponse)
			console.log(apiResponse)
		}
	}
	return (
		<Container>
            <h2>Company Info:</h2>
			<Divider/>
			<p><strong>Name: </strong> {company?.name}</p>
			<p><strong>Business: </strong> {company?.business}</p>
			<p><strong>Slogan: </strong> {company?.slogan}</p>
			<br />
			<h2> Company Projects </h2>
			<Divider/>
			<Grid container spacing={2}>
				{
					context?.projects?.map((e,idx)=>
						<Grid item xs={6} key={idx}>
							<Card sx={{my:2}}>
								<CardContent>
									<Typography variant="h6" component="div">
										{e.name}
									</Typography>
									{
										employees.filter(emp =>
											e.employeesId?.indexOf(emp.id)>-1
										).map((emp,index)=><p key={index}>{emp.firstName}</p>)
									}
								</CardContent>
								<Divider/>
								<CardActions>
									<Button size="small">Edit</Button>
								</CardActions>
							</Card>
						</Grid>
					)
				}
			</Grid>
        </Container>
	)
}

export default CompanyInfo
