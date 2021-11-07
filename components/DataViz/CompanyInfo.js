import { useContext, useEffect } from "react"
import { Container, Divider } from '@mui/material'

import { Context } from '../../utils/useGlobalState'
import { fetchProjects } from '../../utils/helper'
import ProjectShowcase from "./ProjectShowcase"

const CompanyInfo = () => {
	const context = useContext(Context)
	const company = context?.activeCompany || null
	const employees = context?.activeCompanyEmployees || null

	useEffect(()=>{
		fetchProjects(context)
	},[context.activeCompany])

	
	return (
		// When the user clicks on a company, the app should display the company's address 
		// and the company's projects. It should be possible to visualize the 
		// information about each project. If you feel that this is too easy, add the 
		// ability to edit project details (changing the project name) and assigning & removing employees from a project.
		<Container>
            <h2>Company Info:</h2>
			<Divider/>
			<p><strong>Name: </strong> {company?.name}</p>
			<p><strong>Business: </strong> {company?.business}</p>
			<p><strong>Slogan: </strong> {company?.slogan}</p>
			<br />
			<h2> Company Projects </h2>
			<Divider/>
			<ProjectShowcase
				projects = {context?.projects}
				employees = {employees}
			/>
        </Container>
	)
}

export default CompanyInfo
