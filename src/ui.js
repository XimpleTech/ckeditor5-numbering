import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import NumberIcon from '../theme/icons/numbering.svg';

/**
 * Handles registering the toggleable button in the 
 * editor's UI so it can be added to the toolbar, with
 * the name `pastePlainText`.
 */
export default class NumberingUI extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'numbering', locale => {
            const view = new ButtonView( locale );
            const command = editor.commands.get( 'numbering' );
            
            // to be table to use the translation function
            const t = view.t; 

            view.set( {
                label: t('Numbering'),
                withText: false,
                tooltip: true,
                isToggleable: true,
                icon:NumberIcon
            } );

            // Callback executed once the button is clicked.
            view.on( 'execute', () => {
                const imageUrl = prompt( 'Image URL' );
                
                editor.execute( 'numbering' );
            } );

            //view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            return view;
        } );
    }
};