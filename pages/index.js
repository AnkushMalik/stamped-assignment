import { useEffect } from 'react'
import APIUTIL from '../utils/api_util'

const Home = () => {
  const fetchCompanies = async() =>{
    const apiResponse = await APIUTIL.get('/companies')
    console.log(apiResponse) //testing apiutil
  }
  useEffect(()=>{
    fetchCompanies()
  },[])
  return (
    <div>
      Hello World
    </div>
  )
}

export default Home;