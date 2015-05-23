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

    toggleNavMenu (e) {
        let menu = this.el.querySelector('.menu');
        let button = e.currentTarget;
        let header = this.el.querySelector('.header');

        /*if (menu.style.display === '') {
            menu.style.display = 'block';
        } else {
            menu.style.display = '';
        }*/

        if (button.classList.contains('active')) {
            button.classList.remove('active');
        } else {
            button.classList.add('active');
        }

        // TODO: this transition doesn't work smoothly, may need to do it in JS
        //  Check to see how Bootstrap does its transition
        if (header.style.maxHeight !== '100vh') {
            header.style.maxHeight = '100vh';
        } else {
            header.style.maxHeight = '80px';
        }
    }
}
