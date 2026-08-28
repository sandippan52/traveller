# ✈️ Traveller

### A social travel platform for discovering trips, sharing experiences, and finding people to travel with.

🌐 **[Live Demo](https://traveller-iota-blue.vercel.app/)** · 💻 **[GitHub Repository](https://github.com/sandippan52/traveller)**

---

## ✨ About Traveller

**Traveller** is a social travel platform designed to help people discover travel plans, share their experiences, and find others interested in travelling to the same destination.

Users can share two types of posts:

* **Individual Posts** — Share travel experiences, photographs, or stories about places they've visited.
* **Group Posts** — Create a plan for an upcoming trip and invite other users to join.

The platform connects these posts with a simple group-formation workflow. When someone finds a Group Post they are interested in, they can request to join the trip. The post owner receives the request through notifications and can accept or reject it. Once accepted, the user becomes a member of the group and a group conversation is created for the members.

---

## 🚀 Features

### 📝 Travel Posts

Users can create posts to share their travel experiences or plans.

Each travel post can contain:

* **From** — Starting location of the journey
* **To** — Destination of the trip
* **Content** — Additional details about the trip or experience
* Media associated with the post

For example:

> From: Chandigarh
> To: Kolkata
> Content: "Hey, going to Kolkata next week. Who will join me?"

Posts can be liked and commented on.

---

### 🧳 Group Travel

Group Posts allow users to find people interested in travelling to the same destination.

The workflow is:

```text
Create Group Post
       ↓
Other users discover the post
       ↓
     Join Group
       ↓
Join request sent to post owner
       ↓
Owner receives notification
       ↓
Owner accepts request
       ↓
User becomes a group member
       ↓
Group conversation is created
```

This allows users to turn a travel plan into a group of people who can coordinate together.

---

### 🔎 Travel & User Search

Traveller includes an authenticated search system that allows users to discover:

* Other users by username
* Travel posts based on their content

The search currently uses basic regex-based matching.

This makes it possible to search for destinations or travel-related discussions — for example, finding posts about **Manali**, **Kasol**, or other destinations.

---

### 👥 Profiles & Following

Users can:

* View other people's profiles
* Follow users
* Edit their own profile
* Change their username
* Update their biography
* Update their profile picture

Users can also open another user's profile and send them a direct message.

---

### 💬 Conversations

Traveller provides messaging for users who want to communicate after connecting through the platform.

This includes:

* Direct messages between users
* Group conversations created for accepted travel groups

> **Note:** Messaging currently uses standard HTTP request/response communication and is **not real-time**.

---

### 🔔 Notifications

The notification system currently handles travel-group requests.

When a user clicks **Join Group** on another user's Group Post, the post owner receives a notification containing the join request.

The owner can then accept or reject the request.

---

## 🛠️ Tech Stack

| Category           | Technologies       |
| ------------------ | ------------------ |
| **Frontend**       | Next.js, React     |
| **Styling**        | Tailwind CSS       |
| **Language**       | JavaScript         |
| **Backend**        | Next.js API Routes |
| **Database**       | MongoDB            |
| **ODM**            | Mongoose           |
| **Authentication** | NextAuth.js, JWT   |
| **Media Storage**  | Cloudinary         |
| **Deployment**     | Vercel             |

---

## 🏗️ Application Flow

Traveller follows a social-platform architecture where authenticated users interact with travel content and backend APIs.

```text
                         ┌─────────────────────┐
                         │       User          │
                         │   Next.js / React   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Next.js Backend   │
                         │      API Routes     │
                         └─────────┬───────────┘
                                   │
                       ┌───────────┴───────────┐
                       │                       │
              ┌────────▼────────┐     ┌──────▼─────────┐
              │     MongoDB      │     │   Cloudinary   │
              │    + Mongoose    │     │ Media Storage  │
              └─────────────────┘     └────────────────┘
```

### Core Data Flow

```text
User
 ↓
Authentication
 ↓
Create / Discover Travel Posts
 ↓
Search & Social Interaction
 ↓
Join Group Request
 ↓
Notification
 ↓
Owner Approval
 ↓
Group Membership
 ↓
Group Conversation
```

---

## 🔐 Authentication

Traveller uses **NextAuth.js with JWT-based authentication**.

Authenticated users can access protected functionality such as:

* Creating posts
* Interacting with posts
* Following users
* Joining travel groups
* Viewing notifications
* Sending messages
* Editing their profile

---

## 🗄️ Database

Traveller uses **MongoDB** with **Mongoose** for data modeling and persistence.

The backend manages data related to:

* Users
* Profiles
* Travel posts
* Likes
* Comments
* Follows
* Group membership
* Join requests
* Conversations
* Messages
* Notifications

---

## 🖼️ Media

**Cloudinary** is used for storing uploaded media such as profile pictures and travel-related images.

---

## ⚙️ Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/sandippan52/traveller.git
cd traveller
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add the environment variables required by the application.

These include configuration for:

* MongoDB
* NextAuth.js
* JWT authentication
* Cloudinary

> **Security:** Never commit your `.env` file, database credentials, API keys, or authentication secrets to GitHub.

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 🧠 What I Learned

Building Traveller gave me practical experience with:

* Building a full-stack application with Next.js
* Designing MongoDB data models with Mongoose
* Implementing authentication using NextAuth.js and JWT
* Building authenticated backend APIs
* Designing social interactions such as likes, comments, and follows
* Implementing a request-and-approval workflow for group formation
* Connecting notifications with user actions
* Managing group membership and conversations
* Implementing search using regex-based matching
* Handling media uploads with Cloudinary
* Deploying a full-stack application using Vercel

---

## 🔮 Future Improvements

Some areas that could be explored in future versions include:

* Real-time messaging
* More advanced destination-based search
* Richer travel planning features
* Improved notification functionality
* Trip dates and itinerary management
* Travel recommendations
* More advanced group management
* Trip discovery and filtering

---

## 🌐 Try Traveller

Looking for people travelling to the same destination?

### 👉 **[Launch Traveller](https://traveller-iota-blue.vercel.app/)**

Create a trip, discover other travellers, and find your next travel companion. ✈️
