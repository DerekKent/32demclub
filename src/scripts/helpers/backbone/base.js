import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

// requestAnimationFrame Shim for browsers (and PhantomJS)
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

function dispose(obj) {
    delete obj.parent;
    delete obj.el;
    delete obj.$el;
    delete obj.regions;
};

class Region {

    constructor (el, parent) {
        this.el = el;
        this.parent = parent;
    }

    show (view) {
        this.empty();
        this.append(view);
    }

    append (view) {
        this.appendAs('div', view);
    }

    appendAs (type, view) {
        this.$el = this.parent.$el;
        if (this.el) {
            this.$el = this.parent.$el.find(this.el);
        }
        view.parent = this.parent;
        this.views = this.views || [];
        this.views.push(view);
        view.setElement($(`<${type}>`).appendTo(this.$el)).render();
        view.onShow();
    }

    empty () {
        _.each(this.views, function (view) {
            view.close();
        });

        if (this.$el) {
            this.$el.empty();
        }
        this.$el = null;
        this.views = null;
    }

    close () {
        this.empty();
        dispose(this);
    }

}

class Regions {

    constructor (regions = {}, $context) {
        _.each(_.keys(regions), function (region) {
            this[region] = new Region(regions[region], $context);
        }.bind(this));

        // Add a self-referential region to attach views to
        this.self = new Region(null, $context);
    }

}

class BaseView extends Backbone.View {

    constructor (options = {}) {
        super(...arguments);

        this.template = options.template;
        this.regions = new Regions(options.regions, this);

        this.initialize.apply(this, arguments);
    }

    renderDom () {
        if (this.$el) {
            this.$el.html(this.getTemplate());
        }
    }

    getTemplate () {
        if (typeof this.template === 'function') {
            return this.template(this.getTemplateData());
        }

        return this.template;
    }

    getTemplateData () {
        let data = this.model ? this.model.toJSON() : (this.collection ? this.collection.toJSON() : {});

        if (typeof this.templateHelpers === 'function') {
            _.extend(data, this.templateHelpers());
        } else {
            // Add data from template helpers to the model's data
            _.each(this.templateHelpers, function (value, key) {
                if (typeof value === 'function') {
                    data[key] = value.apply(this);
                } else {
                    data[key] = value;
                }
            });

            return data;
        }
    }

    _render () {
        _.each(this.regions, function (region) { region.empty(); });
        window.requestAnimationFrame(this.renderDom.bind(this));
    }

    render () {
        this.onBeforeRender();
        this._render();
        window.requestAnimationFrame(this.onRender.bind(this));
        if (this._rendered) {
            window.requestAnimationFrame(this.onDomRefresh.bind(this));
        } else {
            this._rendered = true;
        }
        window.requestAnimationFrame(this.onAfterRender.bind(this));

        return this;
    }

    onShow () {} // noop
    onBeforeRender () {} // noop
    onRender () {} // noop
    onAfterRender () {} // noop
    onDomRefresh () {} // noop
    onBeforeClose () {} // noop

    close () {
        this.onBeforeClose();

        _.each(this.regions, function (region) {
            region.close();
        });

        this.off(); // Remove all event listeners
        this.remove();
        this.unbind();
        dispose(this);

        return this;
    }

}

export default BaseView;
