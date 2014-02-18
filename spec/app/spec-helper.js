/*
 * the helper for the Express specs. To run the Express specs, type
 * jasmine-node spec/app/ in the console. Don't forget to specify the app
 * directory, otherwise badness.
 */

exports.response =
{
    'view': '',
    'data': {},
    'render': function(view, data) {
        this.view = view;
        this.data = data;
    }
};

exports.ids =
{
    'user0': '000000000000000000000000',
    'user1': '000000000000000000000001',
    'conv0': '000000000000000000000010'
};

exports.equals = function(obj1, obj2) {
    for (var key in obj1) {
        if (typeof obj1[key] === 'object') {
            if (!equals(obj1[key], obj2[key])) return false;
        } else if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    
    return true;
}
