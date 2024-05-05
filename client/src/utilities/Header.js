import Button from './Button';
import logo from '../images/Logo.svg'

function Header () {
    
    return(
        <header className="header container">
            <div className="identity">
                <img className="logo" src={logo}></img>
            </div>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <Button styleClass="button" textContent="Sign up"></Button>
            </nav>
        </header>
    )
}

export default Header;