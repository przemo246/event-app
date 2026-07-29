---
version: 1.0
updated: 17.07.2026
---

# Application Domains

This document defines the core domains in the Event App application.

---

## 1. User Profile

**Responsibility:** User profile data management and user information.

**Key Concepts:**

- Account settings: Name, email, password, account deletion
- Created events management - a sortable list of events created by the user, with options to delete, edit, or view details

**Role level:** Authenticated user

---

## 2. Favourite Events

**Responsibility:** Favorite events management.

**Key Concepts:**

- Favorite events list: a sortable list of events marked as favorites, with option to delete or view details

**Role level:** Authenticated user

---

## 3. Event Creation

**Responsibility:** Creating a new event.

**Key Concepts:**

- Event creation form: title, description, date and time from, date and time to, location, image, event category, link, tags (user typed or suggested)

Categories:

- Music & Entertainment
- Business & Professional
- Food & Drink
- Sports & Wellness
- Arts & Culture
- Community & Hobbies

**Role level:** Authenticated user

**Technical Requirements:**

- LLM for tags suggestions creation
- Nominatim/Photon for reverse geocoding

---

## 4. Authentication

**Responsibility:** User authentication, authorization, and session management.

**Key Concepts:**

- Google OAuth integration
- Facebook OAuth integration
- Email/password authentication
- Login/logout flows
- Session management
- Token handling and refresh
- Access control and authorization
- User identity verification
- Password reset flows

**Out of Scope:**

- User profile data (handled by User Profile domain)

---

## 5. Event Search

**Responsibility:** Searching for events using filters and sorting options.

**Key Concepts:**

- Quick search tags - a list of suggested tags (created manually) with pre-defined filters
- Search filters: name, location, date and time (from and to), category
- Sorting options: name, date and time
- Search results: list of events matching the search criteria, with options to view details or add to favorites

  **Technical Requirements:**

- Nominatim/Photon for reverse geocoding

**Role level:** All users

**Out of Scope:**

- Details view (handled by Event Details domain)
- Favorites management (handled by User Profile domain)

---
