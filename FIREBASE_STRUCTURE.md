# Firebase Data Structure Map

This guide explains how your data is organized in **Cloud Firestore**. 

> [!NOTE]
> **Authentication vs. Database**: When a user registers, they appear in the **Authentication** tab. However, their profile (name, role) is stored separately in the **Firestore Database** in the `users` collection.

## 1. `users` Collection
Stores profile information for both Students and Faculty.
- **Document ID**: Matches the Firebase Auth `uid`.
- **Fields**:
  - `name`: Full name of the user.
  - `email`: User's email address.
  - `role`: `'student'` or `'faculty'` or `'unassigned'`. **Check this to differentiate logins.**
  - `createdAt`: Timestamp of account creation.
  - *(Students only)*: `enrolledCourses`, `completedCourses`, `averageScore`, etc.
- **Subcollections**:
  - `notifications`: User-specific notifications.
  - `badges`: User-specific achievements.

## 2. `courses` Collection
Stores the course catalog.
- **Document ID**: Manual ID (e.g., `1`, `2`) or auto-generated.
- **Fields**:
  - `title`, `description`, `instructor`, `price`, `thumbnail`, etc.
- **Subcollection: `content`**:
  - Stores the actual lessons/videos for that specific course.
  - Fields: `title`, `duration`, `type` (video/note/exam), `videoUrl`.

## 3. `exams` Collection
Stores quizzes for courses.
- **Document ID**: Auto-generated.
- **Fields**:
  - `courseId`: Links the exam to a specific `course.id`.
  - `title`: Name of the exam.
  - `duration`: Time in minutes.
  - `passingScore`: Percentage needed to pass.
  - `questions`: Array of objects { `text`, `options`, `correctAnswer` }.

---

## 🛠️ Accessing Faculty vs. Student Login
You do not need two separate login pages. The app automatically detects the user's role:
1.  **AuthContext**: When a user logs in, the `AuthContext` checks the `users` collection for that user's `uid`.
2.  **Dashboard Routing**: 
    - If `role === 'faculty'`, the user is directed to `/faculty-dashboard`.
    - If `role === 'student'`, the user is directed to `/dashboard`.
    - If a user logs in with Google and has NO role, the **Role Picker** pops up and forces them to choose.

## ❓ Missing Data in Collections?
If you see the user in "Authentication" but NOT in "Firestore Collections":
1.  **Rule Check**: Your database rules must allow writes. Ensure you have published the rules from `firestore.rules`.
2.  **Initial Seeding**: The app needs some initial data to start. Go to the dashboard and click **"Seed Data"**. This manually pushes the first set of courses and student profiles to your Firestore.
3.  **Registration**: When a new user signs up via your `Register` page or uses the `Role Picker`, a new document is automatically created in the `users` collection.
