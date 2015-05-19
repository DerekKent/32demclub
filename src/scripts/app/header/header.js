import BaseView from '~/helpers/backbone/base';
import { template } from './header.hbs';
System.import('./header.css!', {name: __moduleName});

export default class Header extends BaseView {

    constructor () {
        super({
            el: '#header',
            template: template
        });
    }
}
