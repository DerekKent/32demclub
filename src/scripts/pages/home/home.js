import BaseView from '~/helpers/backbone/base';
import { template } from './home.hbs';
System.import('./home.css!', {name: __moduleName});

export default class Home extends BaseView {

    constructor () {
        super({
            template: template
        });
    }
}
