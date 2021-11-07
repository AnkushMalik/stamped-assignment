import APIUTIL from './api_util'

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
        temp.action = () => getJobAreaInfo(context)
        temp.data = []
        hash[e].forEach(e => {
            temp.data.push({
                name: `${e.firstName} ${e.lastName}`,
                action: () => getEmployeeInfo(context),
                ...e
            })
        });
        payload.push(temp)
    })
    return payload
}

export const getCompanyChildren = async(context, id) => {
    let activeCompany = context?.companies?.filter(e=>e.id===id)[0]
    context.set("activeCompany",activeCompany)
    const apiResponse = await APIUTIL.get(`/employee/by_company/${id}`)
    if(apiResponse){
        let payload = dataFormatter(context, apiResponse)
        context.set("companyChildren", payload)
        context.set("activePanel", "companyInfo")
    }
}

const getJobAreaInfo = context => {
    context.set("activePanel", "jobAreaInfo")
}

const getEmployeeInfo = context => {
    context.set("activePanel", "employeeInfo")
}