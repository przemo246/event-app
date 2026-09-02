# User Profile (Domain 1)

## Refs

1. [DOMAINS.md - User Profile](../../documentation/DOMAINS.md#1-user-profile)

## Dictionary

- **[account]** - The authenticated user's profile data: username, email, and password.
- **[account_settings]** - The section where the user manages their [account] data and can delete their account.
- **[created_event]** - An [event] entity created by the authenticated user via the Event Creation domain.
- **[created_events_list]** - The sortable list of the user's [created_event] entries shown in this domain.

## Constraints

- [account_settings] context: `<auth:required>`, `<role:authenticated_user>`
- [created_events_list] context: `<auth:required>`, `<role:authenticated_user>`
- [created_events_list] sort_fields: `<field:name>`, `<field:event_date_time>` <!-- auto: mirrors sort options defined in Favorite Events/Event Search domains -->
- Password change: `<verification:current_password_required>` <!-- auto: standard security practice for changing a password -->
- Account deletion action: `<confirmation:required>` <!-- auto: destructive, irreversible action -->
- Created event deletion action: `<confirmation:required>` <!-- auto: destructive action; differs from Favorite Events removal which needs none -->

## DoD

An authenticated user can view their account settings (username, email, password, deletion), update their username, change their password, and manage their list of created events by sorting, viewing, editing, or deleting entries.

### Account Settings

1. The system displays the authenticated user's current [account] information: username and email. <!-- auto -->
2. The user can update their username.
3. The email is displayed for reference only and cannot be edited.
4. The user can change their password.
   4a. Changing the password requires confirming the current password <!-- auto -->
5. The user can delete their account.
   5a. Deletion requires explicit confirmation before proceeding <!-- auto -->
   5b. Deletion is permanent <!-- auto -->

### Created Events Management

1. The system displays a [created_events_list] of all [event] entities created by the authenticated user.
   1a. Each item shows enough event summary information to identify the event (name, date/time) <!-- auto -->
2. The [created_events_list] is sortable by name and by event date/time.
   2a. The user can toggle sort direction (ascending/descending) <!-- auto -->
3. If the authenticated user has no [created_event] entries, the system shows an empty-state message instead of a list <!-- auto -->

### Item Actions

1. From the [created_events_list], the user can select a [created_event] to view its full details.
   1a. Selecting a [created_event] navigates to its event details view <!-- auto -->
2. From the [created_events_list], the user can edit a [created_event].
   2a. Editing navigates to a form pre-filled with the [created_event]'s current data <!-- auto -->
3. From the [created_events_list], the user can delete a [created_event].
   3a. Deletion requires explicit confirmation before proceeding <!-- auto -->
   3b. Deletion removes the [event] entirely, not just a reference to it <!-- auto -->

## Out of Scope

- Creating a new event (handled by Event Creation domain)
- Favorite events management (handled by Favorite Events domain)
- Login, logout, session management, OAuth, and password reset via email (handled by Authentication domain)
- Event details view content (handled by Event Details domain) <!-- auto -->
