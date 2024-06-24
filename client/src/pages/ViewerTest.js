import React, { useState, useRef, useEffect } from "react";
import { ReactReader } from "react-reader";
import Sidebar from "utilities/Sidebar";
import Popup from "utilities/Popup";
import { EpubCFI } from 'epubjs';
import {Rendition} from 'epubjs';
import Toolbar from "utilities/Toolbar";
import { useLocation } from "react-router-dom";

var intersectRect = require('intersect-rect');
let Clash = require("../functions/Clash")

function ViewerTest() {



  async function save_annotation_db(annotation, book_id) {

    const requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        // Authorization': `Bearer ${token}`, // notice the Bearer before your token
      },
      body: JSON.stringify({ annotation: annotation, book_id: book_id })
    }

    const response = await fetch('http://localhost:3001/addAnnotation', requestOptions);
    const res = await response.json();
    console.log(res);

  }


  /*The initail epub book style object passed to the reader to style the book reader */
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
  const [rendition, setRendition] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [markedCfi, setMarkedCfi] = useState(null);
  const [deAnnotated, setDeAnnotated] = useState(false);
  const [coordinates, setCoordinates] = useState({});

  const transfare = useLocation();
  const book_id = transfare.state?.book_id; // Access the data using optional chaining
  const servingUrl = transfare.state?.servingUrl; // Access the data using optional chaining

  window.addEventListener('unload', () => {
    console.log("I am closing");
    save_annotation_db(window.localStorage.getItem(`${book_id}_annotations`), book_id);

  });



  useEffect(() => {
    if (readerRef.current && readerRef.current.readerRef.current) {
      const bookInstance = readerRef.current.readerRef.current.book;
      setBook(bookInstance);
    }
  }, [readerRef]);

  //initialize the reader theme and set up instruction that should be loaded when the reader is ready
  useEffect(() => {

    if (rendition) {
      console.log(rendition);

      /*You set flow & Spread from rendition object dirctly either from here or 
      from getRendition in prop, or set them with epubOptions props*/
      rendition.themes.default({
        '::selection': {
          'background': '#b5ece0',
        }
      });

      rendition.themes.fontSize('120%');
      rendition.themes.font('Arial');

      rendition.on("markClicked", (cfiRange, data) => {

        const ePubCfi = new EpubCFI(cfiRange);
        console.log(ePubCfi);

        let boundries = rendition.getRange(ePubCfi).getBoundingClientRect();
        let coordinates = { top: boundries.top, left: boundries.left, right: boundries.right, bottom: boundries.bottom };

        setCoordinates(coordinates);
        setMarkedCfi(cfiRange);
        setDeAnnotated(true);
        setIsCollapsed(false)


      });

      rendition.on("selected", (cfiRange, data) => {
        /** 
         * Implement a function that retrives all of the annotation and compare the current slected cfi with all of cfis of annotations
         * use Clash.clashCfiRange to compare the two cfis, make sure to just bring those cfies from highlgiths and underlines,
         * particular section cfis, and not all of the cfis
         */
        setDeAnnotated(false);
      });

      //Load stored annotations when the book is loaded
      rendition.on("started", (event, section) => {

        console.log(servingUrl);

        if (localStorage.getItem(`${book_id}_annotations`)) {
          console.log(book_id);
          const storedAnnotations = JSON.parse(window.localStorage.getItem(`${book_id}_annotations`));
          const annotationsArray = Object.values(storedAnnotations);
          annotationsArray.map(annotation => {
            rendition.annotations.add(annotation.type, annotation.cfiRange, {}, () => { }, annotation.className, annotation.styles);
          })
        }
      });
      
    

      // rendition.on("rendered", (event, section) => {
      //   let highlightsArray = Object.values(section.highlights)
      //   highlightsArray.map(highligh => highligh.element.addEventListener('click', () => { 
      //     console.log("You hoverd over me") 
      //     console.log(highligh.element.children[0]);
      //   })); 
      // });


    }
  }, [book, rendition]);

  function annotateText(annotationType) {
    book.rendition.getContents().forEach(contents => {
      const selection = contents.window.getSelection();

      if (!selection.isCollapsed) {

        const range = selection.getRangeAt(0)
        let ePubCfi = contents.cfiFromRange(range)

        let isCfiClash = markedCfi && Clash.clashCfiRange(ePubCfi, markedCfi)
        console.log(isCfiClash);

        setMarkedCfi((prev) => prev = null);

        if (isCfiClash === true) {
          return;
        }

        function callBackfn() {
          console.log("I Annotte");
        }


        /** 
         *   type (string) Type of annotation to add: "highlight", "underline", "mark"
         *   cfiRange (EpubCFI) EpubCFI range to attach annotation to
         *   data (object) Data to assign to annotation
         *   cb (function?) Callback after annotation is added
         *   className (string) CSS class to assign to annotation
         *   styles (object) CSS styles to assign to annotation
        */

        let annotationStyle = annotationType === "highlight" ? { "fill": "yellow", "fill-opacity": "0.3", "mix-blend-mode": "multiply" } : { 'stroke': 'none', 'stroke-opacity': '1', "mix-blend-mode": "multiply" };
        rendition.annotations.add(annotationType, ePubCfi, {}, callBackfn, 'class-to-annotate', annotationStyle)
        console.log(rendition.annotations);

      }
      else {
        return;
      }
      window.localStorage.setItem(`${book_id}_annotations`, JSON.stringify(rendition.annotations._annotations));
      console.log("I DOOO");
    })
  }

  function UnAnnotete(cfiRange, annotationType) {
    rendition.annotations.remove(cfiRange, annotationType);

  }

  function triggerHighlight() {
    let annotationType = "highlight";
    annotateText(annotationType);
  }
  function triggerUnderline() {
    let annotationType = "underline";
    annotateText(annotationType);
  }

  function unHighlight() {
    let annotationType = "highlight";
    UnAnnotete(markedCfi, annotationType);
  }

  function unUnderline() {
    let annotationType = "underline";
    UnAnnotete(markedCfi, annotationType);
  }

  function loadToolBar() {
    setIsCollapsed(false);
  }

  function handleCollapse() {
    setIsCollapsed(true)
  }

  function closePopup() {
  }

  const onLocationChanged = (epubcfi) => {
    setLocation(epubcfi);
  };

  return (
    <div className="library" >
      <Sidebar></Sidebar>
      <div className='content'>
        <div style={{ height: "100vh", width: "75vw" }}>
          <ReactReader
            ref={readerRef}
            // url="http://localhost:3001/public/alice.epub"
            url={`http://localhost:3001${servingUrl}`}
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
        </div>

        {/* {isCollapsed ? false : ( // Conditionally render toolbar
          <div className="toolbar" style={{ position: "absolute", top: "0" }}>
            <button onClick={triggerHighlight}>Highlight</button>
            <button>Underline</button>
            <button>Mark</button>
            <button onClick={handleCollapse}>Close Toolbar</button>
          </div>
        )} */}

        {!isCollapsed && <Toolbar triggerHighlight={triggerHighlight} unHighlight={unHighlight} handleCollapse={handleCollapse} deAnnotated={deAnnotated} triggerUnderline={triggerUnderline} unUnderline={unUnderline} coordinates={coordinates}></Toolbar>}

        {/* {popupToggle && userAnnotate && <Popup message="This is a message in the popup." onClose={closePopup}/>} */}

      </div>
    </div>
  );
}

export default ViewerTest;

