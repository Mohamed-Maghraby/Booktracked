import Button from './Button';
import BookCover from '../images/Book-Cover-1.jpg'
import Rating from '../images/Rating.svg'

function Test () {
    return (
        <div className="card-wrapper">
            <img className="book-cover" src={BookCover}></img>
            <h2 className="book-title">When the user types in the search input, the handleUserInput function updates only the</h2>
            <span className="author">When the user types in the search input, the handleUserInput function updates only the</span>
            <img className="rating" src={Rating}></img>
            <Button styleClass = "button" textContent = "Get Book"></Button>
        </div>
    )
}

export default Test;