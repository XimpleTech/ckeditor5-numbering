// app.js

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';

import Numbering from '../src/numbering';

import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

ClassicEditor
    .create(document.querySelector('#editor'), {
        plugins: [Heading, Numbering],
        toolbar: ['heading',
            '|',
            'alignment',                                                 // <--- ADDED
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'imageUpload',
            'blockQuote',
            'undo',
            'redo',
            'numbering']
    })
    .then(editor => {
        console.log('Editor was initialized', editor);

        CKEditorInspector.attach( 'editor', editor );

        // Expose for playing in the console.
        window.editor = editor;
    })
    .catch(error => {
        console.error(error.stack);
    });