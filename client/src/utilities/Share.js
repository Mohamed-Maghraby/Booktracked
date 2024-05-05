import React from 'react'
import '../style/dashboard.css';
import Icon from '../utilities/Icon'


function Share() {
  return (
    <div className='share'>
        <div className='share-header'>
            <h3>Share books or resources</h3>
        </div>
        <select className='share-select' name="types" id="types">
            <option value="default" disabled >Select a type</option>
            <option value="Book">Book</option>
            <option value="Resource">Resource</option>
        </select>

        <div className='upload'>
            <div className='upload-content'>
                <div className='upload-icon-wrapper'>
                    <Icon name={"FolderUp"} color={"black"} size={32} fill={"none"} strokeWidth={1.3}></Icon>
                </div>
                <div className='upload-text'>
                    <span>Click to upload</span> 
                    <span>or drag and drop</span>
                    <br></br>
                    <span>PDF, HTML, EPUB (max. 15mb )</span>
                </div>
            </div>
            <label className='button select-file-label' htmlFor="paper">
                <input className='select-file button' type="file" id="paper" name="paper"/>
                Upload a file
            </label>
        </div>
    </div>
  )
}
export default Share;
