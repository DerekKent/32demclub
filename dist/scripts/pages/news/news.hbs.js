"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _handlebars=require("handlebars"),_handlebars2=_interopRequireDefault(_handlebars),template=_handlebars2["default"].template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,t,a){var s;return'<style scoped>@import url(/scripts/pages/news/news.css);</style>\n<div class="news-page">\n    <aside class="twitter-feed">\n    </aside>\n\n    <article class="club-news">\n        <h1>Club Newsletter</h1>\n        <span class="club-news-time"><time datetime="2015-04-16">April 16, 2015</time></span>\n\n        <section class="reminder">\n            <h2>General Membership Meeting</h2>\n\n            <span class="section-body">\n                <span class="reminder-left">\n                    <p>'+this.escapeExpression((s=null!=(s=n.meetingDate||(null!=e?e.meetingDate:e))?s:n.helperMissing,"function"==typeof s?s.call(e,{name:"meetingDate",hash:{},data:a}):s))+' at 7pm</p>\n                    <span class="address">\n                        <span><a href="https://goo.gl/maps/Zg0QR">Ferndale Volunteer Fire Hall</a></span>\n                        <span>4 S. Broadview Blvd.</span>\n                        <span>Ferndale, MD 21061</span>\n                    </span>\n                </span>\n                <span class="divider"></span>\n                <span class="reminder-right menu">\n                    <span class="menu-title">Italian Dinner - $7</span>\n                    <span class="subtitle menu-subtitle">prepared by the Catering Twins</span>\n\n                    <span>Spaghetti and meatballs<span>\n                    <span>Meat Lasagna/Vegetable Lasagna</span>\n                    <span>Italian Bread</span>\n                    <span>Garden Salad</span>\n                    <span>Cake &amp; Ice Cream</span>\n                    <span>Beverages</span>\n                </span>\n            </span>\n        </section>\n\n        <section class="pres-comments">\n            <h2>President\'s Comments</h2>\n            <span class="subtitle">Tom Dixon</span>\n\n            <span class="section-body">\n                <p>THANKS to <strong>Kathy Shatt</strong> for a wonderful St. Patrick’s Dinner at our March 19 meeting as we all enjoyed a great corned beef and cabbage dinner with other Irish classics. This month, the <strong>Catering Twins</strong> are returning to cook your Italian dinner.</p>\n                <p>We had the opportunity in March to listen to the leadership of the Anne Arundel County Democratic Central Committee as to their plans for the next four years of their term.</p>\n                <p>Our April meeting will feature <strong>Pete Smith</strong>, District #1 and County Council Vice-Chair. He will discuss his two recent county council votes against changing/repealing the county’s storm-water fee. Feel free to give him your opinion of how and why he should vote on this issue. In addition, he will briefly discuss the upcoming 2015/2016 budget that the Council will discuss and construct in May. You will have the opportunity to advise him of issues you would like to have included in the budget.</p>\n                <p>Our guest speakers for the May meeting will be our own Team 32 featuring <strong>Sen. Ed DeGrange</strong> and <strong>Delegates Pam Beidle, Mark Chang, and Ted Sophocleus</strong>. They will talk about the recent 2015 Legislative session which just ended on Monday, April 13 and how it affects you</p>\n                <p>We will be mailing our June 50/50 raffle tickets to all of our club members along with reminders for your 2015 membership.</p>\n            </span>\n        </section>\n\n        <section class="info">\n            <h2>2015 dues</h2>\n\n            <span class="section-body">\n                <p>Your 2015 dues are now due. Please see Pam Moats or mail your dues to us at</p>\n                <span class="address">\n                    <span>District 32 Democratic Club</span>\n                    <span>P.O. Box 269</span>\n                    <span>Linthicum, Md., 21090</span>\n                </span>\n            </span>\n        </section>\n\n        <section class="info">\n            <h2>Your email address and birth date</h2>\n\n            <span class="section-body">\n                <p>Please make sure that we have your current home and email address.</p>\n                <p>We also ask you for your birth date (month and day only) for our birthday list.</p>\n                <p>Please send the info to Pam Moats at <a href="mailto:pmoats3561@aol.com">pmoats3561@aol.com</a></p>\n            </span>\n        </section>\n\n        <section class="info">\n            <h2>Future 2015 Club Meetings</h2>\n\n            <span class="section-body">\n                <ul>\n                    <li><time datetime="2015-05-21">May 21</time></li>\n                    <li><time datetime="2015-06-18">June 18</time></li>\n                    <li><time>July - No meetings</time></li>\n                    <li><time>Aug - No meetings</time></li>\n                    <li><time datetime="2015-09-17">Sept 17</time></li>\n                    <li><time datetime="2015-10-15">Oct 15</time></li>\n                    <li><time datetime="2015-11-19">Nov 19</time></li>\n                    <li><time datetime="2015-12-17">Dec 17</time></li>\n                    <li></li>\n                </ul>\n            </span>\n        </section>\n\n        <section class="info">\n            <h2>Future 2015 Board Meetings</h2>\n\n            <span class="section-body">\n                <ul>\n                    <li><time datetime="2015-05-14">May 14</time></li>\n                    <li><time datetime="2015-09-10">Sept 10</time></li>\n                    <li><time datetime="2015-11-12">Nov 12</time></li>\n                </ul>\n            </span>\n        </section>\n    </article>\n</div>\n'},useData:!0});exports.template=template;