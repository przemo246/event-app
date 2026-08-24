# Event Creation (Domain 3)

## Refs

1. [DOMAINS.md - Event Creation](../../documentation/DOMAINS.md#3-event-creation)

## Dictionary

- **[event]** - The entity produced by this domain: title, description, date and time range, location, image, category, link, and tags.
- **[event_creation_form]** - The form through which the authenticated user submits the fields required to create a new [event].
- **[event_category]** - One of six fixed categories an [event] is classified under.
- **[tag]** - A keyword associated with an [event], either typed by the user or chosen from suggestions.

## Constraints

- [event_creation_form] context: `<auth:required>`, `<role:authenticated_user>`
- [event_category] options: `<value:music_entertainment>`, `<value:business_professional>`, `<value:food_drink>`, `<value:sports_wellness>`, `<value:arts_culture>`, `<value:community_hobbies>`
- [event_category] selection: `<cardinality:single>` <!-- auto: domain text doesn't state multi-select, single category assumed -->
- [tag] input: `<cardinality:multiple>`, `<mode:typed_or_suggested>`
- Tag suggestions: `<source:llm_generated>`
- Location field: `<assist:reverse_geocoding>` <!-- via Nominatim/Photon -->
- Date/time range: `<field:date_time_from>`, `<field:date_time_to>`, `<order:from_before_to>` <!-- auto: logical constraint for a valid range -->

## DoD

An authenticated user can fill out and submit an [event_creation_form] with title, description, date/time range, location, image, category, link, and tags, assisted by LLM tag suggestions and reverse-geocoded location input, to create a new [event].

### Event Creation Form

1. The system displays an [event_creation_form] with fields: title, description, date and time from, date and time to, location, image, [event_category], link, and [tag]s. <!-- auto -->
2. The user selects exactly one [event_category] from the six predefined categories (Music & Entertainment, Business & Professional, Food & Drink, Sports & Wellness, Arts & Culture, Community & Hobbies).
3. Which fields are required versus optional is not yet defined <!-- auto: insufficient context -->

### Location Input

1. The user enters a location for the [event].
   1a. The system uses reverse geocoding (Nominatim/Photon) to assist resolving the entered location <!-- auto -->

### Tag Suggestions

1. The user can add [tag]s to the [event] by typing free text.
2. The system offers LLM-generated [tag] suggestions the user can select.
   2a. Selecting a suggested [tag] adds it to the [event]'s tag list <!-- auto -->
   2b. Suggested [tag]s and typed [tag]s can be combined on the same [event] <!-- auto -->

### Submission

1. The user submits the [event_creation_form] to create the [event].
   1a. On successful submission, a new [event] is created and associated with the authenticated user as its creator <!-- auto -->
2. Field-level validation rules (e.g. required fields, date range validity) are not yet defined beyond the [date_time_from]/[date_time_to] ordering constraint <!-- auto: insufficient context -->

## Out of Scope

- Listing, sorting, editing, or deleting already-created events (handled by User Profile domain)
- Marking an [event] as favorite (handled by Favourite Events domain)
- Searching, filtering, and sorting events, and reverse geocoding for search location filters (handled by Event Search domain)
- Event details view content (handled by Event Details domain) <!-- auto -->
- Login, logout, and session management (handled by Authentication domain)
- Whether the [event_creation_form] is reused (pre-filled) for editing an existing [created_event] - not yet defined <!-- auto: insufficient context -->
