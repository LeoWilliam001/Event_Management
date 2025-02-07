# Event Management Application  

An **Event Management Application** built with [Next.js](https://nextjs.org), [React](https://reactjs.org), [Tailwind CSS](https://tailwindcss.com), and [MongoDB](https://www.mongodb.com). Users can create, view, apply for, delete and manage events with authentication-based access control.


## 🚀 Features  

- **User Authentication**: Secure login and signup using JWT authentication.  
- **Event Creation**: Authenticated users can create and manage events.  
- **Event Application**: Users can apply for events directly from the interface.  
- **Event Deletion**: Event creators can delete their own events.  
- **Responsive UI**: Fully optimized for all screen sizes.  
- **Protected Routes**: Ensures secure access to event-related functionalities.  

## 🛠️ Getting Started  

### ✅ Prerequisites  

- **Node.js** (v14 or higher)  
- **npm** or **yarn**  

### 📌 Installation  

1. Clone the repository:  
   ```bash
   git clone https://github.com/LeoWilliam001/Event_Management.git
   ```  

2. Install dependencies:  
   ```bash
   npm install
   # or
   yarn install
   ```  

3. Set up environment variables in `.env.local`:  
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```  

4. Start the development server:  
   ```bash
   npm run dev
   # or
   yarn dev
   ```  

5. Open **[http://localhost:3000](http://localhost:3000)** in your browser.

6. As an alternative the application is hosted on vercel **[https://event-manager-six-nu.vercel.app/](https://event-manager-six-nu.vercel.app/)**. So you can click on it and use it.

7. First click on Signup and then login to your registered email and password and access the event management platform. You can also logout to end the session. 
  

## 📌 API Endpoints  

### 🔹 Apply for an Event  
**Endpoint:** `POST /api/events/apply`  

**Request Body:**  
```json
{
    "eventId": "event_id",
    "userId": "user_id",
    "userName": "user_name",
    "userEmail": "user_email",
    "userPhone": "user_phone",
    "userComment": "user_comment"
}
```

**Response:**  
```json
{
    "message": "Application successful",
    "application": {
        "eventId": "event_id",
        "userId": "user_id",
        "userName": "user_name",
        "userEmail": "user_email",
        "userPhone": "user_phone",
        "userComment": "user_comment",
        "_id": "application_id",
        "__v": 0
    }
}
```  

## 🔧 Usage  

### 🔑 Authentication  

- Uses **JWT tokens** stored in local storage.  
- Protected routes ensure only logged-in users can access event management features.  

### 📅 Event Management  

- Users can **create**, **view**, and **apply** for events.  
- The **event list** is dynamically fetched from the database.
- The guest users will only be able to **view** the events and not apply.
- The **attendees count** will be updated in real time.
- The user who creates an event will not be able to apply for it since he is the host.
- The host will have the ability to **delete** that event.
