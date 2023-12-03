import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import backdrop from "bootstrap/js/src/util/backdrop.js";

function Users() {
    const [users, setUsers]= useState([])

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(result => setUsers(result.data))
            .catch(err => console.log(err))
    }, [])

    const handleDelete= (id) => {
        axios.delete('http://localhost:3001/deleteUser/' +id)
            .then(res => {console.log(res)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }
    const styles={
        kotakHead: {
            color: "black",
            display: "block",
            fontSize: "22px",
            padding: "5px",
            border: "2px dotted black",
            // boxShadow: "5px 3px",
             cursor: "default",
        },
    };
    return(
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{backgroundImage: "url(/assets/kampus.jpg)", backgroundSize: "cover"}}>
            <div className='w-75 h-60 bg-white rounded p-3' style={{boxShadow: "15px 9px"}}>
                <div className='kotakHead' style={styles.kotakHead}>
                    <h1 style={{color: "black", textAlign:"center"}}>Daftar Siswa</h1>
                </div>
                <br/>
                <Link to="/create" className='btn btn-success mb-4'>Add +</Link>
                <table className='table table-bordered table-hover'>
                    <thead>
                    <tr>
                        <th className='table-primary' style={{textAlign: "center"}}>Nama</th>
                        <th className='table-primary' style={{textAlign: "center"}}>Email</th>
                        <th className='table-primary' style={{textAlign: "center"}}>Umur</th>
                        <th className='table-primary' style={{textAlign: "center"}}>Aksi</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user) => {
                            return <tr>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td style={{textAlign: "center"}}>{user.age}</td>
                                <td style={{textAlign: "center"}}>
                                    <Link to={`/update/${user._id}`} className="btn btn-primary">Update</Link>&emsp;
                                    <button className='btn btn-danger'
                                            onClick={(e) => handleDelete(user._id)}>Delete</button></td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users;