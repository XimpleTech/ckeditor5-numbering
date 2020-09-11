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

	execute( { numbering } ) {
        const editor = this.editor;

		const numberingLabel = numbering || this.numbered;

        editor.model.change( writer => {
            // Create a <numbering> elment with the "name" attribute...
            const numberingElm = writer.createElement( 'numbering', { label: numberingLabel } );

            // ... and insert it into the document.
            editor.model.insertContent( numberingElm );
			this.increment(numberingLabel);

            // Put the selection on the inserted element.
            writer.setSelection( numberingElm, 'on' );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;

        const isAllowed = model.schema.checkChild( selection.focus.parent, 'numbering' );

        this.isEnabled = isAllowed;
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
