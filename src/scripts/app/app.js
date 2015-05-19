import $ from 'jquery';
import Backbone from 'backbone';
import BaseView from '~/helpers/backbone/base';
import { template } from './app.hbs';
System.import('~/app/styles/main.css!');

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
            // HACK: Uncompiled versions seem to prefer m.default() whereas compiled versions
            // only work with m(). Unknown why this is the case.
            let header = null;
            if (m.default) {
                header = new m.default();
            } else {
                header = new m();
            }
            //let header = new m.default();
            view.regions.header.show(header);
        });

        System.import('~/app/footer/footer').then(function (m) {
            // HACK: Uncompiled versions seem to prefer m.default() whereas compiled versions
            // only work with m(). Unknown why this is the case.
            let footer = null;
            if (m.default) {
                footer = new m.default();
            } else {
                footer = new m();
            }
            //let footer = new m.default();
            view.regions.footer.show(footer);
        });
    }

    render (pageName, options) {
        let view = this;

        // Lazy-load the page
        System.import(`~/pages/${pageName}/${pageName}`).then(function (m) {
            // HACK: Uncompiled versions seem to prefer m.default() whereas compiled versions
            // only work with m(). Unknown why this is the case.
            let page = null;
            if (m.default) {
                page = new m.default(options);
            } else {
                page = new m(options);
            }
            //let page = new m.default(options);
            view.regions.main.show(page);
        });

        return this;
    }
}

let appView = new AppView();

export default appView;
