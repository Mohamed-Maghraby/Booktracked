class AnnotatedTrack {
    add_annotation(selection, annotation_type) {

        /*functioalty to highlight the text that user highlights */
        var range = selection.getRangeAt(0);
        let span = document.createElement("span");

        // span.style.backgroundColor = 'yellow';
        span.style.textDecoration = 'underline';
        span.style.display = 'inline';
        span.appendChild(range.extractContents());
        range.insertNode(span);




        this.check_annotation()
    }

    check_annotation() {

    }
    delete_annotation() {

    }
    update_annotation() {

    }
    cleanEmptyTextNodes(element) {
        for (var i = 0; i < element.childNodes.length; i++) {
            var node = element.childNodes[i];
            if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() === '') {
                element.removeChild(node);
            }
            else if (node.nodeType === Node.ELEMENT_NODE) {
                this.cleanEmptyTextNodes(node);
            }
        }
    }

}
export default AnnotatedTrack;