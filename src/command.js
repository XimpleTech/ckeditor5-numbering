import { findOptimalInsertionPosition} from '@ckeditor/ckeditor5-widget/src/utils';

import Command from '@ckeditor/ckeditor5-core/src/command';

/**
 * Handles the toggled state of the button.
 */
export default class NumberingCommand extends Command {

	constructor( editor ) {
		super( editor );

		this.set( 'numbered', '1' );
	}

    refresh() {
        // Disable the command if the editor is in read-only mode.
        this.isEnabled = !this.editor.isReadOnly;
        
        // Enable the button initially by default
        if(this.value == undefined)
        {
            this.value = true;
        }        
    }

	execute( options = {} ) {
        // Toggle the button state
        this.value = !this.value;

        const model = this.editor.model;
		const doc = model.document;
		const text = options.numbering || this.numbered;
		const selection = options.range ? model.createSelection( options.range ) : doc.selection;

		model.change( writer => {
			model.insertContent( writer.createText( text, doc.selection.getAttributes() ), selection );
		} );

		this.increment(text);
	}
	
	increment(listNumber) {
		let lastNum = listNumber.replace(/(\d+)(?!.*\d)/, this.addOne);
		this.numbered = lastNum;
	}

	addOne(match, p1, offset, string) {
		let num = String(1 + + p1);
		return num;
	}    
};

// export function insertNumbering( writer, model, attributes = {} ) {
// 	const hrElement = writer.createElement( 'p', attributes );

// 	const insertAtSelection = findOptimalInsertionPosition( model.document.selection, model );

// 	model.insertContent( hrElement, insertAtSelection );    
// }