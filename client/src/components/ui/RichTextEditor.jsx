import React, { useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import '../../App.css'

const RichTextEditor = ({ content, setContent }) => {
    const [editorContent, setEditorContent] = useState(content);
    const [editorConfig, setEditorConfig] = useState({});

    useEffect(() => {
        // Adjust toolbar based on screen size
        const updateConfig = () => {
            setEditorConfig({
                toolbarSticky: false,
                minHeight: 300,
                height: "auto",
                allowResizeY: false,
                buttons:
                    window.innerWidth > 768
                        ? "source,|,bold,italic,underline,|,ul,ol,|,link,image,|,hr,|,outdent,indent,|,left,center,right,|,undo,redo"
                        : "bold,italic,underline,|,ul,ol,|,link,image,|,undo,redo",
            });
        };

        updateConfig(); // Set config on mount
        window.addEventListener("resize", updateConfig);

        return () => window.removeEventListener("resize", updateConfig);
    }, []);

    return (
        <div className="editor-container">
            <JoditEditor
                value={editorContent}
                config={editorConfig}
                onChange={(newContent) => {
                    setEditorContent(newContent); // Update local state
                    setContent(newContent); // Update parent state
                }}
            />
        </div>
    );
};

export default RichTextEditor;
