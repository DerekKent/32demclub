import BaseView from '~/helpers/backbone/base';
import { template } from './header.hbs';

export default class Header extends BaseView {

    constructor () {
        super({
            el: '#header',

            events: {
                'click .expand-nav': 'toggleNavMenu',
                'click #skiptocontent a': 'skipToContent'
            }
        });
    }

    initialize () {
        super.initialize({
            template: template
        });
    }

    onRender () {
        if (this.el) {
            this.el.querySelector('.header').style.maxHeight = '80px';
        }
    }

    toggleNavMenu (e) {
        let button = e.target;
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

    skipToContent (e) {
        let el = document.getElementById('maincontent');

        if (el) {
            if (!/^(?:a|select|input|button|textarea)$/i.test(el.tagName)) {
                el.tabIndex = -1;

                function removeTabIndex () {
                    this.removeAttribute('tabindex');
                    this.removeEventListener('blur', removeTabIndex, false);
                    this.removeEventListener('focusout', removeTabIndex, false);
                }

                el.addEventListener('blur', removeTabIndex, false);
                el.addEventListener('focusout', removeTabIndex, false);
            }

            el.focus();
        }
    }

}
