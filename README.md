# Hello!
## It's a "Calendar".
### The test task to Ciklum University JS Band internship.

#### You can find a live version of the page [here](https://pechpavlo.github.io/calendar/)

### To start project locally you need:

1. Fork this repository
2. Checkout to develop branch
3. Navigate to the front folder
4. ```npm i```
5. ```npm run start```
6. you are in business!

#### Description.
* It's  a meeting scheduler application for one meeting room;
* Application has two screens: “Calendar” screen and “Create event” screen;
* “Calendar” screen consists of a pre-defined table with 5 days (Mon-Fri) for columns and 9 time slots (10:00-18:00, one hour long each) for rows;
* There is a team of several people that can take part in the meetings;
* One meeting can take only 1 hour and obtain one cell in the “Calendar” screen;

#### Basic feature requirements

* On a “Calendar” screen user should be able to see all meetings scheduled for the meeting room;
* User should be able to filter meetings by a person;
* In order to create a new meeting user should click the “New Event+” button at the “Calendar” screen, after that he should be transferred to the “Create event” screen. At that screen user should enter meeting title, select participants (can be multiple), select day (Mon-Fri), select time (10:00-18:00);
* The meeting can be successfully created if and only if the time slot for that day and time is free. Otherwise, the error bar should be shown.
* After successful creation of an event, the user should be transferred back to the “Calendar” screen where a new event should already be displayed.
* In order to delete a meeting user has to click the delete icon near the meeting title at the “Calendar” screen and then confirm his action in a confirmation dialog.

As an optional requirement, I've implemented the possibility to change meeting day/time using drag and drop technique on the “Calendar” view.

I've used only pure Javascript, SCSS preprocessor,  Webpack, and EsLint with  Airbnb config.

For saving user's scheduler settings used LocalStorage.

#### Homework 1 feature requirements

* Each team member should belong either to User class or Admin class.;
* When user opens an application he/she has to authorize himself using the select modal (like in the example mockup);
* If authorized user is Admin he is able to create and update events(if Drag and Drop was implemented in your test task);
* If authorized user is User he/she is not able to create/update events. This means that 'Create Event' button should be hidden for those users.

#### Homework 2 feature requirements

Implement CRUD operations for events.
* All Events should be stored on BE side;
* For communicating with API you may use Fetch, Axios etc...;
* Implement create Event via POST method;
* Implement delete Event via DELETE method;
* To retrieve all Events use GET method;
* If you have drag'n'drop you should update Event via PUT method;.
* For each API call implement Notification that indicates a successful response.
##### Optional requirements:
* Please use async/await for handling API responses;
* Store users in API (create separate entity called 'users' and retrieve them via GET method);

#### Homework 3 feature requirements

Improve code and use patterns such as Singleton, Factory Method, and optional Decorator.
* Use class for interaction with the backend;
* Should create only one instance of this class;
* Should be all possible error in API processed via a decorator approach;

##### Optional requirements:
* Communication with server should be implemented by using Event emmitter pattern;

#### Homework 4 feature requirements

In this homework I have to enhance your project with development tools.
* Add ESLint to your project. It should use eslint-config-airbnb;
* Add and setup Jest. Create unit tests for business logic CRUD operations and Event creation form (at least 5 tests);
* Add Webpack to your project. It should use loaders for *.js, *.scss files and add plugins that minified your javascript code;
* Describe application launch process and commands that you have in README.md;

##### Optional requirements:
* Add Prettier;
* Add stylelint;

