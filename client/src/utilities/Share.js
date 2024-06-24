import React, { useState, useRef } from 'react';
import '../style/dashboard.css';
import Icon from '../utilities/Icon';

function Share() {
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState(null);
    const [author, setAuthor] = useState('');
    const [type, setType] = useState('');
    const [resourceStorage, setResourceStorage] = useState(null);

    const resourceStorageInputRef = useRef(null);

    const handleResourceStorageUpload = () => {
        resourceStorageInputRef.current.click();
    };

    const handleResourceStorageChange = (e) => {
        setResourceStorage(e.target.files[0]);
    };

    const handleCover = (e) => {
        const { files } = e.target;
        setCover(files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('cover', cover);
        formData.append('author', author);
        formData.append('resource_type', type);
        formData.append('resource_storage', resourceStorage);

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            body: formData,
        };

        const response = await fetch('http://localhost:3001/admin/createResource', requestOptions);
        const res = await response.json();

        console.log(res);
    };

    return (
        <div className='share'>
            <div className='share-header'>
                <h3>Share books or resources</h3>
            </div>
            <select className='share-select' name="types" id="types" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="default" disabled>Select a type</option>
                <option value="Book">Book</option>
                <option value="Resource">Resource</option>
            </select>

            <form className='share-form' onSubmit={handleSubmit} encType="multipart/form-data">

                <div className='upload' onClick={handleResourceStorageUpload}>
                    <div className='upload-content'>
                        <div className='upload-icon-wrapper'>
                            <Icon name={"FolderUp"} color={"black"} size={32} fill={"none"} strokeWidth={1.3}></Icon>
                        </div>
                        <div className='upload-text'>
                            <span>Click to upload resource</span>
                            <span>or drag and drop</span>
                            <br />
                            <span>PDF, HTML, EPUB (max. 15mb)</span>
                        </div>
                    </div>
                </div>

                <input
                    type="file"
                    name="resource_storage"
                    ref={resourceStorageInputRef}
                    style={{ display: 'none' }}
                    onChange={handleResourceStorageChange}
                    required
                />

                <label className="share-upload-cover">
                <span>Upload Cover</span>
                <Icon name={'ImagePlus'} color={"black"} size={22} fill={"none"} strokeWidth={2}></Icon>
                    <input
                        type="file"
                        name="cover"
                        onChange={handleCover}
                        style={{ display: 'none' }}
                        required
                    />
                </label>

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className='share-title'
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    className='share-author'
                />
                <button className='button' type="submit">Upload</button>
            </form>
        </div>
    );
}

export default Share;
