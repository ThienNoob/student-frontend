import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function Student() {
    const paperStyle={padding:'50px 20px', width:600, margin:"20px auto"}
    const[id,setID]=React.useState('')
    const[name,setName]=React.useState('')
    const[address,setAddress]=React.useState('')
    const[students,setStudents]=React.useState([])

    const handleClick=(e)=>{
        e.preventDefault()
        const student={name, address}
        console.log(student)
        // use fetch to send data to the server
        fetch("/student/add", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then(()=>{
            console.log("New student added")
        })
    }

    React.useEffect(()=>{
        fetch("/student/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setStudents(result)
        })
    },[])

    const handleUpdate=(id)=>{
        if (!id || id.trim() === "") {
            console.log("Please enter a Student ID");
            return;
        }
        const student={id, name, address}
        fetch("/student/"+id, {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then(()=>{
            console.log("Student updated")
        })
    }

    const handleDelete=(id)=>{
        if (!id || id.trim() === "") {
            console.log("Please enter a Student ID");
            return;
        }
        fetch("/student/"+id, {
            method:"DELETE",
        }).then(()=>{
            console.log("Student deleted")
        })
    }
  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}>Add Student</h1>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1},
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Student name" variant="outlined" fullWidth
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                <TextField id="outlined-basic" label="Student address" variant="outlined" fullWidth
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                />
                <Button variant="contained" color="secondary" onClick={handleClick}>
                    Submit
                </Button>
            </Box>
        </Paper>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"brown"}}>Update Or Delete by ID</h1>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1},
                }}
                noValidate
                autoComplete="off"
                >
                <TextField id="outlined-basic" label="Student ID" variant="outlined" fullWidth
                    value={id}
                    onChange={(e)=>setID(e.target.value)}
                />
                <Button variant="outlined" color="primary" onClick={() => handleUpdate(id)}>
                    Update
                </Button>
                <Button variant="contained" color="primary" onClick={() => handleDelete(id)}>
                    Delete
                </Button>
            </Box>
        </Paper>
        <h1>Students</h1>
        <Paper elevation={3} style={paperStyle}>
            {students.map(student=>(
            <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={student.id}>
                Id: {student.id}<br/>
                Name: {student.name}<br/>
                Address: {student.address}
            </Paper>
            ))}
        </Paper>
    </Container>
  );
}
