import Card from "./Card";
import React from "react";

/**
 * API Result Values 
 * Gutindex API returns an object with four values, results, previous,and next for next results
 * Results returns an array holds 32 objects maximum, use next for more if exists and previous to get back 
 * Every object contains : 
 * Array[n] represents every object of the arrays 
 * Author                       -> Array[n].authors[arrayOfAuthors].(name, birth,..)
 * Bookshelves                  -> Array[n].bookshelves[bookshelvesOfTheBook]
 * Copyright                    -> Array[n].copyright 
 * Download Count               -> Array[n].download_count
 * Thumbnail                    -> Array[n].formats.image/jpeg
 * Epup Download Link           -> Array[n].formats.application/epub+zip
 * Text/HTML Download Link      -> Array[n].formats.text/html
 * Unique Gutenberg ID          -> Array[n].id
 * Languages                    -> Array[n].languages[languagesAvialableForBook]
 * Subjects                     -> Array[n].subjects[genresOfTheBook]
 * Title                        -> Array[n].title
 */

function SearchResult (props) {
    
    let data = props.searchdata;
    // console.log(data[0].authors[0].name);

    const displayCards = data.map((item) => {
        console.log(item.authors);
        let book_id = item.id;
        let cover = item.formats["image/jpeg"];
        let download_html = item.formats["text/html"];
        let title = item.title;
        let author = item.authors[0] ? item.authors[0].name : "Unknown Author"
        // const author = item.authors?.[0]?.name || "Unknown Author";

        
        
        
        return <Card key={book_id} book_id={book_id} cover={cover} title={title} author={author} download_html={download_html}></Card>
    })
    
    return (
        <div className="search-result container">
           <div className="free-books">
                {displayCards}
           </div>
        </div>
    ) 
}


        // let author = item.authors[0].name;
        // let author = "Seif";
export default React.memo(SearchResult);