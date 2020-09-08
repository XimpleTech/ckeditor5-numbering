import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import NumberingEditing from './numberingediting';
import NumberingUI from './ui';

/**
 * The main plugin class with the logic to use only the
 * plain text from the clipboard input.
 */
export default class Numbering extends Plugin {
    static get pluginName() {
        return 'Numbering'
    }

    static get requires() {
        return [ NumberingEditing, NumberingUI ]
    }

    // init() {
        
    //     const editor = this.editor;

    //     editor.commands.add( 'numbering', new NumberingCommand( editor ) );
    // }

    // init() {
    //     const editor = this.editor;

    //     editor.commands.add( 'numbering', new NumberingCommand( editor ) );

    //     Logic responsible for converting HTML to plain text.
    //     //const clipboardPlugin = editor.plugins.get( 'Clipboard' );
    //     const command = editor.commands.get( 'numbering' );
    //     const editingView = editor.editing.view;

    //     editingView.document.on( 'clipboardInput', ( evt, data ) => {
    //         if ( editor.isReadOnly || !command.value ) {
    //             return;
    //         }

    //         const dataTransfer = data.dataTransfer;
    //         let content = plainTextToHtml( dataTransfer.getData( 'text/plain' ) );
    //         content = clipboardPlugin._htmlDataProcessor.toView( content );
    //         clipboardPlugin.fire( 'inputTransformation', { content, dataTransfer } );
    //         editingView.scrollToTheSelection();

    //         evt.stop();
    //     } );
    // }
};