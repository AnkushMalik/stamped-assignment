import { useContext, useEffect, useState } from "react"
import { Container, Divider } from '@mui/material'

import { Context } from '../../utils/useGlobalState' 
import {isIntersecting} from '../../utils/helper'

const JobAreaInfo = () => {
	const context = useContext(Context)
	const areaInfo = context?.activeJobArea || null
	const companyProjects = context?.projects
	const [areaEmployeesId,setAreaEmployeesId] = useState([])

	useEffect(()=>{
		let ids = []
		areaInfo?.data?.forEach(elm => ids.push(elm.id));
		setAreaEmployeesId(ids)
	},[])

	return (
		<Container>
			<h2>Job Area Info: </h2>
			<Divider/>
			<p><strong>Job Area: </strong> {areaInfo?.name}</p>
			<p><strong>No. of employees in this Area: </strong> {areaEmployeesId.length}</p>
			<p><strong>No. of participated projects: </strong>
			{
				companyProjects?.filter(proj=> isIntersecting(proj.employeesId,areaEmployeesId))
					.length
			}
			</p>
		</Container>
	)
}

export default JobAreaInfo
