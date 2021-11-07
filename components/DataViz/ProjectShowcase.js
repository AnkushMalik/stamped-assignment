import { Divider, Card, CardContent, CardActions, Button, Grid, Typography } from '@mui/material'

const ProjectShowcase = (props) => {
	const {projects, employees} = props
	return (
		<Grid container spacing={2}>
			{projects?.length?
				projects.map((e,idx)=>
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
				:
				<div>
					<br/>
					<br/>
					<p>No projects assigned to this employee</p>
				</div>
			}
		</Grid>
	)
}

export default ProjectShowcase
