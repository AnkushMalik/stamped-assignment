import { useState, useEffect, useContext } from "react"
import { Context } from '../../utils/useGlobalState'
import APIUTIL from '../../utils/api_util'
import {
    Button,
    Checkbox,
    TextField,
    Autocomplete,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { fetchProjects } from '../../utils/helper'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" /> 

const UpdateProject = (props) => {
    const context = useContext(Context)
    const {open, handleClose, project} = props
    const employees = context?.activeCompanyEmployees || []
    const [activeProjectEmployees,setActiveProjectEmployees] = useState([])
    const [projectName, setProjectName] = useState('')

    useEffect(()=>{
        let temp = employees.filter(emp =>
            project.employeesId?.indexOf(emp.id)>-1
        )
        setActiveProjectEmployees(temp)
        setProjectName(project?.name)
    },[project])

    const handleProjectUpdate = async() => {
        let emp_ids = []
        activeProjectEmployees.forEach(e => emp_ids.push(e.id))
        let payload = {
            projectID: project.id,
            projectName: projectName,
            employees: emp_ids
        }
        const apiResponse = await APIUTIL.put(`/projects/update_project`,payload)
        if(apiResponse){
            fetchProjects(context)
        }
        handleClose()
    }

    return(
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="md"
            >
                <DialogTitle>{project?.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       Hello World </DialogContentText>
                    <br />
                    <TextField
                        required
                        id="projectName"
                        label="Project Name"
                        fullWidth
                        variant="standard"
                        defaultValue={projectName}
                        onChange={(e)=>setProjectName(e.target.value)}
                    />
                    <br />
                    <br />
                    <Autocomplete
                        multiple
                        id="checkboxes-tags-demo"
                        options={employees}
                        onChange={(event, value) => setActiveProjectEmployees(value)}
                        disableCloseOnSelect
                        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                        value={activeProjectEmployees}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {`${option.firstName} ${option.lastName}`}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} label="Assigned Employees" placeholder="Favorites" />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleProjectUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default UpdateProject