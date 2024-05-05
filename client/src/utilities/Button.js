function Button (props) {

    return(
        <button className = {props.styleClass} onClick={props.handleClick}>{props.textContent}</button>
    )
}
export default Button;