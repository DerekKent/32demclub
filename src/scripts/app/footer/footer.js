import BaseView from '~/helpers/backbone/base';
import { template } from './footer.hbs';
System.import('~/app/footer/footer.css!');
//System.import('./footer.css!', {name: __moduleName});

export default class Footer extends BaseView {

    constructor () {
        super({
            el: '#footer',
            template: template
        });
    }
}
