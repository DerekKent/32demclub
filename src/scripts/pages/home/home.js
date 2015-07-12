import BaseView from '~/helpers/backbone/base';
import { template } from './home.hbs';
import nextMeeting from '~/helpers/nextMeeting';

export default class Home extends BaseView {

    constructor () {
        super({
            template: template,
            templateHelpers: {
                meetingDate: () => {
                    return nextMeeting().toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                    })
                }
            }
        });
    }
}
