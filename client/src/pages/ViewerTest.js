// import React, { useState } from "react";
// import { ReactReader } from "react-reader";

// function ViewerTest() {
//   const [location, setLocation] = useState(0);

//   async function getHtmlBook() {
//     const response = await fetch("http://localhost:3000/alice.epub", {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         "Content-type": "application/xml",
//         // Authorization': `Bearer ${token}`, // notice the Bearer before your token
//       },
//     });
//     const data = await response.text();
//     console.log(data);
//     return data;
//   }

//   return (
//     <div
//       style={{
//         height: "100vh",
//         width: "90vw",
//       }}
//     >
//       <ReactReader
//         url="http://localhost:3001/public/alice.epub"
//         location={location}
//         locationChanged={(epubcfi) => setLocation(epubcfi)}
//         showToc={true}
//       />
//     </div>
//   );
// }
// export default ViewerTest;

import React, { useState, useRef, useEffect } from "react";
import { ReactReader } from "react-reader";
import Sidebar from "utilities/Sidebar";

function ViewerTest() {



  const ReactReaderStyle = {
    container: {
      overflow: "hidden",
      position: "relative",
      height: "110%",
      backgroundColor: "blue !important",
    },
    readerArea: {
      position: "relative",
      zIndex: 1,
      height: "100%",
      width: "100%",
      backgroundColor: "#fff",
      transition: "all .3s ease"
    },
    containerExpanded: {
      transform: "translateX(-256px)"
    },
    titleArea: {
      position: "absolute",
      top: 20,
      left: 50,
      right: 50,
      textAlign: "center",
      color: "#999",
    },
    reader: {
      position: "absolute",
      top: 50,
      left: 50,
      bottom: 20,
      right: 50
    },
    swipeWrapper: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 200
    },
    prev: {
      left: 1
    },
    next: {
      right: 1
    },
    arrow: {
      outline: "none",
      border: "none",
      background: "none",
      position: "absolute",
      top: "50%",
      marginTop: -32,
      fontSize: 64,
      padding: "0 10px",
      color: "#E2E2E2",
      fontFamily: "arial, sans-serif",
      cursor: "pointer",
      userSelect: "none",
      appearance: "none",
      fontWeight: "normal"
    },
    arrowHover: {
      color: "#777"
    },
    toc: {},
    tocBackground: {
      position: "absolute",
      right: 256,
      top: 0,
      bottom: 0,
      right: 0,
      zIndex: 1
    },
    tocArea: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 0,
      width: 256,
      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
      background: "#f2f2f2",
      padding: "10px 0"
    },
    tocAreaButton: {
      userSelect: "none",
      appearance: "none",
      background: "none",
      border: "none",
      display: "block",
      fontFamily: "sans-serif",
      width: "100%",
      fontSize: ".9em",
      textAlign: "left",
      padding: ".9em 1em",
      borderBottom: "1px solid #ddd",
      color: "#aaa",
      boxSizing: "border-box",
      outline: "none",
      cursor: "pointer"
    },
    tocButton: {
      background: "none",
      border: "none",
      width: 32,
      height: 32,
      position: "absolute",
      top: 10,
      right: 10,
      borderRadius: 2,
      outline: "none",
      cursor: "pointer"
    },
    tocButtonExpanded: {
      background: "#f2f2f2"
    },
    tocButtonBar: {
      position: "absolute",
      width: "60%",
      background: "#ccc",
      height: 2,
      left: "50%",
      margin: "-1px -30%",
      top: "50%",
      transition: "all .5s ease"
    },
    tocButtonBarTop: {
      top: "35%"
    },
    tocButtonBottom: {
      top: "66%"
    },
    loadingView: {
      position: "absolute",
      top: "50%",
      left: "10%",
      right: "10%",
      color: "#ccc",
      textAlign: "center",
      marginTop: "-.5em"
    }
  };




  const [location, setLocation] = useState(null);
  const readerRef = useRef(null);
  const [book, setBook] = useState(null);
  const [triggerToolBar, setTriggerToolBar] = useState(false);
  const [rendition, setRendition] = useState(null);

  useEffect(() => {
    if (readerRef.current && readerRef.current.readerRef.current) {
      const bookInstance = readerRef.current.readerRef.current.book;
      setBook(bookInstance);
    }
  }, [readerRef]);

  useEffect(() => {
    /*
    You set flow & Spread from rendition object dirctly either from here or 
    from getRendition in prop, or set them with epubOptions props 
    */

    if (rendition) {
      rendition.themes.default({
        '::selection': {
          'background': '#b5ece0'
        }
      });
      rendition.themes.fontSize('120%');
      rendition.themes.font('Arial');
    }

  }, [book, rendition]);



  function triggerSelection() {
    book.rendition.getContents().forEach((contents) => {
      console.log(contents);
      const selection = contents.window.getSelection();
      console.log(selection);
      // Iterate through all ranges in the selection
      for (let i = 0; i < selection.rangeCount; i++) {
        
        
        const range = selection.getRangeAt(i);

        if (range.startContainer === range.endContainer) {
          
        }

        // Ignore ranges that contain only whitespace
        if (!range.toString().trim()) {
            continue;
        }

        // Surround the range contents with a span
        const newSpan = document.createElement('span');
        newSpan.style.textDecoration = 'underline';
        range.surroundContents(newSpan);
      }

    });
  }

  // function triggerSelection() {
  //   book.rendition.getContents().forEach(contents => {
  //     console.log(contents);
  //     const selection = contents.window.getSelection();
  //     console.log(selection);
  //     if (!selection.isCollapsed) {
  //       const range = selection.getRangeAt(0)
  //       let ePubCfi = contents.cfiFromRange(range)
  //       // let annotations = new rendition.Annotations(rendition)
  //       // addAnnotation(range)
  //       console.log(ePubCfi);
  //       function callBackfn() {
  //         console.log("I Annotte");
  //       }
  //       // console.log(rendition);
  //       // rendition.annotations.add(
  //       //     'highlight',
  //       //     ePubCfi,
  //       //     {},
  //       //     undefined,
  //       //     'hl',
  //       //     { fill: 'red', 'fill-opacity': '0.5'}
  //       // )
  //       // rendition.annotations.add('underline',ePubCfi,{}, callBackfn, '.class-to-annotate', {fill: 'yellow','fill-opacity': '0.6'})
  //       // console.log(rendition.annotations.add('highlight',ePubCfi,{data : 'dumb'}, callBackfn, 'class-to-annotate', {backgroundColor:"red"}));

  //       /**
  //        *  type (string) Type of annotation to add: "highlight", "underline", "mark"
  //           cfiRange (EpubCFI) EpubCFI range to attach annotation to
  //           data (object) Data to assign to annotation
  //           cb (function?) Callback after annotation is added
  //           className (string) CSS class to assign to annotation
  //           styles (object) CSS styles to assign to annotation
 
  //        */


  //       // cfiRange.commonAncestorContainer.style.backgroundColor='red'
  //       // console.log(cfiRange.commonAncestorContainer.style);
  //       // console.log(range.startContainer);
  //       // console.log(range.toString() + "fff");
  //       let newSpan = document.createElement('span')
  //       // cfiRange.surroundContents(newSpan)
  //       // console.log(cfiRange.surroundContents('span'));
  //       // console.log(cfiRange.extractContents());

  //       const fragment = range.extractContents();
  //       newSpan.appendChild(fragment)
  //       range.insertNode(newSpan);
  //       // newSpan.style.backgroundColor='red'
  //       newSpan.style.textDecoration = 'underline'
  //       // newSpan.style.display = 'block'

  //     }
  //   })
  // }

  function loadToolBar() {
    setTriggerToolBar(true);
    console.log("I am here");
  }


  const onLocationChanged = (epubcfi) => {
    setLocation(epubcfi);
  };

  /**
   * {triggerToolBar && (
        <div style={{ position: "absolute" , top : '150px'}}>
          <button onClick={triggerSelection}>Highlight</button>
          <button>Underline</button>
          <button>Mark</button>
        </div>
      )}
   */

  const customStyles = {
    container: {
      padding: "20px",
      backgroundColor: "#f4f4f4", // Example of adding a custom background color
    },
    readerArea: {
      border: "1px solid #ddd", // Example of adding a border
    },
    // Add other styles you want to override
  };


  const addAnnotation = (cfiRange, data) => {
    book.rendition.annotations.add("highlight", cfiRange, {}, (e) => {
      console.log("Annotation clicked", e.target);
    }, "hl", { "fill": "yellow" });
    book.rendition.annotations.add("underline", cfiRange, {}, null, "ul", { "stroke": "blue" });
  };
  return (

    <div className="library">
      <Sidebar></Sidebar>
      <div className='content'>
        <div style={{ height: "100vh", width: "75vw" }}>
          <ReactReader
            ref={readerRef}
            url="http://localhost:3001/public/alice.epub"
            location={location}
            locationChanged={onLocationChanged}
            showToc={true}
            expandedToc={false}
            handleTextSelected={loadToolBar}
            className={'reader-sp'}
            readerStyles={ReactReaderStyle}
            epubInitOptions={{
              openAs: "epub",
              // requestHeaders: {
              //   "Authorization": `Bearer ${token}`
              // }

            }}
            epubOptions={
              { flow: "paginated", spread: "none" }
            }
            getRendition={(rendition) => {
              setRendition(rendition);
            }}

          />
          {/* Render TOC and add click handlers */}
        </div>
        {triggerToolBar && (
        <div style={{ position: "absolute" , top : '0'}}>
          <button onClick={triggerSelection}>Highlight</button>
          <button>Underline</button>
          <button>Mark</button>
        </div>
      )}
      </div>
    </div>


  );
}

export default ViewerTest;

