import { useContext, useState, useEffect } from "react"
import { Container, Divider } from '@mui/material'

import { Context } from '../../utils/useGlobalState'
import ProjectShowcase from './ProjectShowcase'

const EmployeeInfo = () => {
	const context = useContext(Context)
	const employee = context?.activeEmployee
	const companyProjects = context?.projects
	const [assignedProjects,setAssignedProjects] = useState([])

	useEffect(()=>{
		let projects = companyProjects?.filter(p=> p.employeesId.indexOf(employee.id)>-1)
		setAssignedProjects(projects)
	},[])

	return (
		// When the user clicks on an employee's name 
		// you will need to show the employee's details,
		// and projects they're part of.
		<Container>
			<h2>Employee Info: </h2>
			<Divider/>
			<p><strong>Name: </strong> {employee?.firstName} {employee?.lastName}</p>
			<p><strong>Job Area: </strong> {employee?.jobArea}</p>
			<p><strong>Job Title: </strong> {employee?.jobTitle}</p>
			<p><strong>Job Type: </strong> {employee?.jobType}</p>
			<br />
			<h2> Assigned Projects: </h2>
			<Divider/>
			<ProjectShowcase
				projects = {assignedProjects}
				employees = {context?.activeCompanyEmployees}
			/>
		</Container>
	)
}

export default EmployeeInfo
