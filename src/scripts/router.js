import Backbone from 'backbone';
import appView from '~/app/app';

class Router extends Backbone.Router {

    constructor () {
        super({
            routes: {
                '': 'home',
                'news': 'news',
                'events': 'events',
                'contribute': 'contribute',
                'volunteer': 'volunteer',
                'login': 'login',
                '*actions': 'default'
            }
        });
    }

    home () {
        appView.render('home');
    }

    news () {
        appView.render('news');
    }

    events () {
        appView.render('events');
    }

    contribute () {
        appView.render('contribute');
    }

    volunteer () {
        appView.render('volunteer');
    }

    login () {
        appView.render('login');
    }

    default () {
        appView.render('404');
    }

}

let router = new Router();

export default router;
