# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Ticket 1: Add ability for facilities to save custom ids for each agent

    Acceptance Criteria:
      - Facilities should be able to input custom ids for each agent they work with on the platform
      - The custom id should be saved and associated with the corresponding agent in the database
      - Custom ids should be using and return appropriate error message to the customer if an exiting custome id is already in use.
    Time/Effort Estimate: 2 hours
    Implementation Details:
      - Modify the agents table in the database to include a custom_id field of type string
      - Add a form or input field on the facility's dashboard page to allow them to input the custom id for each agent. The form should have an input field for the custom id, and a submit button to save the changes.
      - When the form is submitted, send an AJAX request to the server to update the corresponding agent record in the database with the new custom id.
      - On the backend, create a route that handles the AJAX request and updates the agent record in the database.
      - It may be necessary to add input validation to ensure that the custom id is unique for each agent within a given facility. This can be done by checking if the custom id already exists in the database for the given facility. If it does, - return an error message to the client indicating that the custom id is already in use.

Ticket 2: Use custom ids on reports

    Acceptance Criteria:
      - When generating reports for a facility, the custom id for each agent should be used instead of the internal database id
      - The report should include a mapping between the custom id and the internal database id for each agent
    Time/Effort Estimate: 1 hour
    Implementation Details:
      - Modify the generateReport function to use the custom id of each agent when building the report data. If a custom id has not been set for an agent, fall back to using the internal database id.
      - Include a section in the report that lists the custom id and internal database id for each agent. This can be done by adding a new table to the report template, or by including the mapping in the existing data for each agent.

Ticket 3: Update documentation and internal documentation

    Acceptance Criteria:
      - The documentation for the platform should be updated to reflect the new feature of allowing facilities to set custom ids for agents
      - Any relevant internal documentation (e.g. code comments, project README) should also be updated
    Time/Effort Estimate: 1 hour
    Implementation Details:
      - Update the user documentation to explain the new feature and how it can be used by facilities. This may include adding a new section to the documentation explaining the feature and how to use it, as well as updating any relevant instructions or examples.
      - Update any internal documentation to reflect the changes made in Tickets 1 and 2. This may include updating code comments or the project README to explain the new feature and how it works.
