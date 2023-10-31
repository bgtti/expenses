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

TO-DO:
Set up favorite workspace:
BE:

- when user creates his/her first workspace, set it as favorite
- then send this workspace's settings (group, expense numbering,etc) to the front end upon log-in
  FE:
- handle redux accordingly - including nav bar

Then:

- check workspace settings if those are being imported correctly
- check that when workspace is changed, the new WS settings are being imported

Also: upon WS creation, add default accounts: bank account and cash account should be defaults

Then:

- when implement alowing favorite workspace to be changed upon addition of second workspace

Then:

- implement the option 'Board' as WS's dashboard

Then:

- Ready to implement subsequent missing parts(start with expenses).

### 1.Account

- Sign-up: ready
- Sign-up email confirmation: MISSING
- Log-in: ready
- Log-in with google: MISSING
- Change user name: MISSING
- Change user email: MISSING
- Change user password: MISSING
- Email confirmation: MISSING
- Delete account: TEST

### 2.Worspaces

- Add workspace: ready
- Delete workspace: ready
- Edit workspace: ready
- Share workspace: MISSING
- Set favorite workspace: MISSING

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

- Show settings page of selected workspace: ready

#### 4.2 Group

- Add group: done
- Edit group: done
- Delete group: done

#### 4.3 Account

- Add account: done
- Edit account: done
- Delete account: done

### 5.Expenses Settings

#### 5.1 Category

- Add category: done
- Edit category: done
- Delete category: done

#### 5.2 Tags

- Add tags: MISSING
- Edit tags: MISSING
- Delete tags: MISSING

#### 5.3 Numbering

- Add numbering choice: MISSING

### 6.Admin Panel

- Allow an admin to see all app users
- Allow an admin to edit users

### 7.Error messages

- Currently using console.errors -- should be replaced with proper error messages
  Possibilities:
  https://www.npmjs.com/package/react-toastify
  https://www.material-tailwind.com/docs/react/alert
  or custom alert messages

### 8.To-dos and notes

- Allow users to add a to-do to dashboard: MISSING
- Allow users to add a to-do to WS board: MISSING
- Allow users to pin notes to dashboard: MISSING
- Allow users to pin notes to WS board: MISSING
- Allow users to assign a to-do to other persons whose WS they share: MISSING

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

## NOTE ON EXPENSE NUMBERING

If the preferred way to number expenses is Year Month Number, the year and month will be derived from the date of the expense. The number will be derived from a counter based on the number of expense inputs of the period (ie: the third expense you include with a date of January 2024 will be numbered 2024-01-003). The counter resets every month.
In the case of 'Year Number' types, the counter will reset every year. So, for the 15th expense you include in 2024, the number will be 2024-015 (ie: independent of the month).
In the case you choose only to use a counter, the number will never reset. In this case, you can also choose to have the counter starting with any positive number. The default start number is 0.

Note that if you choose to chage the expensenumbering format, the new format will not be automatically applied to existing expenses.
Similarly, if you change the date on an expense already created, the expense number will not be automatically changed (even if you have 'Year Month Number' set as the numbering type and you change the month).
Also, deleting an expense will not automatically re-number other expenses.
The reason for this is to avoid confusion and trouble in the case of an audit, where the reference numbers do not match old records, or any situation that would cause cunfusion in financial reporting.

It is recommended that the user uses 'Year Month Number' type of formatting - or at least 'Year Number' - instead of only a number. The reason is the confusion that might be caused in the case of changes to expenses later on. If an expense is deleted from the system, this will cause a gap in your numbering. Similarly, if you change the date of an expense, the numbers will not represent the chronological order of events. Correcting the invoice number of all past invoices is easy - but also not recommended, since this may cause past financial references to mismatch your data. It is much easier to make corrections to dated numering, since the counter resets monthly or yearly, and thus less expenses will be affected by changes.

## BUILD THIS OPTION:

In case you made a correction and would like the expenses to be re-numbered as a consequence (for instance, to avoid gaps in the numbering in case of an expense deletion or in case you changed your numering settings), you can go to the Workspace settings, and under expense numbering click on 'Update Expense Numbers".
If you do not want all past expenses to be re-numbered, you can filter all expenses within a date range and those will be re-numbered.
