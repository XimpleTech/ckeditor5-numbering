import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import View from '@ckeditor/ckeditor5-ui/src/view';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import NumberIcon from '../theme/icons/numbering.svg';
import InputTextView from '@ckeditor/ckeditor5-ui/src/InputText/inputtextview';

/**
 * Handles registering the toggleable button in the 
 * editor's UI so it can be added to the toolbar, with
 * the name `Numbering`.
 */
export default class NumberingUI extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add('numbering', locale => {
            const view = new View(locale);
            const command = editor.commands.get('numbering');
            const inputtextView = this._createInputTextView(locale, command);
            const buttonView = this._createButtonView(locale, command, inputtextView, editor);
            
            view.setTemplate({
                tag: 'div',
                children: [
                    inputtextView,
                    buttonView
                ]
            });

            return view;
        });
    }

    _createButtonView(locale, command, inputtextView, editor) {
        const buttonView = new ButtonView(locale);
        const t = buttonView.t;
        buttonView.set({
            label: t('Numbering'),
            withText: false,
            tooltip: true,
            isToggleable: true,
            icon: NumberIcon
        });
        // Callback executed once the button is clicked.
        buttonView.on('execute', () => {
            command.numbered = inputtextView.element.value;
            editor.execute('numbering', { "numbering": command.numbered });
        });
        buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

        return buttonView;
    }

    _createInputTextView(locale, command) {
        const inputtextView = new InputTextView(locale);
        inputtextView.bind('value').to(command, 'numbered');
        
        return inputtextView;
    }
};