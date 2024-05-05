import Quill from 'quill'
import '../style/reader.css';



function Reader2 () {


    async function getHtmlBook() {
        const response = await fetch("http://localhost:3001/getmehtml");
        const data = await response.text()
        return data;
        
    }
    
    
    async function runQuill () {
    
    
        let htmlBook = await getHtmlBook();
    
        let load_quill = document.getElementById('load-quill') 
    
        load_quill.innerHTML = htmlBook
    
        const toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],  
    
            ['link'],     
    
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          
            ['clean']                                         // remove formatting button
          ];
    
    
        const quill = new Quill('#load-quill', {
            theme: 'bubble',
            modules: {
                toolbar: toolbarOptions
              }
            
        });

        // quill.clipboard.dangerouslyPasteHTML(htmlBook)
    
    
        const delta = quill.getSemanticHTML();
    
    
        console.log(delta);
    
    }
    
    runQuill()

    return (
        <div id="content"> 
            <div id="load-quill"></div>
        </div>
    )
}

export default Reader2;