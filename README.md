# SurfCircle 

### <a href="https://surfcircle.onrender.com/"> DEMO </a>

SurfCircle is a dynamic single-page application designed to track surf sessions and verify the accuracy of surf reports. This project was built using the MERN stack (MongoDB, Express, React, Node.js) and includes user authentication, state management with Redux, and a sleek, responsive UI.
 
## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Lessons Learned](#lessons-learned)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Description

SurfCircle allows users to create posts, comment, like, and search for posts within the community. The application features a comprehensive dashboard for keeping track of surf stats. Users can log their surf sessions, rate the surf conditions, and compare their experiences with reports from others. The aim is to provide an interactive platform for surfers to share their experiences and improve the accuracy of surf reports.

## Features

- User Authentication: Secure login and registration.
- CRUD Operations: Create, read, update, and delete posts.
- Comments and Likes: Engage with the community by commenting on and liking posts.
- Search Functionality: Easily find posts based on keywords.
- Responsive Design: Fully functional on both desktop and mobile devices.
- Dashboard: Track your surf stats and session history.

## Technologies Used

- **Frontend:**
  - React
  - Redux
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

- **Other Tools:**
  - Firebase (for authentication)
  - Git (version control)
  - Render (deployment)

## Lessons Learned

During the development of SurfCircle, I gained valuable experience and knowledge in several key areas:

1. **MERN Stack Development:** Strengthened my understanding of the full-stack development process using MongoDB, Express, React, and Node.js.
2. **User Authentication:** Implemented secure authentication mechanisms using Firebase, enhancing the overall security of the application.
3. **State Management:** Gained proficiency in managing application state with Redux, ensuring smooth and predictable state transitions.
4. **Responsive Design:** Applied responsive design principles to create a seamless user experience across various devices.
5. **Backend Integration:** Developed robust backend APIs and integrated them with the frontend, facilitating smooth data flow and interaction.

## Setup and Installation

To set up the project locally, follow these steps:

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/byronmccormick/surfcircle.git
    cd surfcircle
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    cd client
    npm install
    cd ..
    ```

3. **Set Up Environment Variables:**

    Create a `.env` file in the root directory and add your environment variables:

    ```bash
    MONGODB_URI=your_mongodb_connection_string
    ```

4. **Run the Application:**

    ```bash
    npm run dev
    cd client
    npm run dev
    ```

    This will start both the server and the client.

## Usage

Once the application is running, you can access it at `http://localhost:3000`. Register a new account or log in with an existing one to start tracking your surf sessions and interacting with the community.

## Contributing

Contributions are welcome! If you'd like to contribute to SurfCircle, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or would like to see a demo, please contact me at:

- **Email:** byronjamesmccormick@gmail.com
- **Phone:** +64204937811
