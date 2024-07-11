# FreshSip 🍹

I've developed a dynamic web application using the MERN stack (MongoDB, Express.js, React, Node.js) that offers a seamless and secure user experience. FreshSip is your go-to destination for all drinks and snacks, whether you're in the mood for a refreshing shake, a soothing tea, a robust coffee, or some tasty treats to go with it!

This is my first project using the MERN stack, and I'm thrilled with how it turned out! 😊

## ✨ Features:

- **User Registration**: Easy sign-up process.
- **User Login**: Secure login with the option to reset forgotten passwords.
- **Add to Cart**: Effortlessly add your favorite items.
- **Remove from Cart**: Remove items with a click.
- **Checkout**: Smooth and straightforward checkout process.
- **Order History**: View all your previous orders in one place.

## 🔒 Security:

All user data is securely stored in MongoDB, and passwords are encrypted to ensure utmost security.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repo:
    ```bash
    git clone https://github.com/yourusername/FreshSip.git
    ```

2. Install NPM packages:
    ```bash
    cd FreshSip
    npm install
    cd client
    npm install
    ```

3. Set up your environment variables:
    - Create a `.env` file in the root directory.
    - Add the following variables:
        ```plaintext
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        ```

### Running the Application

1. Start the backend server:
    ```bash
    npm run server
    ```

2. Start the frontend development server:
    ```bash
    cd client
    npm start
    ```

