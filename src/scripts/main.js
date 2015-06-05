import Backbone from 'backbone';
import router from '~/router';
import appView from '~/app/app';

const EXTERNAL = /^((f|ht)tps?:)?\/\//;
const MAILTO = /^mailto:(.+)/;

class App {

    constructor () {
        this.router = router;
        this.view = appView;

        Backbone.history.start({
            pushState: true
        });

        document.addEventListener('click', function (e) {
            if (e.metaKey || e.which !== 1) {
                return;
            }

            let el = e.target;
            let href = el.getAttribute('href');

            if (e.defaultPrevented || MAILTO.test(href)) {
                return;
            }

            e.preventDefault();

            if (EXTERNAL.test(href)) {
                window.open(href, '_blank');
            } else {
                let trigger = true;
                if (el.getAttribute('data-trigger') === false) {
                    trigger = false;
                }

                router.navigate(href, {trigger: trigger});
            }
        });

    }

}

let app = new App();

export default app;
