
import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import '../style/reader.css';
import '../style/bookReader.css'
import AnnotateTrack from '../types/AnnotateTrack';

function Reader2() {
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(5000); // Initial chunk size
    const [quill, setQuill] = useState(null);
    const quillContainerRef = useRef(null);
    const [quillDelta, setQuillDelta] = useState(null); // State to store Quill Delta

    async function getBookSection(start, end) {
        const response = await fetch(`http://localhost:3001/getmehtml?start=${start}&end=${end}`);
        const data = await response.text();
        return data;
    }

    function printFormat() {
        const delta = quill.getContents();
        console.log(delta);
    }

    useEffect(() => {
        async function loadInitialContent() {
            let initialContent = await getBookSection(startIndex, endIndex);
            const loadQuill = document.getElementById('load-quill');
            loadQuill.innerHTML = initialContent;

            const toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike'],
                ['link'],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'color': [] }, { 'background': [] }],
                ['clean'],

            ];

            const quillInstance = new Quill(quillContainerRef.current, {
                theme: 'bubble',
                modules: {
                    toolbar: toolbarOptions
                }
            });

            setQuill(quillInstance);
            const delta = quillInstance.getContents();
            setQuillDelta(delta); // Save initial Quill Delta

        }

        loadInitialContent();
    }, []);


    async function loadNextSection() {
        const newStartIndex = endIndex;
        const newEndIndex = endIndex + 3000; // Increase chunk size
        const nextContent = await getBookSection(newStartIndex, newEndIndex);
        if (nextContent) {
            quill.setContents([]); // Clear existing content
            quill.clipboard.dangerouslyPasteHTML(nextContent, 'silent');
            setStartIndex(newStartIndex);
            setEndIndex(newEndIndex);
            setQuillDelta(null); // Reset Quill Delta
            // console.log(quillDelta);


        } else {
            console.log('No more content to load');
        }
    }

    async function loadPreviousSection() {
        const newEndIndex = startIndex;
        const newStartIndex = Math.max(0, startIndex - 3000); // Ensure startIndex doesn't go below 0
        const prevContent = await getBookSection(newStartIndex, newEndIndex);
        if (prevContent) {
            quill.setContents([]); // Clear existing content
            quill.clipboard.dangerouslyPasteHTML(prevContent, 'silent');
            setStartIndex(newStartIndex);
            setEndIndex(newEndIndex);
            setQuillDelta(null); // Reset Quill Delta
        } else {
            console.log('No previous content to load');
        }
    }

    useEffect(() => {
        if (quill && quillDelta) {
            quill.setContents(quillDelta); // Reapply Quill Delta after loading new content
        }
    }, [quill, quillDelta]);

    //implement a function that sends the loaded html content to the server again wehn user click next on http://localhost:3001/saveeditedcontent
    function saveEditedContent() {
        const content = quill.root.innerHTML;
        const delta = quill.getContents();
        fetch('http://localhost:3001/saveeditedcontent', {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content, startIndex, endIndex, delta }),
        });
    }

    function onNext() {
        loadNextSection();
        saveEditedContent();
    }

    return (
        <div id="content" className="quill-wrapper">
            <div className="book-reader" id="load-quill" ref={quillContainerRef} onMouseDown={printFormat}></div>
            <button onClick={onNext}>Next</button>
            <button onClick={loadPreviousSection}>Previous</button>
        </div>
    );
}

export default Reader2;
