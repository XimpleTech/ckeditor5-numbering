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
};