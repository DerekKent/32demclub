import BaseView from '~/helpers/backbone/base';
import { template } from './header.hbs';

export default class Header extends BaseView {

    constructor () {
        super({
            el: '#header',
            template: template,

            events: {
                'click .expand-nav': 'toggleNavMenu'
            }
        });
    }

    onRender () {
        if (this.el) {
            this.el.querySelector('.header').style.maxHeight = '80px';
        }
    }

    toggleNavMenu (e) {
        let button = e.currentTarget;
        let header = this.el.querySelector('.header');

        if (header.style.maxHeight !== '80px') {
            header.style.maxHeight = '80px';
        } else {
            header.style.maxHeight = '';
        }

        if (button.classList.contains('active')) {
            button.classList.remove('active');
        } else {
            button.classList.add('active');
        }
    }
}
