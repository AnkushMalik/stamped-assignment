import APIUTIL from './api_util'
import NProgress from 'nprogress'

const dataFormatter = (context, jsonData) =>{
    let hash = {}
    jsonData.map(e=>{
        if(hash[e.jobArea]==undefined){
            hash[e.jobArea] = [e]
        }else{
            hash[e.jobArea].push(e)
        }
    })

    let payload = []
    Object.keys(hash).map(e=>{
        let temp = {}
        temp.name = e
        temp.action = () => getJobAreaInfo(context, temp)
        temp.data = []
        hash[e].forEach(e => {
            temp.data.push({
                name: `${e.firstName} ${e.lastName}`,
                action: () => getEmployeeInfo(context, e),
                ...e
            })
        });
        payload.push(temp)
    })
    return payload
}

export const getCompanyChildren = async(context, id) => {
    NProgress.start()
    let activeCompany = context?.companies?.filter(e=>e.id===id)[0]
    context.set("activeCompany",activeCompany)
    const apiResponse = await APIUTIL.get(`/employee/by_company/${id}`)
    if(apiResponse){
        let payload = dataFormatter(context, apiResponse)
        context.set("companyChildren", payload)
        context.set("activePanel", "companyInfo")
        context.set("activeCompanyEmployees",apiResponse)
    }
    NProgress.done()
}

export const isIntersecting = (arr1, arr2) => {
    return arr1.some(item => arr2.includes(item))
}

const getJobAreaInfo = (context, info) => {
    context.set("activeJobArea", info)
    context.set("activePanel", "jobAreaInfo")
}

const getEmployeeInfo = (context, info) => {
    context.set("activeEmployee", info)
    context.set("activePanel", "employeeInfo")
}

export const fetchProjects = async(context) =>{
    NProgress.start()
    const apiResponse = await APIUTIL.get(`/projects/${context?.activeCompany?.id}`)
    if (apiResponse){
        context.set('projects',apiResponse)
    }
    NProgress.done()
}