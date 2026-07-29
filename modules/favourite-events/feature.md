# Favourite Events (Domain 2)

## Refs

1. [DOMAINS.md - Favourite Events](../../documentation/DOMAINS.md#2-favourite-events)

## Dictionary

- **[event]** - An event entity created via the Event Creation domain, that a user can mark as favorite.
- **[favorite_event]** - An [event] the authenticated user has marked as a favorite.
- **[favorites_list]** - The sortable list of the user's [favorite_event] entries shown in this domain.

## Constraints

- [favorites_list] context: `<auth:required>`, `<role:authenticated_user>`
- [favorites_list] sort_fields: `<field:name>`, `<field:event_date_time>` <!-- auto: mirrors sort options defined in Event Search domain -->
- Remove action: `<confirmation:none>` <!-- immediate removal, no confirmation dialog -->

## DoD

An authenticated user can view their list of favorite events, sort it by name or event date/time, and remove or view full details of any entry.

### Favorites List Display

1. The system displays a [favorites_list] of all [event] entities the authenticated user has marked as favorite.
   1a. Each item shows enough event summary information to identify the event (name, date/time) <!-- auto -->
2. The [favorites_list] is sortable by name and by event date/time.
   2a. The user can toggle sort direction (ascending/descending) <!-- auto -->
3. If the authenticated user has no [favorite_event] entries, the system shows an empty-state message instead of a list <!-- auto -->

### Item Actions

1. From the [favorites_list], the user can select a [favorite_event] to view its full details.
   1a. Selecting a [favorite_event] navigates to its event details view <!-- auto -->
2. From the [favorites_list], the user can remove a [favorite_event].
   2a. Removal is immediate and requires no confirmation dialog
   2b. Removing a [favorite_event] deletes only the favorite marker, not the underlying [event] <!-- auto -->

## Out of Scope

- Marking an [event] as favorite (handled by Event Search domain's search results actions)
- Behavior for [favorite_event] entries whose underlying [event] was deleted or has passed - deferred, not yet defined
