#Implementation Guide
This guide walks through how to implement the different parts of the website.
It is intended as a reference rather than something to read straight through.

##Table of Contents
 1. [Frameworks We Use](#frameworks-sec)
  1. [Express](#express-sec)
  2. [Express3-Handlebars](#handlebars-sec)
  3. [Jasmine](#jasmine-sec)
  4. [jQuery](#jquery-sec)
  5. [Mongoose](#mongoose-sec)
  6. [Node-Minify](#minify-sec)
 2. [Important Files and Directories](#dir-struct-sec)
  1. [`app.js`](#app-sec)
  2. [`SpecRunner.html`](#spec-runner-sec)
  3. [`lib/`](#lib-dir-sec)
  4. [`lib/compressor.js`](#compressor-sec)
  5. [`lib/config.js`](#config-sec)
  6. [`lib/router.js`](#router-sec)
  7. [`models/`](#models-dir-sec)
  8. [`public/`](#public-dir-sec)
  9. [`public/javascripts/freedom-beacon.min.js`](#main-js-sec)
  10. [`routes/`](#routes-dir-sec)
  11. [`spec/`](#spec-dir-sec)
  12. [`spec/app/`](#spec-app-dir-sec)
  13. [`spec/app/spec-helper.js`](#spec-helper-sec)
  14. [`spec/javascripts/`](#spec-js-dir-sec)
  15. [`spec/javascripts/fixtures/`](#fixtures-dir-sec)
  16. [`views/`](#views-dir-sec)
  17. [`views/layouts/`](#layouts-dir-sec)
  18. [`views/partials/`](#partials-dir-sec)
  19. [`<path>/vendor/`](#vendor-dirs-sec)
 3. [High Level Overview](#overview-sec)
 4. [CRUD Naming Conventions](#crud-sec)
 5. [A Short Explanation of Jasmine](#spec-sec)
 6. [How To Create a New Page](#new-page-sec)
 7. [How To Create a New Route](#new-route-sec)
  1. [Route Test File Boilerplate for a GET Method](#route-spec-code)
  2. [Route Boilerplate for a GET Method](#get-route-code)
  3. [Route Boilerplate for a POST, PUT, or DELETE Method](#post-route-code)
 8. [How To Write Tests for Functions That Use the Models](#model-spec-sec)
 9. [How To Define a New Model](#new-model-sec)
  1. [Model Boilerplate](#model-code)
 10. [How To Add Client-side JavaScript](#client-js-sec)
  1. [Test Fixture Boilerplate](#spec-fixture-code)
 11. [How To Create a Partial](#partial-sec)
 12. [How To Create a Utility File](#util-sec)
 13. [How To Add a Method to a Model](#model-method-sec)
  1. [Model Test File Boilerplate](#model-spec-code)
 14. [How To Use AJAX](#ajax-sec)
 15. [How To Change the Layout for a Specific Page](#layout-sec)
  1. [Layout Boilerplate](#layout-code)
 16. [How To Use the Request Object](#req-sec)
  1. [body](#req-body-sec)
  2. [params](#req-params-sec)
  3. [query](#req-query-sec)
  4. [session](#req-sess-sec)
 17. [How To Call the Built-In Methods on Mongoose Models](#mongoose-methods-sec)

##<span id="frameworks-sec">Frameworks We Use</span>
###<span id="express-sec">[Express][]</span>
The web application framework. Built on top of [Connect][] which is built on top of
[Node][].

[Express]: http://expressjs.com/
[Connect]: http://www.senchalabs.org/connect/
[Node]: http://nodejs.org/

###<span id="handlebars-sec">[Express3-Handlebars][]</span>
The view engine. Built on top of [Handlebars][] which is built on top of [Mustache][].

[Express3-Handlebars]: https://www.npmjs.org/package/express3-handlebars
[Handlebars]: http://handlebarsjs.com/
[Mustache]: http://mustache.github.io/

###<span id="jasmine-sec">Jasmine</span>
The [BDD][] unit testing framework. We use [Jasmine-Node][] for the server side testing
and [Jasmine-jQuery][] for the client-side testing. Just to keep things
interesting, Jasmine-Node uses [Jasmine 1.3][] and Jasmine-jQuery uses [Jasmine 2.0][].
(I’m really sorry. This is the only way I could get it to work.)

[BDD]: http://en.wikipedia.org/wiki/Behavior-driven_development
[Jasmine-Node]: https://github.com/mhevery/jasmine-node
[Jasmine-jQuery]: https://github.com/velesin/jasmine-jquery
[Jasmine 1.3]: http://jasmine.github.io/1.3/introduction.html
[Jasmine 2.0]: http://jasmine.github.io/2.0/introduction.html

###<span id="jquery-sec">[jQuery][]</span>
A JavaScript library. We use this for [client-side JavaScript][client-js] stuff.

[jQuery]: http://jquery.com/
[client-js]: #client-js-sec

###<span id="mongoose-sec">[Mongoose][]</span>
The object modeling framework for the database. Built on top of [MongoDB][].

[Mongoose]: http://mongoosejs.com/
[MongoDB]: http://www.mongodb.org/

###<span id="minify-sec">[Node-Minify][]</span>
The minifier module. We use this to combine all the client-side JavaScript
files into one line of code. This is incompatible with nodemon.

[Node-Minify]: https://github.com/srod/node-minify

##<span id="dir-struct-sec">Important Files and Directories</span>
###<span id="app-sec">app.js</span>
The main file the server runs. Most work is delegated to other files to keep
this one neat and small. References the config.js, compressor.js, and router.js
in the lib/ folder.

###<span id="spec-runner-sec">SpecRunner.html</span>
Runs the client-side tests.

###<span id="lib-dir-sec">lib/</span>
Holds the library files. Any [utility files][util] you want to make should go here. For
example, `lib/copy.js` holds a function that copies JavaScript Objects.

[util]: #util-sec

###<span id="compressor-sec">lib/compressor.js</span>
Compresses the client-side scripts. Whenever you [create a new script][client-js], add it to
the scripts array in this file. It should be put before
`public/javascripts/freedom-beacon.js.`

###<span id="config-sec">lib/config.js</span>
The app configuration.

###<span id="router-sec">lib/router.js</span>
The route definitions. Whenever you create a new route in the routes/ folder,
you must define the url to which it routes in this file.

###<span id="models-dir-sec">models/</span>
Holds the [model definitions][new-model].

[new-model]: #new-model-sec

###<span id="public-dir-sec">public/</span>
Holds all the files directly served to the browser. Images, stylesheets, and
client-side javascript goes into their respective subfolders within this
folder.

###<span id="main-js-sec">public/javascripts/freedom-beacon.min.js</span>
All the client-side JavaScript compressed into one line of code. This file is
automatically generated and should not be modified by hand.

###<span id="routes-dir-sec">routes/</span>
Holds all the routes. When you want to [create a new page][new-page], you will either
create a new route or edit an existing route with a new function. The routes
are [RESTful][] resources (sorta). When you are creating a new [CRUD][] operation on a
resource, edit the existing route. When you are creating a new resource, create
a new route file.

[new-page]: #new-page-sec
[RESTful]: http://en.wikipedia.org/wiki/Representational_state_transfer
[CRUD]: #crud-sec

###<span id="spec-dir-sec">spec/</span>
Holds all the unit tests. Separated into server-side tests in the `app/` folder
and client-side tests in the` javascripts/` folder.

###<span id="spec-app-dir-sec">spec/app/</span>
Holds the server-side tests. The subdirectory structure should match the
structure of the root directory.

###<span id="spec-helper-sec">spec/app/spec-helper.js</span>
Helper data and functions for the server-side tests. This includes
 - `response`: a dummy response that stores the passed in parameters
 - `ids`: a series of dummy ids for the models that reference other models
 - `equals()`: an equals function for objects. (Don’t use == or === on objects.)

Add any helper functions for the server-side tests in this file. You can create
a spec-helper for the client-side scripts if needed.

###<span id="spec-js-dir-sec">spec/javascripts/</span>
Holds the client-side tests. The subdirectory structure should match the
structure of the `public/javascripts/` directory.

###<span id="fixtures-dir-sec">spec/javascripts/fixtures/</span>
Holds the [test fixtures][test fixture]. The name of each fixture is usually the same as the
name of the tested file but with a .html extension instead of .js. The test
fixtures are the minimum HTML content needed for your tests to run. They should
mimic the relevant components in the real Handlebar views.

[test fixture]: http://en.wikipedia.org/wiki/Test_fixture#Software

###<span id="views-dir-sec">views/</span>
Holds the Handlebar views. Names should be in the format `<resource>-<action>`
with the exception of `index.handlebars`, the layouts, and the partials. For
example, the `routes/beacons.js` file has a function called create(). The
associated view rendered by this function is beacons-create.

###<span id="layouts-dir-sec">views/layouts/</span>
Holds the layouts. The default layout is main.handlebars. (Default layout set
in `lib/config.js`.) Layouts surround the other views which make up the body of
the html.

###<span id="partials-dir-sec">views/partials/</span>
Holds the partials. [Partials][partials-desc] are little snippets of code that are repeated in
various places.

[partials-desc]: http://blog.teamtreehouse.com/handlebars-js-part-2-partials-and-helpers

###<span id="vendor-dirs-sec">&lt;path&gt;/vendor/</span>
Anything in a vendor folder is third-party code. Don’t modify the files in
these; we don’t own them.

##<span id="overview-sec">High Level Overview</span>
Here’s what happens when you run `node app.js` in the console:
 1. We create a variable `app`, and set it to the result of calling the `express()`
 function. This variable represents the entire application.
 2. We configure `app` with the configurations from `config.config()` and the
 routes from `router.route()`. `express` must be passed into `config.config()`
 because it is referenced in that function.
 3. The `http.createServer()` function kicks everything off, and `listen()` begins
 listening on a port. The app is now running. A message saying this is printed
 to the console.
 4. The client-side javascript is compressed into the one-line file
 `public/javascripts/freedom-beacon.min.js`. Because this modifies a file every
 time the server is run, we cannot use nodemon to run the server. It would go
 into an infinite loop.
 
Here’s what happens when you navigate to http://localhost:3000 in your browser:
 1. `app` is searched for a route that matches a GET request for /. This route in
 `lib/router.js` on the line that says `app.get(‘/’, homepage.index);`.
 2. homepage refers to the file `routes/index.js`. In this file, a function
 called index() is exported. The function takes in a request and a response.
 All the function does is call
 `response.render('index', {'isSplash': 'isSplash'});`. The first parameter is
 the name of the Handlebars view. The second parameter is an object literal of the
 variables Handlebars will use. The job of any route function is to gather all
 the variables for the second parameter and render the view with them. Think of
 it like a MVC Controller. (Or don’t. MVC is not ideal for the web.) Some
 routes may need to talk to the database or use values in the request object.
 3. Handlebars compiles the default layout (`main.handlebars`) and
 `index.handlebars` into HTML. The `isSplash` variable will be available in both
 the layout and the body.
 4. The layout includes javascripts and stylesheets. These are pulled from the
 `public/` folder.
 5. The final HTML is shown on the browser.
 
##<span id="crud-sec">CRUD Naming Conventions</span>
These are our makeshift naming conventions for [CRUD operations][crud-ops]. We should
probably consider making the resources match our database better. We might also
want to prettify the urls, but that adds work and thinking. Note that routes
for `app.post()`, `app.put()`, or `app.delete()` should [redirect to an `app.get()`
route][PRG].

[crud-ops]: http://en.wikipedia.org/wiki/Create,_read,_update_and_delete
[PRG]: http://en.wikipedia.org/wiki/Post/Redirect/Get

If you want to...                    | Then in lib/router.js, call...
:------------------------------------|:--------------------------------
Create a new thing                   | `app.post(‘/things’, things.post);`
Show a single thing                  | `app.get(‘/things/:id’, things.show);`
Update a single thing                | `app.put(‘/things/:id’, things.put);`
Delete a single thing                | `app.delete(‘/things/:id’, things.delete);`
List all the things                  | `app.get(‘/things’, things.index);`
Search for things                    | `app.get(‘/things/search’, things.search);`
Update all the things                | `app.put(‘/things’, things.putAll);`
Delete all the things                | `app.delete(‘/things’, things.deleteAll);`
Show a form for creating a new thing | `app.get(‘/things/create’, things.create);`
Show a form for updating a thing     | `app.get(‘/things/:id/update’, things.update);`
Show a form for deleting a thing     | `app.get(‘/things/:id/destroy’, things.destroy);`

##<span id="spec-sec">A Short Explanation of Jasmine</span>
The official docs ([1.3][Jasmine 1.3] for server-side tests and [2.0][Jasmine 2.0] for client-side tests) do
a better job explaining, but here’s a quick rundown.

[Always write tests first](http://butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd). It makes it easier to figure out what’s going wrong
and how to fix it without having to restart node all the time. Once you’ve
written the test, run it. It should fail the first time because the code hasn’t
been written. Write just enough code to get rid of the error, then run again.
Repeat until the test passes. Then write another test. Continue until
functionality is complete.

Our convention is to end all the test names with “Spec.js”. It is a requirement
for Jasmine-Node to work, and we might as well keep it up with client-side
tests too.

The function `describe()` creates a Jasmine [test suite](http://en.wikipedia.org/wiki/Test_suite). It takes two parameters:
the name of the suite and a function that implements the suite.

Our convention is for the outermost suite to be named after the module being
tested. For example, the outermost suite in `spec/app/routes/friendsSpec.js` is
named “friends”, the same name as the route friends.

The next level down of suites should be named after the function being tested
with parentheses at the end. Going back to the friends route example, the next
level down of suites are named after the two methods in that route, “index()”
and “search()”.

More suites can be nested if there are additional conditions within the
function. For example, the spec for friends.search has the conditions “when no
search value”, “when search value”, and “when search value not found”.

Jasmine has a function `beforeEach()` which takes in a function as a parameter
and runs that function before each test. Always try to require modules, create
variables, and call the `beforeEach()` function in the smallest scope possible.
This reduces the chances of name clashes.

The function `it()` creates a Jasmine test. It takes two parameters: the name of
the test and a function that implements the test. Our convention is for the
name of the test to start with “should” and read like a sentence telling what
the tested function should do.

Each test should contain one or more expectations. An expectation asserts that
something about the action function is true. If the expectation fails, the test
will fail. The function for expectations is `expect()`. Its single parameter is a
value that will be matched against a matcher. Matchers are chained to the
`expect()` function. See the Jasmine docs for a list of the available matchers.
For client-side tests, [Jasmine-jQuery][] has additional matchers specialized for
working with jQuery.

To run the server-side tests, enter `jasmine-node spec/app/` in the console. Do
not forget to specify the app directory, otherwise Jasmine-Node will run all
our client-side tests, which are not configured to work with it. (Sorry! It was
the best I could do with what I had to work with.)

To run the client-side tests, add the test file and the source file to the
scripts in `SpecRunner.html` and open `SpecRunner.html` in a browser. [It doesn’t
work in Chrome](https://github.com/velesin/jasmine-jquery/issues/4) or Firefox. (I haven’t checked any other browsers.) To get it to
work, open Chrome on the command-line with the option
`--allow-file-access-from-files`.

##<span id="new-page-sec">How To Create a New Page</span>
I like to start with creating the Handlebars view because it makes it easier
for me to visualize what variables and functionality I will need. However, this
step can be done at any time. Just create a file in the `views/` folder and enter
the HTML you would like to render. The name of the file should be in the format
`<resource>-<action>.handlebars` and follow our [naming conventions][CRUD].

Decide if the page needs any [new models][new-model] and implement if necessary.

Next create the route. If you want to create a new action on an existing
resource, edit an existing route. If you want to create a new resource, create
a new route. Read [How To Create a New Route][new-route] for more on implementing these
options.

[new-route]: #new-route-sec

If the page is static, then you’re done. However, most pages are dynamic and
will require some [client-side scripting][client-js].

##<span id="new-route-sec">How To Create a New Route</span>
Determine the function of the route and use [CRUD Naming Conventions][CRUD] to figure
out what the resource name, action function, and request method should be. If a
fitting resource already exists, but needs a new action function, modify that
route instead of creating a parallel one. This How To can still help with
editing an existing route.

Create a new test file in `spec/app/routes/`. Our convention is to name the test
file the `<resource>Spec.js`. So a resource named things would have the test
`thingsSpec.js`. For more on working with Jasmine read [A Short Explanation of
Jasmine][spec].

[spec]: #spec-sec

In the test file, the outermost suite should be named after the resource. The
next level of suites down should be the name of the route’s exported function
with parentheses after it. If the function name is create, the suite’s name
should be create(). More suites can be nested if there are additional
conditions within the function.

In the smallest scope possible, the spec should require the following modules:
 1. `../../../lib/copy`. Just the copy function is needed out of it, so it can be
 required like this: `var copy = require(‘../../../lib/copy’).copy`. This will
 put the function in the variable `copy`, so that it can be called later.
 2. `../spec-helper`
 3. the routes file itself. For example, the beacons routes is required like
 this: `var beacons = require(‘../../../routes/beacons’);`.
 4. If there are any models, you should require mongoose and the model
 definitions. If you need to reference ObjectIds, create a variable `ObjectId`
 and set it equal to `mongoose.Types.ObjectId`. For easy access to the models,
 create a variable for each one needed and call `mongoose.model()` with the model
 name to get the model out. For example, to get the User model, type in
 `var User = mongoose.model(‘User’);`.

In the smallest scope possible add a `beforeEach()` function call. The function
should assign a copy of the response object in helper to a variable response.
This refreshes the value of the response object, so that old data doesn’t get
stuck in it.

Each test should call the action function of the route. The parameters should
be a dummy [request object][req] and the copy of the response object set in the
`beforeEach()` call. If you aren’t using the request, you can pass in an empty
object.

[req]: #req-sec

Different routes specs will test different things in the response depending on
the request method the route is intended for.

One of the things a route spec for a GET request should test is that it renders
the appropriate view. The expectation to check if the view in the dummy
response equals the correct name of the view. For example, the beacons.create()
suite has a test with the expectation
`expect(response.view).toBe(‘beacons-create’);`.

The route spec for a GET request should also test that all the data in the
second parameter of `response.render()` is present and correct. The route spec 
for a POST, PUT, or DELETE request should test that the response
redirects to the appropriate url.

A route spec should also test that it is making the appropriate calls to the
database when necessary. Read [How To Write Tests for Functions That Use the
Models][model-spec] for a refresher on how to do this.

[model-spec]: #model-spec-sec

Once you’re done setting up the test, you can begin implementing the route
itself. When the route is required and set to a variable, the action functions
it defines are made available through the exports variable. (See [Node.js,
Require, Exports][require] for a better explanation.) In the route file, create a
property of the exports variable with the name of the action function and set
it equal to a function that takes two parameters: a request and a response.

[require]: http://openmymind.net/2012/2/3/Node-Require-and-Exports/

For a GET method, the last line of the function should call `response.render()`
with the view name as the first parameter and an object literal with the data
passed into the view as the second parameter. The job of the action function is
to gather all that data from the models and aggregate them into that one object literal.

For a POST, PUT, or DELETE method, the last line of the function should call
`response.redirect()` with the name of the url to redirect to as a parameter. The
job of the action function is to update the database and redirect to a page
that will show the next thing to the user. **Do not render a page from an action
function for a POST, PUT, or DELETE method.** It will break the back button and
users will want to punch us. Instead, we are following the [Post/Redirect/Get
Pattern][PRG], so users will be happy and smiley.

Try to [keep the route file small][skinny-controller]. [Move complicated model wizardry][model-method] to the
appropriate model.

[skinny-controller]: http://weblog.jamisbuck.org/2006/10/18/skinny-controller-fat-model
[model-method]: #model-method-sec

Finally, you will need to connect the route to the app. Open `lib/router.js`.
Inside the route function, require the new route, setting the return value
equal to a variable with the route name. Below that, add a call to the
appropriate request method on app, passing in the name of the url and the
action function of the route. For example, if the resource is thing, the action
is create, and the request method is GET, you would have the line
`app.get(‘/thing/create’, thing.create);`. Another example: for resource user,
action post, and request method POST, you would have the line
`app.post(‘/thing’, thing.post);`. See the [CRUD Naming Conventions][CRUD] for more
examples.

###<span id="route-spec-code">Route Test File Boilerplate for a GET Method</span>
```js
// change resource to the name of the resource
describe('resource', function(){
    // change action() to the name of the action function
    describe('action()', function(){
        var copy = require('../../../lib/copy').copy;
       
        var helper = require('../spec-helper');
        var response;
       
        // change resource
        var resource = require('../../../routes/resource');
       
        // if there are models:
        var mongoose = require('mongoose');
        var ObjectId = mongoose.Types.ObjectId;
       
        // change Model to the name of the model
        require('../../../models/Model');
        var Model = mongoose.model('Model'); // change Model
       
        beforeEach(function(){
            response = copy(helper.response);
        });
       
        // change view name
        it('should render the resource-action view', function(){
            // change function call to the action function of the
            // resource
            resource.action({}, response);
            // change view name
            expect(response.view).toBe('resource-action');
        });
       
        // More tests checking that response.data is correct...
    });
});
```

###<span id="get-route-code">Route Boilerplate for a GET Method</span>
```js
// Replace action with the action name
exports.action = function(request, response) {
    // Create the data variable as an object literal…
    response.render('resource-action', data);
};
```

###<span id="post-route-code">Route Boilerplate for a POST, PUT, or DELETE Method</span>
```js
// Replace action with the action name
exports.action = function(request, response) {
    // update the database…
    // Instead of rendering a page redirect to a route for a GET
    // method that will render the next page
    response.redirect(‘/next-page/url’);
};
```

##<span id="model-spec-sec">How To Write Tests for Functions That Use the Models</span>
Mongoose follows Node’s weird asynchronous callback madness, so testing things
that call model functions can be tricky.

Make a [test double](http://en.wikipedia.org/wiki/Test_double) for the model used, by calling the `spyOn()` function. The
`spyOn()` function takes two parameters: the object being spied on and the name
of the method being stubbed out.

Most model methods do work in a callback, rather than returning the results so
that the operations can happen asynchronously. To spy on these methods, chain
`andCallFake()` to the call to `spyOn()`. (Note the syntax is different from that
of the client-side tests. Sorry!) The `andCallFake() `function takes in a
function parameter that will be called instead of the real function. For most
model methods you will fake (e.g. `find()` or `findById()`), the first parameter(s)
are object literals identifying the [document](http://en.wikipedia.org/wiki/Document-oriented_database#Documents) you will be operating on and the
final parameter is the function called after the operations are complete. You
should call this function within your fake. You may want to first check that
the document identifier(s) are correct using an expectation. The function
should be called with null as the first parameter (representing an error) and
as the second parameter, an object literal or an array of object literals representing
the document identified.

##<span id="new-model-sec">How To Define a New Model</span>
Create the model file in the `models/` folder. Our convention is to name the file
after the model with a capital letter. So a Thing model would be in the file
`models/Thing.js`.

At the top of the file, require mongoose and set it to the variable `mongoose`.

You will be defining a schema for your model. If you need to refer to another
object within your schema, you should create a variable `ObjectId` and set it
equal to `mongoose.Schema.Types.ObjectId`. For example, the User model has a
property that references the Distance model using
`{‘type’: ObjectId, ‘ref’: ‘Distance’}`. The ObjectId within that is
mongoose.Schema.Types.ObjectId.

Note that mongoose.Schema.Types.ObjectId is different from
mongoose.Types.ObjectId. Use mongoose.Schema.Types.ObjectId within your schema,
and mongoose.Types.ObjectId any other time you need an ObjectId.

Next define the schema for your model. Our convention is to call the schema
variable `<model>Schema`. So the schema for the Thing model would be ThingSchema.
mongoose.Schema is a datatype you can use with the new operator to create a new
schema. The constructor takes one argument: an object literal with the names of the
schema properties as keys and the datatypes of the properties as values. See
the [Mongoose docs](http://mongoosejs.com/docs/schematypes.html) for a full explanation of how to use the SchemaTypes.

In the last line call the function `mongoose.model()`, passing in the name of the
model and its schema. For example, a Thing model would have the line
`mongoose.model(‘Thing’, ThingSchema);`.

If you want to [add methods to the model][model-method], you must put the method definition
before the call to `mongoose.model()`. **mongoose.model() must be the last line
of the file.**

###<span id="model-code">Model Boilerplate</span>
```js
var mongoose = require('mongoose');
// Needed when referencing another model
var ObjectId = mongoose.Schema.Types.ObjectId;
// Replace ModelSchema with schema name
// and object literal with schema definition
var ModelSchema = new mongoose.Schema({
    'string': String,
    'number': Number,
    'reference': {'type': ObjectId, 'ref': 'ReferencedModel'},
    'inner object':
    {
        'array': [String]
    }
});
// Put any model methods here...
// Replace Model and ModelSchema
mongoose.model('Model', ModelSchema);
```

##<span id="client-js-sec">How To Add Client-side JavaScript</span>
The client-side JavaScript is held within a namespace called `FREE`. The code is
separated into little modules that each implement one individual feature. This
keeps `freedom-beacon.js` from scaring the heck out of me.

First, determine the name of the feature you want to add and the general
category that feature falls under. Favor using or renaming an existing category
rather than creating a new one. The category will be the subfolder of
`public/javascripts/` your feature goes in.

We don’t have a convention for category names or feature names. They should be
nouns. Other than that, just be sensible.

If you created a new category folder, create a folder with that same name in
`spec/javascripts/`. Create the test file for the feature in the same category as
it is in `public/javascripts/`. Our convention is to name the test files
`<feature>Spec.js`. So a feature thing would have the spec file `thingSpec.js`. For
more on working with Jasmine read [A Short Explanation of Jasmine][spec].

In addition to the test file, you will probably need a [test fixture][] file. The
fixture file is a .html file that holds the HTML needed for the test to work.
This should mimic the HTML in the corresponding Handlebars view file.

Store your fixtures in a subfolder of `spec/javascripts/fixtures/` with the same
name as the feature category. Fixtures should usually be named after the
feature, but this is a flexible rule. If you need multiple fixtures for a
single test file, they will have to have different names. Name them to point
out their differences.

In the test file, the outermost suite should be named after the feature. The
next level of suites down should be the name of the feature function with
parentheses after it. For example, a feature function named
registerEventHandlers would have a suite named registerEventHandlers(). More
suites can be nested if there are additional conditions within the function.

Every feature should have an init function to keep things consistent. That way,
we never have to worry about whether we need to call init or not. We’ll just
call it. If the init function is empty or just does simple assignment, it
doesn’t need to be tested.

In the smallest scope possible, call `beforeEach()` with a function that does the
following:
 1. load the fixture by calling `loadFixtures()` with the name of the fixture as
 a parameter. Prefix the name with the category. For example, to load
 `spec/javascripts/fixtures/beacons/header-beacon.html`, call
 `loadFixtures(‘beacons/header-beacon.html’);`. If `loadFixtures()` fails,
 Jasmine-jQuery will give the least descriptive error message ever:
 “errorThrown”.
 2. It may help to set the feature to a shorter variable, rather than call
 `FREE.<feature>.<function>()` everywhere.
 3. Call the `init()` function of the feature.

Each test should check that the feature function is doing what is expected. You
will probably need to trigger a jQuery [event](http://api.jquery.com/category/events/) on a [selector](http://api.jquery.com/category/selectors/) before checking your
expectations.

Once you’re done setting up the test, you can start implementing the feature.
Open the feature file. On the first line, write `var FREE = FREE || {};`.

Next, create a property of `FREE` with the feature name and set it equal to the
result of a function that immediately calls itself. This function should return
an object literal holding the functions of the feature. Implement the feature
within this function.

Once you’re done implementing the feature, add it to
`public/javascripts/freedom-beacon.js`. Create a function that calls itself
immediately that inits the feature and calls the feature’s functions.

Then, open `lib/compressor.js`. In scripts, above
`public/javascripts/freedom-beacon.js`, add the name of the feature file. **Do not
put the name of the feature file below public/javascripts/freedom-beacon.js.**

###<span id="spec-fixture-code">Test Fixture Boilerplate</span>
```js
var FREE = FREE || {};
// Change Feature to the name of the feature
FREE.Feature = (function(){
    // Implement functions here...
   
    return {
        // init sets up the feature
        'init': function() {}
       
        // More functions...
    };
})();
```

##<span id="partial-sec">How To Create a Partial</span>
[Partials][partials-desc] are small snippets of HTML that are repeated in different places in
one or more views. They are useful for avoiding duplication in the views.

To make a partial, create a new Handlebars view in `views/partials/`. In the view
file you would like to include the partial, add `{{> partial-name}}` for a
partial named partial-name.handlebars.

If the partial needs variables you can use this syntax:
`{{> partial-name variableName}}` for a variable named variableName. The
variable’s properties will be available in the partial.

##<span id="util-sec">How To Create a Utility File</span>
Sometimes you need a function or group of functions to use in various places
throughout the node app. For example, the copy function copies an object and is
used in both specs and routes.

If you haven’t shamelessly stolen the function from StackOverflow, you will
need to test it. Create a new file in `spec/app/lib/`. (Currently `spec/app/lib/`
doesn’t exist, so you will need to create it.) Our convention is to name the
test files `<utility>Spec.js`. So a doStuff utility would have the test file
`doStuffSpec.js`. For more on working with Jasmine read [A Short Explanation of
Jasmine][spec].

We don’t have a convention for naming utility files except that if it holds
only one function, name it after the function. You can get the function out of
the utility file by requiring the file with the function as a property. For
example, if the function is called doStuff, add the line
`var doStuff = require(‘./lib/doStuff).doStuff;` wherever you need the
function. (Note the number of dots before `/lib/doStuff` depends on where in the
file system you are. The example assume the root directory.)

In the test file, the outermost suite should be named after the utility. The
next level of suites down should be named after the utility functions with
parentheses after them. For example, a function named doStuff would have a
suite named doStuff(). More suites can be nested if there are additional
conditions within the function.

Each test should check that the utility functions are doing what is expected.
Don’t forget to require the utility itself and put it in a variable.

Once you’re done setting up the tests, you can begin implementing the utility.
The functions should be made as properties of exports. This will ensure the
functions are exported from the utility file into the variables that require
them. See [Node.js, Require, Exports][require] for a better explanation.

##<span id="model-method-sec">How To Add a Method to a Model</span>
Create a new test file in the `spec/app/models/` folder. Our convention is to
name the test files `<model>Spec.js`. So a Thing model would have the test file
`ThingSpec.js`. For more on working with Jasmine read [A Short Explanation of
Jasmine][spec].

In the test file, the outermost suite should be named after the model. The next
level of suites down should be named after the model methods you want to test
with parentheses after them. For example, a method named findMessages would
have a suite named findMessages(). More suites can be nested if there are
additional conditions within the method.

You do not need to test the built-in model methods. Better programmers than us
have tested the shit out of those. We just need to test our own custom methods.

In the smallest scope possible, include the following:
 1. Require the mongoose module and set it equal to the variable `mongoose`.
 2. If you are using ObjectIds, you should set the variable `ObjectId` equal to
 `mongoose.Types.ObjectId`. Note that this is different from
 `mongoose.Schema.Types.ObjectId`, which should only be used in schema
 definitions.
 3. If you are using ObjectIds, you should also require the spec helper and set
 it equal to the variable `helper`. This gives you access to dummy ObjectIds. To
 create a new dummy ObjectId, add a property to the `ids` property in the spec
 helper. The value of the property must be a 24-digit hex string.
 4. Require the model definition within the `../../../models/` directory. You do
 not need to set it equal to a variable.
 5. To access the model, call `mongoose.model()` with the model name as the
 parameter and set that equal to a variable holding the model. For example, if
 you were testing the Thing model, you would have the line
 `var Thing = mongoose.model(‘Thing’);`.

Each test should check that the model functions are doing what is expected.
Once you’re done setting up the test, you can begin implementing the model
method.

Open the file for the model. Before the line that creates the model from the
schema, create the model method as a property of the schema’s methods property,
and set it equal to the function that implements the method. For example, if
you wanted to create a `findStuff()` method on the Thing model, the property you
would create would be `ThingSchema.methods.findStuff`. **The call to
mongoose.model() must be the last line of the file**. See the [Model Boilerplate](#model-code)
for a larger example.

If you need to refer to an ObjectId within the method, you want to use
mongoose.Types.ObjectId. Write that out in full, rather than just using
ObjectId. The shorter form has already been declared in the file to be
mongoose.Schema.Types.ObjectId. mongoose.Schema.Types.ObjectId and
mongoose.Types.ObjectId are two different things. Only use
mongoose.Schema.Types.ObjectId within a Schema definition.

###<span id="model-spec-code">Model Test File Boilerplate</span>
```js
// Change Model to the model name
describe('Model', function(){
    // Change method to the method name
    describe('method()', function(){
        var mongoose = require('mongoose');
       
        // If you need to test ObjectIds, this will help
        var ObjectId = mongoose.Types.ObjectId;
       
        // Change Model to the model name
        require('../../../models/Model');
       
        // Change Model to the model name
        var Model = mongoose.model('Model');
       
        // Write tests...
    });
});
```

##<span id="ajax-sec">How To Use AJAX</span>
[AJAX][] allows you to load data from the server without refreshing the page.
jQuery provides functions that make AJAX fairly straightforward.

[AJAX]: http://en.wikipedia.org/wiki/Ajax_(programming)

First, decide if it’s a get or a post. Get retrieves things from the server;
post puts things into the server. Put and delete aren’t available, so for those
ones use post instead.

The parameters of `$.get()` and `$.post()` are the same.

The first is the name of the url the request will go to. You will need to
[create a new route][new-route] that handles the request. Instead of ending the route action
function with `response.render()` or `response.redirect()`, you will end it with
`response.json()` for get requests or `response.send()` for post requests. The
parameter for `response.json()` is a JSON object. The parameter for
`response.send()` is a [response status code][res-status] (usually 200).

[res-status]: http://en.wikipedia.org/wiki/List_of_HTTP_status_codes

The second parameter is an object literal of data to pass to the server. For
`$.get()`, the data will be in `request.query`; for `$.post()`, the data will be in
`request.body`.

The last parameter is a function that is called after the request has been
completed. For `$.get()`, It takes in a parameter data that holds the JSON the
server sent back. It should add new html to the page that displays the data.
For `$.post()`, it should redirect to a new url using `FREE.Url.redirect()`.

##<span id="layout-sec">How To Change the Layout for a Specific Page</span>
Some pages may need a different layout from the default. To create one for an
individual page, first make the layout view in `views/layouts/`. We don’t have a
convention for naming them, so pick something sensible.

When Handlebars compiles the layout template, it uses the variable `body` for the
body of the page. To render the body correctly, you need three pairs of curly
braces around body like this: `{{{body}}}`. Otherwise, Handlebars will escape all
the HTML in the body.

Finally, go to the route(s) that render your page and add a layout property
with the name of your custom layout to the the data parameter of
response.render(). For example, if your layout is named thing the second
parameter of `response.render()` could be `{‘layout’: ‘thing’}`. (There could be
more data in the second parameter in addition to the layout.)

###<span id="layout-code">Layout Boilerplate</span>
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title><!-- add a title --></title>
 
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
 
  <link rel="stylesheet" href="/stylesheets/vendor/bootstrap.min.css">
  <link rel="stylesheet" href="/stylesheets/vendor/bootstrap-theme.min.css">
  <link rel="stylesheet" href="/stylesheets/beacon.css">
 
  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
  <![endif]-->
</head>
<body><!-- You can change the classes on body for css hooks -->
  <input type="hidden" name="app-id" value="{{fb.appId}}">
  <main role="main" class="container"><!-- You can change the classes on main for css hooks -->
    {{{body}}}
  </main>
 
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script src="/javascripts/vendor/bootstrap.min.js"></script>
  <script src="/javascripts/freedom-beacon.min.js"></script>
</body>
</html>
```

##<span id="req-sec">How To Use the Request Object</span>
An HTTP request is a request from the browser for data from the server. Express
wraps the real request in its own [request object](http://expressjs.com/api.html#req.params). It is important to know what
properties of request has what data. Here are a few of the important ones.

###<span id="req-body-sec">body</span>
Holds the data from forms. Any element within the form sent with a name
attribute will have its value put in body.

###<span id="req-params-sec">params</span>
Holds route variables. When you create a route with a colon (e.g.
‘/things/:id’), express interprets the thing with the colon as a variable. It
will put that variable in params. For example, if the above route existed and
the user entered the url ‘/things/0’ in their browser window, 0 would be put in
`params.id`.

###<span id="req-query-sec">query</span>
The query of a url is the part after the question mark. It has the syntax
`?<name1>=<value1>&<name2>=<value2>`. The variables in the query are made
available through query. query is also used when [sending data using jQuery’s
`get()`](#ajax-sec) method.

###<span id="req-sess-sec">session</span>
A session allows us to store state between requests for each user. `session`
makes it easy to set and access session variables.

##<span id="mongoose-methods-sec">How To Call the Built-In Methods on Mongoose Models</span>
The methods we most commonly call for mongoose models are: `find()`, `findById()`,
`create()`, and `save()`. [There are more](http://mongoosejs.com/docs/api.html#model-js). The first three are static, so they are
called on the model datatype (the upper camel case one). The last one is called
on an instance of a model object (the lower camel case one).

Built-in model methods do not return intuitive values. For example, `find()`
DOESN’T return the objects found. This is because these methods operate [asynchronously][async].
Any statement you put after the method will be executed before the method
completes. Instead, you must put the things you want called after the method in
a [callback function][callback].

[async]: http://en.wikipedia.org/wiki/Asynchronous_method_dispatch
[callback]: http://en.wikipedia.org/wiki/Callback_(computer_programming)

One way to do this is to pass in the callback as the last parameter of the
method. The first parameter of the callback is always `err`. If there are more
parameters, they are the value(s) you would expect to be returned. For example,
the second parameter of the callback for `findById()` is the object found. `save()`
only has the `err` parameter in its callback.

`find()`, `findById()`, and `create()` have a second way of using the callback. These
methods return an object upon which you can call the `exec()` function. The `exec()`
function takes in a callback as its single parameter. This callback is the
alternative to passing it into the model method as a parameter directly.

There are tradeoffs for when you would use either way of calling the callback.
The second way should be preferred. It looks much neater and avoids nesting
callback hell. In fact, it is the only way to use the `populate()` function.

The `populate()` function can be called on the thing returned by `find()` and
`findById()`. It is used when you have a reference to another model within a
model and you want to populate the reference with the objects from the
referenced model. This allows you to use the properties of the referenced model
as if they were properties of your model.

For example, if you had a User model with a distance property that held the id
of the user’s distance and you wanted to log to the console the name of the
distance of a user with id userId, you would call:
```js
User.findById(userId).populate(‘distance’).exec(function(err, user){
    console.log(user.distance.name);
});
```

So when would you use the first way of passing in a callback? Because you need
to put everything in a callback, you will often have nested callbacks. If you
need to reference the objects in the outer callback within the inner callback,
you need to inline the callbacks.

For example, if you want to log to the console the names of Users who match a
Regexp search, but you don’t want to list the friends of a user with the id of
userId, you would call:
```js
User.findById(userId).exec(function(err, user){
    User.find({‘name’: search}, function(err, searchResults){
        for (var i = 0; i < searchResults.length; ++i) {
            var searchResult = searchResults[i];
            if (user.friends.indexOf(searchResult._id) == -1) {
                console.log(searchResult.name);
            }
        }
    });
});
```