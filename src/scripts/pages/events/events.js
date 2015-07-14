import BaseView from '~/helpers/backbone/base';
import { template } from './events.hbs';

export default class Events extends BaseView {

    constructor () {
        super({
            template: template
        });
    }
}
