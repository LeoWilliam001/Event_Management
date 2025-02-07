# Event Management Application  

An **Event Management Application** built with [Next.js](https://nextjs.org), [React](https://reactjs.org), and [Tailwind CSS](https://tailwindcss.com). Users can create, view, apply for, and manage events with authentication-based access control.  

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
   git clone https://github.com/your-username/event-management.git
   cd event-management
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

## 📡 Deployment  

Deploy on **[Vercel](https://vercel.com)**:  

1. Push the code to GitHub.  
2. Go to [Vercel](https://vercel.com), create a project, and connect your repository.  
3. Add environment variables in Vercel settings.  
4. Deploy with one click.  

## 📌 API Endpoints  

### 🔹 Apply for an Event  
**Endpoint:** `POST /api/events/apply`  

**Request Body:**  
```json
{
    "eventId": "event_id",
    "userId": "user_id"
}
```  

**Response:**  
```json
{
    "message": "Application successful"
}
```  

## 🔧 Usage  

### 🔑 Authentication  

- Uses **JWT tokens** stored in local storage.  
- Protected routes ensure only logged-in users can access event management features.  

### 📅 Event Management  

- Users can **create**, **view**, and **apply** for events.  
- The **event list** is dynamically fetched from the database.  

## 📚 Learn More  

- **[Next.js Docs](https://nextjs.org/docs)** – Learn about Next.js features.  
- **[React Docs](https://reactjs.org/docs/getting-started.html)** – Learn React fundamentals.  
- **[Tailwind CSS Docs](https://tailwindcss.com/docs/installation)** – Style efficiently with Tailwind.  

## 🚀 Ready to Deploy?  

Check out [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying) for detailed deployment instructions.  
