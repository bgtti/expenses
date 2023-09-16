# Expenses App

This App is under construction.
Come back soon.



Live site: [Click here](https://...).

## Installation
This project still uses create react app. More information available at https://legacy.reactjs.org/docs/create-a-new-react-app.html
Clone this repository. Then cd into the project, install the node files and compile the React app:
```pws
cd expenses
npm install 
npm start
```
## State management
Global state is managed using redux. This is found in the genral_redux folder where the store file combines the different reducers.

## The App
- A user can signup to an account, where the user can log in, log out, change their account information (name, email, and password), delete their accounts, and create workspaces.
- A user can have many Workspaces. Workspaces can be different projects or companies. A Workspaces can only have one owner.
- The Workspace owner can add, edit, and delete a Workspace. The Workspace owner can also pass ownership of a Workspace to another user. They can also invite other users to access their Workspace.

## App Status
### 1.Account
- Sign-up: ready
- Sign-up email confirmation: MISSING
- Log-in: ready
- Log-in with google: MISSING
- Change user name: MISSING
- Change user email: MISSING
- Change user password: MISSING
- Delete account: TEST

### 2.Worspaces
- Add workspace: ready
- Delete workspace: ready
- Edit workspace: ready
- Share workspace: MISSING

### 3.Invites
#### 3.1 Workspace access invite
- Send invite: MISSING
- Receive invite: MISSING
- Cancel invite: MISSING
- Decline invite: MISSING
- Accept invite: MISSING

#### 3.1 Workspace ownership transfer invite
- Send invite: MISSING
- Receive invite: MISSING
- Cancel invite: MISSING
- Decline invite: MISSING
- Accept invite: MISSING

### 4.Workspace Settings
#### 4.1 Settings page
- Show settings page of selected workspace: MISSING

#### 4.2 Group
- Add group: MISSING
- Edit group: MISSING
- Delete group: MISSING
#### 4.3 Account
- Add account: MISSING
- Edit account: MISSING
- Delete account: MISSING

### 5.Expenses Settings
#### 5.1 Category
- Add category: MISSING
- Edit category: MISSING
- Delete category: MISSING

#### 5.2 Tags
- Add tags: MISSING
- Edit tags: MISSING
- Delete tags: MISSING

#### 5.3 Numbering
- Add numbering choice: MISSING

### 6.Admin Panel
- Allow an admin to see all app users
- Allow an admin to edit users


## Design Ideas:
App example: https://m2.material.io/design/color/applying-color-to-ui.html#top-and-bottom-app-bars
Light/dark mode: https://www.epicpxls.com/items/hireme-job-finder-app-ui-kit
Another idea: https://www.fiverr.com/josephstephe585/do-mobile-ui-design-mobile-app-ui-ux-design-ui-ux-design-figma
Another: https://www.behance.net/gallery/16789827/DO-Mobile-UI-Kit-UIUX-Art-Direction

React folder structure: https://www.xenonstack.com/insights/reactjs-project-structure

## Useful links:
redux: https://www.youtube.com/watch?v=CVpUuw9XSjY
token authentication: https://www.youtube.com/watch?v=8-W2O_R95Pk&t=793s
middleware implementation: https://www.youtube.com/watch?v=JDZRfLGNWdc
