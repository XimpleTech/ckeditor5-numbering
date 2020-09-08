import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import NumberIcon from '../theme/icons/numbering.svg';

/**
 * Handles registering the toggleable button in the 
 * editor's UI so it can be added to the toolbar, with
 * the name `pastePlainText`.
 */
export default class NumberingUI extends Plugin {
    // init() {
    //     const editor = this.editor;
    //     const t = editor.t;

    //     // The "placeholder" dropdown must be registered among the UI components of the editor
    //     // to be displayed in the toolbar.
    //     editor.ui.componentFactory.add('numbering', locale => {
    //         // to be table to use the translation function
    //         const t = view.t;

    //         view.set({
    //             label: t('Numbering'),
    //             withText: false,
    //             tooltip: true,
    //             isToggleable: true,
    //             icon: NumberIcon
    //         });

    //         const command = editor.commands.get('numbering');
    //         // Callback executed once the button is clicked.
    //         view.on('execute', () => {
    //             const theNum = prompt('', command.numbered);

    //             editor.execute('numbering', { "numbering": theNum });
    //         });

    //         view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

    //         return view;

    //         //const dropdownView = createDropdown( locale );

    //         // Populate the list in the dropdown with items.
    //         //addListToDropdown( dropdownView, getDropdownItemsDefinitions( placeholderNames ) );

    //         // dropdownView.buttonView.set( {
    //         //     // The t() function helps localize the editor. All strings enclosed in t() can be
    //         //     // translated and change when the language of the editor changes.
    //         //     label: t( 'Placeholder' ),
    //         //     tooltip: true,
    //         //     withText: true
    //         // } );

    //         // Disable the placeholder button when the command is disabled.
    //         //dropdownView.bind('isEnabled').to(command);

    //         // Execute the command when the dropdown item is clicked (executed).
    //         // this.listenTo(dropdownView, 'execute', evt => {
    //         //     editor.execute('placeholder', { value: evt.source.commandParam });
    //         //     editor.editing.view.focus();
    //         // });

    //         // return dropdownView;
    //     });
    // }

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
                const theNum = prompt('', command.numbered);

                editor.execute('numbering', { "numbering": theNum });
            } );

            view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            return view;
        } );
    }
};