import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Navigate } from "react-router-dom"


const ShowAll = props => {
    const [users, setUsers] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:8000/api/users", {withCredentials: true})
        .then(res => setUsers(res.data))
        .catch(err => {
            console.log(err)
            if(err.response.status === 401){
                console.log("Unauthorized")
                navigate("/")
            }
            else if(err.response.status ===400){ 
                console.log("Bad Request")
                navigate("/")
            }
        })
        
    }, [users])


    return(
        <div> 
            <h1>All Users</h1>

            <div>
                {
                    users ? users.map((user, i) => <div>
                        <h3>{user.firstName}</h3>
                        </div>) : ""
                }
            </div>

        </div>
    )
}

export default ShowAll;