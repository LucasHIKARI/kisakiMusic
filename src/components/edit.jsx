import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useEffect, useState } from "react";


const edit = ({ getcontent, content }) => {
    useEffect(() => {
        const html = content
        
        if(html === undefined) return ;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            seteditorState(EditorState.createWithContent(contentState));
        }
        }, [content])
    const [editorState, seteditorState] = useState('')
    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={(editorState) => {
                seteditorState(editorState)
            }}
            onBlur={() => {
                getcontent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
            }}
        />
    )
}
export default edit