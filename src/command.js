import { findOptimalInsertionPosition} from '@ckeditor/ckeditor5-widget/src/utils';

import Command from '@ckeditor/ckeditor5-core/src/command';

/**
 * Handles the toggled state of the button.
 */
export default class NumberingCommand extends Command {
    refresh() {
        // Disable the command if the editor is in read-only mode.
        this.isEnabled = !this.editor.isReadOnly;
        
        // Enable the button initially by default
        if(this.value == undefined)
        {
            this.value = true;
        }        
    }

    // execute() {
    //     // Toggle the button state
    //     this.value = !this.value;

    //     const model = this.editor.model;

	// 	model.change( writer => {
	// 		insertNumbering( writer, model );
	// 	});
    // }

	execute( options = {} ) {
        // Toggle the button state
        this.value = !this.value;

        const model = this.editor.model;
		const doc = model.document;
		const text = options.text || '1.1.2';
		const selection = options.range ? model.createSelection( options.range ) : doc.selection;

		model.change( writer => {
			model.insertContent( writer.createText( text, doc.selection.getAttributes() ), selection );
		} );
	}
	
    // execute( options = {} ) {
	// 	const model = this.editor.model;
	// 	const doc = model.document;
	// 	const text = options.text || 'numbering';
	// 	const textInsertions = text.length;
	// 	const selection = options.range ? model.createSelection( options.range ) : doc.selection;
	// 	const resultRange = options.resultRange;

	// 	model.enqueueChange( this._buffer.batch, writer => {
	// 		this._buffer.lock();

	// 		// Store the batch as an 'input' batch for the Input.isInput( batch ) check.
	// 		this._batches.add( this._buffer.batch );

	// 		model.deleteContent( selection );

	// 		if ( text ) {
	// 			model.insertContent( writer.createText( text, doc.selection.getAttributes() ), selection );
	// 		}

	// 		if ( resultRange ) {
	// 			writer.setSelection( resultRange );
	// 		} else if ( !selection.is( 'documentSelection' ) ) {
	// 			writer.setSelection( selection );
	// 		}

	// 		this._buffer.unlock();

	// 		this._buffer.input( textInsertions );
	// 	} );
    // }    
};

export function insertNumbering( writer, model, attributes = {} ) {
	const hrElement = writer.createElement( 'p', attributes );

	const insertAtSelection = findOptimalInsertionPosition( model.document.selection, model );

	model.insertContent( hrElement, insertAtSelection );    
}