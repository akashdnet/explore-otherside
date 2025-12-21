# Explore Otherside - Travel destination finder Application

Explore Otherside is a comprehensive travel companion application built with **Next.js 16**, designed to help users organize trips, find travel buddies, and manage their travel experiences seamlessly.

## 🚀 Features

### for Travelers
- **Explore Trips**: Browse a wide range of public trips created by other users.
- **Join Requests**: Request to join interesting trips and manage your participation status.
- **Trip Details**: View detailed itineraries, budgets, and travel types for each trip.
- **Profile Management**: Customize your user profile and view your travel history.
- **Dashboard**: A personalized dashboard to manage your own trips and join requests.
  - **Create & Edit Trips**: Easy-to-use forms for planning new adventures.
  - **Manage Participants**: Review and approve join requests from other travelers.

### for Administrators
- **User Management**: Manage user roles and status (active/blocked).
- **Trip Oversight**: access to view and manage all trips on the platform.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Built with [Radix UI](https://www.radix-ui.com/) (likely via shadcn/ui)
- **Icons**: [Lucide React](https://lucide.dev/) & React Icons
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: Server Actions & React Hooks

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/akashdnet/explore-otherside.git
    cd explore-otherside
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root directory and add the necessary environment variables:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1 # Or your backend API URL
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `app/`: Main application source code (App Router structure).
    - `(public)/`: Publicly accessible routes (Home, Explore Trips, Trip Details).
    - `(protected)/`: Routes requiring authentication (Dashboard, Profile).
- `actions/`: Server actions for data mutation and fetching (Trip, User, Admin).
- `components/`: Reusable UI components (buttons, modals, cards).
- `lib/`: Utility functions and configuration.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
