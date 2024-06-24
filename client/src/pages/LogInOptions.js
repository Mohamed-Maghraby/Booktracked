import { NavLink, Navigate, useNavigate } from 'react-router-dom';

function LogInOptions () {
    const navigate = useNavigate();

    const directAdmin = () => {
        navigate('/LogIn', { state: { userType : 'admin' } }); // Redirect with props

    }
    const directUser = () => {
        navigate('/LogIn', { state: { userType : 'user' } }); // Redirect with props

    }
    return (
        <div className="LogInOption">
            <span className='LogInOption-title'>Select a user type to login</span>
            <span className='LogInOption-note'>Admins are only added by database manager</span>
            <div className='LogInOption-container'>
                <div onClick={directAdmin} className="admin-login-container">Admin</div>
                <div onClick={directUser} className="user-login-container" >User</div>
            </div>
        </div>
    )
}

export default LogInOptions;