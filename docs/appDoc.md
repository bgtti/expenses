<div align="center">
  <br>
  <h1><b>Expenses</b></h1>
  <strong>Software Documentation</strong>
</div>
<br>

# Table of Contents

- [Introduction](#introduction)
- [Website](#website)
- [Signup and Login](#signup-and-login)
  - [Signup](#signup)
  - [Login](#login)
- [User settings](#user-settings)
- [Workspace](#workspace)
- [Invites](#invites)
  <br>

# Introduction

Bookeeping is an essential part of business, and a user may need bookeeping for one or more projects or organizations.
When a user creates an account, the user will need to create a Workspace. This is the user's organization or project being tracked.
A workspace will have its settings and data (such as expenses). A user can have one to ten different workspaces.
The user shall also be able to share the workspace with other users, so these may have access to this particular workspace's data.
We will see how this is translated into the front and back-end code created for this app.

# Website

Website pages... home, login, signup...

# Signup and login

## Signup

<img src="../docs/docImages/sign_up.jpg" alt="Signup component" width="300" height="auto">

Requirements:

1.  user should input a name, a unique email, and repeat the same password 2x
2.  user's account should be created and re-directed to user's dashboard

<details>
   <summary>Frontend</summary>

> \
> src/Pages/Website/SignUp.jsx contains the UI which will validate the form.
> <br/><br/><b>Form validation:</b>
>
> <input type="checkbox" disabled checked /> Name should contain at least 1 character and a maximum of 200<br/>
> <input type="checkbox" disabled checked /> Email should contain @ and have a maximum length of 320 characters<br/>
> <input type="checkbox" disabled checked /> Password should contain at least 6 characters and a maximum of 60 characters<br/> 
> <input type="checkbox" disabled checked /> User should be able to repeat the same password 2x<br/>
> <input type="checkbox" disabled checked /> Whitespaces are trimmed<br/>
>
> <b>Frondend code</b><br/>
> The form then dispatches a redux action signUp (at src/general_redux/SignAndLogIn/actions.js) will send the form information to the server, wich will return a response. If status is 200, the state will be updated (at src/general_redux/SignAndLogIn/reducer.js ) in the following way:
>
> - state.isLoggedIn.loggedIn will be set to true,
> - state.isLoggedIn.token will store the token required for any subsequent API call,
> - state.isLoggedIn.user will store user information: name and email.
> - signUp will dispatch saveInvitesInfo or invitesInfoSetAsUndefined accordingly. These are actions at src/general_redux/Invites/actions.js. state.allInvites.hasInvites can be called to see if the user has invites and, if so, state.allInvites.invites is where these are stored.
>
> When state.isLoggedIn.loggedIn is true, user will be sent to the user's dashboard.
> <br/><br/>

</details>

<details>
   <summary>Backend</summary>

> \
> app/account/routes.py contains the register_user() route.
> <br/><br/><b>Data validation:</b>
>
> <input type="checkbox" disabled checked /> Name should contain at least 1 character and a maximum of 200.<br/> 
> <input type="checkbox" disabled checked /> Email should contain @ and have a maximum length of 320 characters. Certain characters will also not be allowed in the email.<br/> 
> <input type="checkbox" disabled checked /> Email should be unique in the database.<br/> 
> <input type="checkbox" disabled checked /> Password should contain at least 6 characters and a maximum of 60 characters.<br/> 
> <input type="checkbox" disabled checked /> Password should be salted and hashed.<br/> 
> <input type="checkbox" disabled checked /> Access token should be created.<br/>
>
> <b>Backend code</b><br/>
> register_user() will use a helper funtion to generate a random salt that is added to the password to provide an extra layer of security. Token generation uses flask_jwt_extended, which will be used in other routes to identify the user making requests. The function will check whether this user's email has received any invites from other users, save the user to the database model User (at app/models/user_and_workspace.py) and send the following information to the frontend:
>
> - response and, if 200 the other information,
> - access_token,
> - user information (name and email),
> - whether user has invites (and if so, which one(s)),
> - whether user has workspaces (which is false, since the user has not created any workspaces at this time).
>
> <br/><br/>

</details>

<details>
   <summary>Request and response examples</summary>

> \
> <img src="../docs/docImages/sign_up_example.jpg" alt="Signup example with user data" width="300" height="auto">
>
> <b>Payload:</b>
>
> ```json
> {
>   "name": "Joseph",
>   "email": "joseph@myemail.com",
>   "password": "josy756"
> }
> ```
>
> <b>Response:</b>
>
> ```json
> {
>   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5OTExNDg1OCwianRpIjoiNzgzOGI1NzEtNGRiOS00YjlmLWFmZGEtMzIwNzZhMWM3MmNjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6Impvc2VwaEBteWVtYWlsLmNvbSIsIm5iZiI6MTY5OTExNDg1OCwiZXhwIjoxNzAxNzA2ODU4fQ.RaluxJi8T2IC6uNc5SBG8_oEy9j3cnFjcXvORqYLgNg",
>   "has_invites": false,
>   "has_workspaces": false,
>   "invites": [],
>   "response": "success",
>   "user": {
>     "email": "joseph@myemail.com",
>     "name": "Joseph"
>   }
> }
> ```
>
> <br/><br/>

</details>

## Login

<img src="../docs/docImages/log_in.jpg" alt="SLogin component" width="300" height="auto">

Requirements:

1.  user should input an email and password to log in. FE send this information to BE
2.  BE responds with access token, whether the user has new invites (and if so, what they are), whether the user has any workspace (and if so, which ones), and detailed information about the user's favorite workspace (including workspace settings). 
2.  user is re-directed to user's dashboard

<details>
   <summary>Frontend</summary>

> \
> src/Pages/Website/LogIn.jsx contains the UI which will validate the form.
> <br/><br/><b>Form validation:</b>
>
> <input type="checkbox" disabled checked /> Email should contain @ and have a maximum length of 320 characters<br/>
> <input type="checkbox" disabled checked /> Password should contain at least 6 characters and a maximum of 60 characters<br/> 
> <input type="checkbox" disabled checked /> Whitespaces are trimmed<br/>
>
> <b>Frondend code</b><br/>
> The form then dispatches a redux action logIn (at src/general_redux/SignAndLogIn/actions.js) will send the form information to the server, wich will return a response. If status is 200, the state will be updated (at src/general_redux/SignAndLogIn/reducer.js ) in the following way:
>
> - state.isLoggedIn.loggedIn will be set to true,
> - state.isLoggedIn.token will store the token required for any subsequent API call,
> - state.isLoggedIn.user will store user information: name and email.
> - logIn will dispatch saveInvitesInfo or invitesInfoSetAsUndefined accordingly. These are actions at src/general_redux/Invites/actions.js. state.allInvites.hasInvites can be called to see if the user has invites and, if so, state.allInvites.invites is where these are stored.
> - logIn will dispatch saveWorkspaceInfo. This is an action of src/general_redux/UserSettingsWorkspaces/actions.js. state.allWorkspaces can be called and contains 3 keys: state.allWorkspaces.hasWorkspaces will be true if user has any workspace, state.allWorkspaces.favoriteWorkspace will contain the main information about the user's favorite workspace, and state.allWorkspaces.workspaces contains basic information about all workspaces the user owns or has access to.
> - logIn will dispatch setSelectedWorkspaceOnLogIn if the user has any workspace. Reason is, if a user has at least one workspace, the user should have a favorite workspace. This is an action of src/general_redux/Workspace/actions.js. state.selectedWorkspace contains information about the workspace currently in use by the user, such as basic workspace information and workspace's settings.
> 
> When state.isLoggedIn.loggedIn is true, user will be sent to the user's dashboard.
> <br/><br/>

</details>

<details>
   <summary>Backend</summary>

> \
> app/account/routes.py contains the login() route.
> <br/><br/><b>Data validation:</b>
>
> <input type="checkbox" disabled checked /> Email should contain @ and have a maximum length of 320 characters. Certain characters will also not be allowed in the email.<br/> 
> <input type="checkbox" disabled checked /> Email should exist in the database.<br/> 
> <input type="checkbox" disabled checked /> Password should contain at least 6 characters and a maximum of 60 characters.<br/> 
> <input type="checkbox" disabled checked /> Add salt to password before checking.<br/> 
> <input type="checkbox" disabled checked /> Access token should be created and valid for 30 days.<br/>
>
> <b>Backend code</b><br/>
> login() will call helper functions to get data from the database. The function will check whether this user's email has received any invites from other users, and send the following information to the frontend:
>
> - response and, if 200 the other information,
> - access_token,
> - user information (name and email),
> - whether user has invites (and if so, which one(s)),
> - whether user has workspaces (and if so, basic information about all of them).
> - if user has at least one workspace, also information about the favorite workspace, including workspace settings information.
>
> <br/><br/>

</details>

<details>
   <summary>Request and response examples</summary>

> \
> <img src="../docs/docImages/log_in_example.jpg" alt="Login example with user data" width="300" height="auto">
>
> <b>Payload:</b>
>
> ```json
> {
>   "email": "joseph@myemail.com",
>   "password": "josy756"
> }
> ```
>
> <b>Sample response of user with no workspaces:</b>
>
> ```json
> {
>   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5OTIxNDUyNCwianRpIjoiMGU0OWMwMjktOWE4MC00MTJlLTlmNTMtYjllZDFmMjAxZGMyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6Impvc2VwaEBteWVtYWlsLmNvbSIsIm5iZiI6MTY5OTIxNDUyNCwiZXhwIjoxNzAxODA2NTI0fQ.oHbm5ExwoYsm1pQOcY8RHy81XJIv_RUXPDbM3DNbG80",
>  "favorite_workspace": null,
>  "favorite_workspace_settings": "",
>  "has_invites": false,
>  "has_workspaces": false,
>  "invites": [],
>  "response": "success",
>  "user": {
>    "email": "joseph@myemail.com",
>    "name": "Joseph"
>  },
>  "workspaces": []
> }
> ```
>
> <b>Sample response of user with two workspaces:</b>
>
> ```json
> {
>   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5OTIxNDUyNCwianRpIjoiMGU0OWMwMjktOWE4MC00MTJlLTlmNTMtYjllZDFmMjAxZGMyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6Impvc2VwaEBteWVtYWlsLmNvbSIsIm5iZiI6MTY5OTIxNDUyNCwiZXhwIjoxNzAxODA2NTI0fQ.oHbm5ExwoYsm1pQOcY8RHy81XJIv_RUXPDbM3DNbG80",
>   "favorite_workspace": {
>      "abbreviation": "JJ",
>      "currency": "USD",
>      "name": "JJ Company",
>      "uuid": "4fa00fa52bb74d9dbde94f194fcc7eca"
>    },
>   "favorite_workspace_settings": {
>      "accounts": [],
>      "expense_categories": [],
>      "expense_numbering_settings": {
>         "expense_counter": 0,
>         "expense_counter_custom_start": 0,
>         "number_custom_prefix": "",
>         "number_digits": 3,
>         "number_format": "YMN",
>         "number_separator": "-",
>         "number_start": 1,
>         "number_year_digits": 4
>       },
>      "groups": [],
>      "uuid": "4fa00fa52bb74d9dbde94f194fcc7eca"
>  },
>  "has_invites": false,
>  "has_workspaces": true,
>  "invites": [],
>  "response": "Logged in successfully",
>  "user": {
>    "email": "joseph@myemail.com",
>    "name": "Joseph"
>  },
>  "workspaces": [
>    {
>      "abbreviation": "JJ",
>      "currency": "USD",
>      "is_owner": true,
>      "name": "JJ Company",
>      "num_users_with_access": 0,
>      "users_with_access": [],
>      "uuid": "4fa00fa52bb74d9dbde94f194fcc7eca"
>    },
>    {
>      "abbreviation": "JG",
>      "currency": "EUR",
>      "is_owner": true,
>      "name": "J & Co Germany",
>      "num_users_with_access": 0,
>      "users_with_access": [],
>      "uuid": "d8d719d4ae884b26845d2281826143ba"
>    }
>  ]
> }
> ```
>
>
> <br/><br/>

</details>