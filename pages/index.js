import { useEffect, useContext } from 'react'

import APIUTIL from '../utils/api_util'
import { Context } from '../utils/useGlobalState'
import { Grid } from '@mui/material'               
import CompanyInfo from "../components/DataViz/CompanyInfo"
import EmployeeInfo from "../components/DataViz/EmployeeInfo"
import JobAreaInfo from "../components/DataViz/JobAreaInfo"

const DataViz = () => {
	const context = useContext(Context)
	const panelState = context?.activePanel

	useEffect(()=>{
		fetchCompanies()
	},[])

	const fetchCompanies = async() =>{
		const apiResponse = await APIUTIL.get('/companies')
		if(apiResponse){
			context.set('companies', apiResponse)
		}
	}
	
	return (
		<div className="company-index">
			<Grid container spacing={2} py={6} px={8} className="company-index-container">
				{
					(() => {
						if (panelState === 'employeeInfo')
							return <EmployeeInfo/>
						if (panelState === 'jobAreaInfo')
							return <JobAreaInfo/>
						else if(panelState === 'companyInfo')
							return <CompanyInfo/>
					})()
				}
			</Grid>
		</div>
	)
}

export default DataViz;