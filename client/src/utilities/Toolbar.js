import { useEffect } from "react";
import Icon from "./Icon";

function Toolbar({triggerHighlight,triggerUnderline, handleCollapse, deAnnotated, unHighlight , unUnderline, coordinates}) {
    // Ensure deAnnotate is provided as a prop or use a default value

    const style = { 
        position: "absolute", 
        top: `${coordinates.top}px`,
        right : "50%",
        buttom: `${coordinates.bottom}px`,
        zIndex:"99999999999999",
        display:"flex",
        flexDirection:"row",
        gap:"0 20px",
        // boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        // width:"13%",
        padding:"7px 30px 5px 30px",
        borderRadius:"10px",
        backgroundColor:"#F9F9F9"
    }

    useEffect(() => {
        console.log(coordinates);
    }, [coordinates]);

    return (
            <div className="toolbar" style={style}>

                {!deAnnotated && <Icon name={'PencilLine'} color={"#f5e33c"} size={22} fill={"none"} strokeWidth={2} onClick={triggerHighlight}></Icon>}
                {deAnnotated && <Icon name={'Eraser'} color={"black"} size={22} fill={"none"} strokeWidth={2} onClick={unHighlight}></Icon>}

                {!deAnnotated &&<Icon name={'Underline'} color={"black"} size={22} fill={"none"} strokeWidth={2} onClick={triggerUnderline}></Icon>}
                {deAnnotated && <Icon name={'Baseline'} color={"black"} size={22} fill={"none"} strokeWidth={2} onClick={unUnderline}></Icon>}

                <Icon name={'X'} color={"black"} size={22} fill={"none"} strokeWidth={2} onClick={handleCollapse}></Icon>
            </div>
    );
}
export default Toolbar;