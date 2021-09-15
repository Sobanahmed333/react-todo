import React, {useEffect} from 'react'
import axios from 'axios';


function Tasks() {
    useEffect(() => {
        const headers = {Authorization: "Bearer "}
        axios.get("http://localhost:10000/tasks", {headers}).then(
            res => {
                console.log(res)
            }, onerror => {
                if (onerror.response) {
                    console.log(onerror.response);
                }
            }
        )
    })
    return (
        <div>Tasks here</div>
    )
}

export default Tasks;