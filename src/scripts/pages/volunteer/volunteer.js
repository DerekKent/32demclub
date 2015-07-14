import BaseView from '~/helpers/backbone/base';
import { template } from './volunteer.hbs';

export default class Volunteer extends BaseView {

    constructor () {
        super({
            template: template
        });
    }
}
