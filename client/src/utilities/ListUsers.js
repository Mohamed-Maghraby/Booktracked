
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { useNavigate } from "react-router-dom";

function ListUsers() {

    /*states*/
    const [usersData, setUsersData] = useState([])
    const [limit, setLimit] = useState(5)
    const [offset, setOffset] = useState(0)

    /*Hooks*/
    const navigate = useNavigate()

    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ limit: limit, offset: offset })
    }

    useEffect(() => {
        async function fetchUsers() {
            const response = await fetch('http://localhost:3001/admin/listUsers', requestOptions);
            const res = await response.json();
            setUsersData(res)
            console.log(res);
        }
        fetchUsers();
    }, [limit, offset])

    function handleUser(item) {
        console.log("Clicked on user");
        console.log(item);
        navigate('/ManageUser', { state: {userInfo : item } }); // Redirect with props

    }

    function listUsers() {
        return (
            usersData.map((item) => {
                return (
                    <ul key={item.user_id} className="table-row">
                        <li>{item.user_id}</li>
                        <li>{item.username}</li>
                        <li>{item.email}</li>
                        <Icon name={'SquareArrowRight'} color={"black"} size={22} fill={"none"} strokeWidth={2} onClick={()=>{handleUser(item)}}></Icon>

                    </ul>
                )
            })
        )
    }


    return (
        <div className="list-user-container">
            <div className="list-user-header">List of users records in db</div>
            <div className="table">
                <ul className="table-head">
                    <li>User ID</li>
                    <li>Username</li>
                    <li>Email</li>
                </ul>
                <div className="table-body">
                    {listUsers(usersData)}
                </div>
            </div>

            <div className="list-user-footer">
                <Icon name={'CircleChevronLeft'} color={"black"} size={28} fill={"none"} strokeWidth={2} onClick={() => setOffset(offset - 5)}></Icon>
                <Icon name={'CircleChevronRight'} color={"black"} size={28} fill={"none"} strokeWidth={2} onClick={() => setOffset(offset + 5)}></Icon>
            </div>
        </div>
    )

}

export default ListUsers;