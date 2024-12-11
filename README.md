# Facilitating Participatory Policy Design through Human-AI Collaboration

This repository contains the frontend service for the Human-AI Collaborative Policy Design system. The frontend is a React-based web application that enables users to participate in designing and refining community policies through a collaborative and AI-supported interface.

## Directory Structure

```
├── README.md               # Documentation for the project
├── package-lock.json       # Lock file for npm dependencies
├── package.json            # Project metadata and dependency definitions
├── public/                 # Publicly accessible files
│   ├── favicon.ico         # Favicon for the application
│   ├── index.html          # Main HTML file for the React app
│   ├── logo192.png         # Application logo (192x192)
│   ├── logo512.png         # Application logo (512x512)
│   ├── manifest.json       # Configuration for PWA support
│   └── robots.txt          # Instructions for web crawlers
└── src/                    # Source code for the application
    ├── App.css             # Styles for the main application component
    ├── App.js              # Root React component
    ├── App.test.js         # Unit tests for the App component
    ├── components/         # Reusable React components
    │   ├── Discussion.js   # Handles discussion about policy proposals
    │   ├── Feed.js         # Displays community posts and updates
    │   ├── Header.js       # Application navigation bar
    │   ├── Policy.js       # Manages policies and integrates AI insights
    │   ├── Post.js         # Displays and creates posts
    │   ├── Proposal.js     # Drafts and tracks policy proposals
    │   ├── Sidebar.js      # Navigation and auxiliary content
    │   ├── User.js         # User profile and contribution tracking
    ├── index.css           # Global styles
    ├── index.js            # Application entry point
    ├── logo.svg            # Scalable vector graphic logo
    ├── reportWebVitals.js  # Performance reporting utilities
    └── setupTests.js       # Configuration for testing
```

## Tech Stack

- **Frontend Framework**: React.js
- **Styling**: CSS

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/chengzr01/Social-Spaces.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Social-Spaces
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

Build the application for production:
```bash
npm run build
```

The production-ready files will be in the `build/` directory.
