import React from 'react'

 function Genres(props) {

    let genresArray = props.genres
    const displayGenres = genresArray.map((item)=>{
        return (
            <div className='genre'>{item}</div>
        )
    })
  return (
    <div className='genre-wrapper margin-tb'>
        <div className='fnt-weight'>Genres:  </div>
        {displayGenres}
    </div>
  )
}
export default Genres;