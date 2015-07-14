import BaseView from '~/helpers/backbone/base';
import { template } from './news.hbs';
import nextMeeting from '~/helpers/nextMeeting';

export default class News extends BaseView {

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
