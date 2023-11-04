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
>
> When state.isLoggedIn.loggedIn is true, user will be sent to dashboard.
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

1.  user should input a name, a unique email, and repeat the same password 2x
2.  user's account should be created and re-directed to user's dashboard