import React from 'react'
import Genres from './Genres';
import Button from './Button';
import '../style/bookPublic.css'
 function BookInfo() {
  return (
    <div className='book-info'>
        <img className='margin-tb'></img>
        <h1 className='margin-tb'>I Want A Better Catastrophe</h1>
        <p className='margin-tb'>
        Christopher John Francis Boone knows all the countries of the world and their capitals and every prime number up to 7,057. He relates well to animals but has no understanding of human emotions. He cannot stand to be touched. And he detests the color yellow. This improbable story of Christopher’s quest to investigate the suspicious death of a neighborhood dog makes for one of the most captivating, unusual, and widely heralded novels in recent years.
        </p>
        <Genres genres={['Fiction', 'Science', 'History']}></Genres>
        <span className='pages-number'>235 pages</span>
        <span className='publish-date'>First published July 31, 2003</span>
        <div className='book-info-bottom-group'>
            <span className='fnt-weight'>Author</span>
            <span>Rating</span>
            <Button styleClass="button" textContent="Add to reading list" width={'200'}></Button>
        </div>
    </div>
  )
}

export default BookInfo;