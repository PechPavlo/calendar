# Hello!
## It's a "Calendar".
### The test task to Ciklum University JS Band internship.

#### You can find a live version of the page [here](https://pechpavlo.github.io/calendar/)

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
