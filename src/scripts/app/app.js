import $ from 'jquery';
import Backbone from 'backbone';
import BaseView from '~/helpers/backbone/base';
import { template } from './app.hbs';
System.import('./styles/main.css!', {name: __moduleName});

Backbone.$ = $;

class AppView extends BaseView {

    constructor () {
        super({
            el: 'body',
            template: template,
            regions: {
                main: '#main',
                header: '#header',
                footer: '#footer'
            }
        });
    }

    initialize () {
        let view = this;

        this.$el.html(this.getTemplate());

        System.import('~/app/header/header').then(function (m) {
            let header = new m.default();
            view.regions.header.show(header);
        });

        System.import('~/app/footer/footer').then(function (m) {
            let footer = new m.default();
            view.regions.footer.show(footer);
        });
    }

    render (pageName, options) {
        let view = this;

        // Lazy-load the page
        System.import(`~/pages/${pageName}/${pageName}`).then(function (m) {
            let page = new m.default(options);
            view.regions.main.show(page);
        });

        return this;
    }
}

let appView = new AppView();

export default appView;
