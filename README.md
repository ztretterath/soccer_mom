# soccer_mom

It all began when I was a third-grade student with soccer games to play and snacks to enjoy.
As a child I never considered the effort required to organize a snack list and share snacks between parents.
Enter Soccer Mom Companion.
SMC aims to relieve the stress of the Saturday snack predicament.
The app utilizes a mongo database and with the magic of Mongoose, JavaScript, HTML5, and CSS3 allows users to create usernames and passwords and begin sharing snack ideas and also to view a calendar (work in-progress) where game times and snacks are compiled.

1. When a user visits '/',
  1.1. All visitors (users or not) are brought to the site's homepage. A button in the upper left hand corner appears for signing in / up.

2. When a user visits '/signup',
  2.1. If the visitor has an account they may sign in and will be navigated to the user-specific homepage.
  2.2. If the visitor does not have a user account and attempts to sign in they will be redirected to the site's homepage.
  2.3. If the visitor does not have an account and signs up they will be redirected to '/signup' and will be able to sign in (see 2.1).

3. When a user visits '/userhome',
  3.1. The 'sign out' button will end the user's session and bring the user to the site's homepage.
  3.2. The 'home' button will bring the user back to their '/userhome' page.
  3.3. The 'calendar' button will bring the user to a calendar page that compiles snacks and game times for user viewing.
  3.4. The 'mother list' brings the user to a page that compiles all users' snacks for ideas and collaboration.
  3.5. The password link will bring the user to a password edit page. They may enter a new password for their account.
    3.5.1. If the user creates a new password they will be directed back to the sign in page where they will be able to sign in using their new account information.
  3.6. The user may create a new snack by entering the snack's name in the text field.

4. When a user visits '/calendar',
***This feature is a work in progress***
  4.1. The user sees a calendar that aims to compile user data for easy access.
  4.2. The user may edit the content of set game-days including the snacks being brought, who is bringing them, and what time the game is to begin.
***This feature will allow users to save changes to the calendar (store in db) and will update the calendar for all users***

5. Style features:
  5.1. The mother list:
    5.1.1 Utilizes ul and li with some styling to set height and width of each user 'sticky'.
    5.1.2. Silly google fonts make the snacks look handwritten.
    5.1.3. A transform: rotate property skews the ul on the page and makes it appear to be a sticky note.
    5.1.4. A transform: scale property on hover makes the sticky note appear to come closer to a user (1.25 x as large).
  5.2 The calendar:
    5.2.1. A calendar id wraps every property to make specificity while styling
    5.2.2. The calendar is created with div and ul (similar to connect four project).
    5.2.3. Each week is represented by an unordered list and each day an element within the list.
    5.2.4. Divs within the lists represent different game times and snacks being brought (access the content with contenteditable property).
    5.2.5. Hover effects create the effect of interactivity.


    https://wireframe.cc/FK39ix
    https://wireframe.cc/HvASui
    https://wireframe.cc/bQvdiF
    https://trello.com/b/RUElaWNf/soccer-mom-app
