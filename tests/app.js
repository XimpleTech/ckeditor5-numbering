// app.js

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Numbering from '../src/numbering';

ClassicEditor
    .create(document.querySelector('#editor'), {
        plugins: [Numbering],
        toolbar: ['numbering']
    })
    .then(editor => {
        console.log('Editor was initialized', editor);
    })
    .catch(error => {
        console.error(error.stack);
    });