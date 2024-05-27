import React, { useState, useEffect } from 'react';
import AnnotateTrack from '../types/AnnotateTrack';


function BookReader() {
  const [htmlBook, setHtmlBook] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10000); // Initial chunk size

  useEffect(() => {
    loadInitialContent();
  }, []);

  async function getBookSection(start, end) {
    const response = await fetch(`http://localhost:3001/getmehtml?start=${start}&end=${end}`);
    const data = await response.text();
    return data;
  }

  async function loadInitialContent() {
    const initialContent = await getBookSection(startIndex, endIndex);
    setHtmlBook(initialContent);
  }

  async function loadNextSection() {
    const newStartIndex = endIndex;
    const newEndIndex = endIndex + 10000; // Increase chunk size
    const nextContent = await getBookSection(newStartIndex, newEndIndex);
    if (nextContent) {
      setHtmlBook(nextContent);
      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    } else {
      console.log('No more content to load');
    }
  }

  async function loadPreviousSection() {
    const newEndIndex = startIndex;
    const newStartIndex = Math.max(0, startIndex - 10000); // Ensure startIndex doesn't go below 0
    const prevContent = await getBookSection(newStartIndex, newEndIndex);
    if (prevContent) {
      setHtmlBook(prevContent);
      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    } else {
      console.log('No previous content to load');
    }
  }

  let annotateTrack = new AnnotateTrack();
  // annotateTrack.add_annotation();

  function manage_annotations() {
    let range = window.getSelection().getRangeAt(0)
    console.log(range.toString());
    let selection = window.getSelection()
    annotateTrack.add_annotation(selection, 'highlight')

  }

  function getParentElementsOfTextNodes() {
    let parentNode = window.getSelection().getRangeAt(0).startContainer.parentNode;
    console.log(parentNode);
  }

  return (
    <div id="content">
      <div>BookReader</div>
      <button onClick={loadPreviousSection}>Previous</button>
      <button onClick={loadNextSection}>Next</button>
      <div onMouseUp={getParentElementsOfTextNodes} dangerouslySetInnerHTML={{ __html: htmlBook }} />
    </div>
  );
}

export default BookReader;
