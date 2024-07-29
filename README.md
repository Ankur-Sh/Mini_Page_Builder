**Running the Application**

Prerequisites
Node.js (version 14 or higher)
npm (Node Package Manager)

Steps to Run the Application

Clone the Repository:
**git clone https://github.com/Ankur-Sh/Mini_Page_Builder.git**

Navigate to the Project Directory:
**cd your-project-directory**

Install Dependencies:
**npm install**

Start the Development Server:
**npm start**

This will start the development server and open the application in your default web browser. By default, it runs at http://localhost:3000.


**Documentation for the React Application**

Overview

This React application allows users to create, configure, and manage UI components on a canvas. The components can be draggable, and their configurations (e.g., font size, font weight, position) can be edited via a sidebar or a modal.

Components

App: The main application component that integrates Sidebar, Page, and Modal.
Sidebar: Contains draggable items for adding new components to the canvas and provides controls for configuring selected components.
Page: Displays and allows interaction with the components. Handles drag-and-drop functionality for components.
Modal: A dialog box for configuring the currently selected component.

**File Structure**
src/
│
├── Components/
│   ├── Sidebar.js
│   ├── Page.js
│   └── Modal.js
│
├── App.js
├── index.js
└── index.css

Components Details

App Component (App.js)

The App component manages the state of the components and controls the display of the Sidebar, Page, and Modal.

State Variables:

components: Stores the list of components to be displayed.
selectedComponent: Stores the currently selected component for configuration.
isModalOpen: Controls the visibility of the Modal.

Handlers:

handleSave: Updates a component in the list and closes the modal.
handleDelete: Removes a component from the list and closes the modal.
handleClose: Closes the modal and deselects the component.
handleComponentSelect: Sets the selected component.
handleComponentDeselect: Deselects the component.
openModal: Opens the modal for editing a component.
exportConfiguration: Exports the current components configuration as a JSON file.

Sidebar Component (Sidebar.js)

The Sidebar provides tools for adding new components and configuring the currently selected component.

State Variables:

config: Stores the configuration settings for the selected component.

Handlers:

handleChange: Updates configuration settings.
handleSave: Saves changes to the selected component.
handleDelete: Deletes the selected component.
handleDragStart: Initiates a drag operation for adding new components.

Page Component (Page.js)

The Page component displays the components and handles drag-and-drop functionality for moving components around the canvas.

State Variables:

draggingComponent: Keeps track of the component being dragged.

Handlers:

handleDrop: Adds or moves a component based on drag operation.
handleDragOver: Prevents default drag behavior.
handleComponentClick: Selects a component when clicked.
handleComponentDeselect: Deselects the component when clicking on the page.
handleKeyDown: Deletes a component when the "Delete" key is pressed.

Modal Component (Modal.js)

The Modal provides a dialog for editing the configuration of a selected component.

State Variables:

config: Stores the configuration settings for the component being edited.

Handlers:

handleChange: Updates configuration settings.
handleSave: Saves changes and closes the modal.
handleDelete: Deletes the component and closes the modal.
