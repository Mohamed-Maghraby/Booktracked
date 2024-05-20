import Icon from "./Icon";

function InfoMessage (props) {
    return (
        <div className='info-message'>
            {props.iconElement}
            <p className="inner-text">{props.InfoMessage}</p>
        </div>
    )
}
export default InfoMessage;



