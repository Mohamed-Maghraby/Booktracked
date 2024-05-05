import React, { useState } from 'react'

function BookReader() {

    const [htmlBook, setHtmlBook] = useState();
    const [selectedText, setSelectedText] = useState('');
    const [selectedOBject, setSelectedObject] = useState({});

  


    // const requestOptions = {
    //     method: 'GET'
    // }

    function handleHtmlBook () {
        getHtmlBook()
    }

    async function getHtmlBook() {
        const response = await fetch("http://localhost:3001/getmehtml");
        const data = await response.text()
        setHtmlBook(data)
        console.log(htmlBook);
        
    }

    function getSelectedText() {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          return selection.getRangeAt(0).toString();
        }
        return '';
      }

      const handleSelectionChange = () => {
        // setSelectedText(getSelectedText());
        setSelectedObject(highlightSelection());
    };

    function highlightSelection(applyStyles = true) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const textNode = range.startContainer; // Assuming selection starts within a text node
      
          // Text Content
          const text = range.toString();
      
          // Parent Element
          const parentElement = textNode.parentNode; // Get the parent element
      
          // Position (using offsetTop and offsetLeft)
          const position = {
            top: parentElement.offsetTop,
            left: parentElement.offsetLeft,
          };
      
          // Highlight (Optional)
          if (applyStyles) {
            const span = document.createElement('span');
            span.style.backgroundColor = 'yellow'; // Example highlight style
            range.surroundContents(span);
          }

        //   setSelectedObject(...text, position, parentElement)
      
          return {
            text,
            position,
            parentElement,
          };
        }
        return null;
      }

    console.log(selectedText);
    console.log(selectedOBject);
    


  return (
    <div >
        <div>BookReader</div>
        <button onClick={handleHtmlBook}>Get me a book</button>
        {/* <>{htmlBook}</> */}
        <div onMouseUp={handleSelectionChange} dangerouslySetInnerHTML={{ __html: htmlBook }} />

    </div>
  )
}

export default BookReader;