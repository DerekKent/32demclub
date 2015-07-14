import BaseView from '~/helpers/backbone/base';
import { template } from './contribute.hbs';

export default class Contribute extends BaseView {

    constructor () {
        super({
            template: template
        });
    }
}
