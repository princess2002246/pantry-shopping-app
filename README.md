Topic: ReactTS <br />
Submission Date: 26 October 2026 <br />
Time: 09:00 AM


Please submit by pushing to your GitHub repository and creating a pull request to your mentor

# Title: Task 5 - Shopping List App

## Objective
Build a shopping list application using ReactTS and json-server that allows users to create and track different shopping lists using Redux for state management. Make use of proper web app navigation practices.

### This is the fifth official task for React based on Lesson 5.

## Requirements

### Pages
1. Login Page
2. Registration Page
3. Home Page
4. Profile Page
   
### User Interface
1. Create a user-friendly interface that is intuitive and easy to use
2. Allow users to access the pages easily regardless of screen size
3. The interface should have an appropriate page with appropriate elements to display, and manage the shopping lists and their items

### FEATURE REQUIREMENTS
#### User management:
1. Authentication:
   <ol type="a" start="a">
      <li >
          Users should be able to register with the following information:
         <ul>
            <li>Email address</li>
            <li>Password</li>
            <li>Name</li>
            <li>Surname</li>
            <li>Cell number</li>
         </ul>
      </li>
      <li>
         Users should be able to login with their credentials
      </li>
      <li>
         User login credentials should be encrypted on sign up, and decrypted when logging in
      </li>
   </ol>
2. Authorisation: make use of protected routing to only give access to pages users should access (eg logged in users shouldn’t see the registration and login pages)
3. Profile management: Users should be able to do the following;
   <ul>
      <li>View their profile</li>
      <li>Update their profile</li>
      <li>Update their login credentials</li>
   </ul>

#### Shopping List management:
1. Add Function:
   <ol type="a" start="a">
      <li>
         Users can add a new shopping list  with the following details:
         <ul>
            <li>Name</li>
            <li>Quantity</li>
            <li>Optional notes</li>
            <li>Category</li>
            <li>Item images</li>
         </ul>
      </li>
      <li>Users can add multiple shopping lists</li>
   </ol>
2. Read Function:
   <ol>
      <li>Users can view all existing shopping lists they added</li>
   </ol>
3. Update Function:
   <ol>
      <li>Users can edit existing shopping lists.</li>
   </ol>
4. Delete Function:
   <ol>
      <li>Users can delete existing shopping lists and shopping list items.</li>
   </ol>
5. Search Function:
   <ol>
      <li>Users can search for items  by name.</li>
      <li>The search keyword is shown on the URL.</li>
      <li>When users interact with the URL search the page is updated.</li>     
   </ol>
6. Sorting Function:
   <ol>
      <li>Users can sort the items according to:
         <ul>
            <li>Name</li>
            <li>Category</li>
            <li>Date added</li>
         </ul>
      </li>
      <li>The sorting is also visible on the URL eg https://www.takealot.com/gaming/gaming-desks-33363?sort=Price%20Descending.</li>
      <li>When users update the URL with a valid sort keyword the page is updated.</li>     
   </ol>
7. Item Categories or Tags:
   <ol>
      <li>Use categories to classify items for better organisation.</li>
   </ol>
8. Make use of Create, Read, Update and Delete operations for the shopping lists
9. Accessibility:
   <ol>
      <li>Users can share their shopping lists with others.</li>
   </ol>


#### Data management
1. Persistence:
   - Use a JSON server to store all the data
2. State management:
   - Make use of Redux to manage the state of your application
3. Performance:
   - Optimise the app for fast loading and smooth performance.
4. Privacy & Security:
   - Protect user data and privacy in accordance with relevant laws and regulations.


#### Evaluation Criteria:
1. Trainee interaction with GitHub. Are frequent commits made for every feature and momentarily to keep working code remotely backed up
2. User-friendliness and visual appeal of the design
   - Is the design intuitive
   - Does the design have a proper and understandable layout
   - Does the app flow from one function to another in an understandable and easy to follow manner
   - Does the app show notifications for processes occurring in the background and after an operation
   - Does the design have colors that blend well together
   - Does the design maintain a consistent typography
3. Functionality
   - Users can register with the required inputs
   - Users can login
   - User credentials are encrypted for security
   - Users can add new shopping lists
   - Users can view existing lists
   - Users can update lists
   - Users can delete lists
   - Users can filter the lists according by:
      - Name
   - Users can sort the lists by:
      - Name
      - Category
      - Date added
   - When user sorts and filters the keywords are shown on the URL
   - When user updates the sort or filter keyword on the URL, the app listens and updates its view accordingly
4. Security
   - Are routes protected
      - Are non-logged in users able to the home page that a logged in user would see
      - Are logged in users able to access the register and login pages
   - Are user credentials encrypted
5. Page interactivity
   - The mouse cursor changes when hovering over clickable elements
   - Clickable elements change color when hovered over to indicate interactivity
   - It is easy to navigate through the application’s different pages
6. Utilisation of ReactTS features
   -  Did trainee create their own components
   -  Were the components reused where appropriate
   -  Was React state utilised properly
   -  Were props sent and handled properly
   -  Components are customised through props for similar design elements instead of creating new elements
7. Code quality and code organisation
   -  Variable names follow the standard and recommended naming approach, camelCasing
   -  Variable names are self-explanatory
   -  Logic is broken into smaller code blocks (functions) making it more readable
   -  Comments utilised where necessary
8. Responsiveness of the page
   -  Is the page responsive to different web view sizes at these common breakpoints:
        - 320px
        - 480px
        - 768px
        - 1024px

#### Documentation
   - Did trainee document their project in the GitHub Readme file with the relevant information required

#### Instructions:
1. Create a React project to address this problem or use case. You are expected to come up with your own design.
2. Make use of reusable components wherever applicable
3. Make it responsive to different screen sizes.
4. The main point of data storage will be  json-server, which will allow you to add, update and delete from it.
5. You are allowed to use libraries in this project as long as they do not get in the way of you addressing the requirements of the app. Eg Tailwind for CSS
6. You are to submit in the form of a github pull request. Sending code files or a repo with no PR will not count as a submission.

#### Deliverables
1. Design
2. Step by step planning
3. Pseudocode
4. UI implementation
5. Algorithm
6. Readme file
