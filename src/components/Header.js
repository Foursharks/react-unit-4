import {NavLink} from 'react-router-dom'
import logo from '../assets/dm-logo-white.svg'
import AuthContext from '../store/authContext'
import {useContext} from 'react'

const Header = () => {
    const authCtx = useContext(AuthContext)
    const styleActiveLink = ({ isActive }) => {
        return {
            color: isActive ? '#f57145' : ''
        }
    }
            // if the user is logged in, show them the logged in header
            //if the user is not logged in, show the home/login header

    return (
        <header className='header flex-row'>
            <div className='flex-row'>
                <img src={logo} alt='dm-logo' className='logo'/>
                <h2>Social Mountain</h2>
            </div>
            <nav>
                {
                authCtx.token ? (
                    <ul className='main-nav'>
                        <li>
                            <NavLink style={styleActiveLink} to='/'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink style={styleActiveLink} to='profile'>Profile</NavLink>
                        </li>
                        <li>
                            <NavLink style={styleActiveLink} to='form'>Add Post</NavLink>
                        </li>
                        <li>
                            <button className='logout-btn' onClick={() => authCtx.logout()}>Logout</button>
                        </li>
                    </ul>
                ) : (
                    <ul className='main-nav'>
                        <li>
                            <NavLink style={styleActiveLink} to='/'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink style={styleActiveLink} to='auth'>Login or Register</NavLink>
                        </li>
                    </ul>
                )
                }
                
            </nav>
        </header>
    )
}

export default Header