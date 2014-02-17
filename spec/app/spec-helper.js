/*
 * To run the Express specs, type jasmine-node spec/app/ in the console. Don't
 * forget to specify the app directory, otherwise badness.
 */
exports.res = {
    'view': '',
    'data': {},
    'render': function(view, data) {
        this.view = view;
        this.data = data;
    }
};