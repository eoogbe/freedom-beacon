/*
 * the helper for the Express specs. To run the Express specs, type
 * jasmine-node spec/app/ in the console. Don't forget to specify the app
 * directory, otherwise badness.
 */

exports.response =
{
    'data': {},
    
    'view': '',
    'render': function(view, data) {
        this.view = view;
        this.data = data;
    },
    
    'sent': null,
    'send': function(sent) {
        this.sent = sent;
    },
    
    'path': '',
    'redirect': function(path) {
        this.path = path;
    },
    
    'locals': {},
    
    'json': function(data) {
        this.data = data;
    }
};

exports.ids =
{
    'user0': '000000000000000000000000',
    'user1': '000000000000000000000001',
    'user2': '000000000000000000000002',
    'user3': '000000000000000000000003',
    'user4': '000000000000000000000004'
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
