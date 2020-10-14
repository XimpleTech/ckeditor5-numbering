import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import command from './command'; 
import '../theme/numbering.css';

export default class NumberingEditing extends Plugin {
    static get requires() {                                                    // ADDED
        return [ Widget ];
    }

    init() {
        console.log( 'NumberingEditing#init() got called' );

        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'numbering', new command( this.editor ) );
    }

    _defineSchema() {                                                          // ADDED
        const schema = this.editor.model.schema;

        schema.register( 'numbering', {
            // Allow wherever text is allowed:
            allowWhere: '$text',

            // The placeholder will act as an inline node:
            isInline: true,

            // The inline widget is self-contained so it cannot be split by the caret and can be selected:
            isObject: true,

            // The placeholder can have many types, like date, name, etc:
            allowAttributes: [ 'label' ]
        } );
    }

    _defineConverters() {                                                      // ADDED
        const conversion = this.editor.conversion;

        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'span',
                classes: [ 'numbering' ]
            },
            model: ( viewElement, { writer: modelWriter } ) => {
                if (!viewElement) {
                    return;
                }
                if (!viewElement.getChild( 0 )) {
                    return;
                }
                
                const label = viewElement.getChild( 0 ).data.slice( 0, -1 );

                return modelWriter.createElement( 'numbering', { label } );
            }
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'numbering',
            view: ( modelItem, { writer: viewWriter } ) => {
                const widgetElement = createNumberingView( modelItem, viewWriter );

                // Enable widget handling on a numbering element inside the editing view.
                return toWidget( widgetElement, viewWriter );
            }
        } );

        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'numbering',
            view: ( modelItem, { writer: viewWriter } ) => createNumberingView( modelItem, viewWriter )
        } );

        // Helper method for both downcast converters.
        function createNumberingView( modelItem, viewWriter ) {
            const value = modelItem.getAttribute( 'label' );

            const numberingView = viewWriter.createContainerElement( 'span', {
                class: 'numbering'
            } );

            // Insert the numbering (as a text).
            const innerText = viewWriter.createText( value );
            viewWriter.insert( viewWriter.createPositionAt( numberingView, 0 ), innerText );

            return numberingView;
        }
    }
}