# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here -----------------------------------------------------------

## TICKET #1

### Ticket name:

Add a new column in the Agent table to enhance the shift assignment process

### Summary

The Facilities need to use a new custom id to identify better which Agent they worked with. So, we will add a new field in the Agent table.

### Acceptance criteria

#### AC1: add column `custom_id` in `Agents` table

- example:

```js
alter table table_name add column new_column_name data_type NULL;
```

- [reference](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-add-column/)

#### AC2: the `custom_id` field has to allow null values

- details implementation

- example:

```js
alter table table_name add index new_column_name;
```

#### AC3: add an index for the new `custom_id` field

- details implementation
- example:

```js
alter table table_name add index new_column_name;
```

_stake holders / reporter to:_ PM (pm@clipboard.com) or technical lead (tl@clipboard.com)
_priority:_ medium
_story points (size):_ 5

## TICKET #2

### Ticket name:

Generate and include the `custom_id` for Agents when the application is going to assign Agents in Shifst

### Summary

The Facilities need to use a new custom id to identify better which Agent they worked with. So, we will add the custom_id in the shift assignment process.

### Acceptance criteria

#### AC1: Add custom_id property in CreateAgent dto

```javascript
interface CreateAgent {
  ...,
  customId?: string;
}
```

#### AC2: Generate custom id before saving Agents

- create `getCusomtAgentId({ agent }): string` method. Keep in mind the agenda id, creation date, and manager to generate the custom value.

#### AC3: Add custom_id field in INSERT query

- modify the insert to add the generated custom_id

```js
INSERT ..., custom_id VALUES (..., ?)
```

_stake holders / reporter to:_ PM (pm@clipboard.com) or technical lead (tl@clipboard.com)
_priority:_ medium
_story points (size):_ 5

## TICKET #3

### Ticket name:

Include custom_id in Agent information for the Facilities report

### Summary

The Facilities need to see the new information about Agents in their reports.

### Acceptance criteria

#### AC1: Update query in `getShiftsByFacility` method

```js
SELECT ..., a.custom_id FROM shifts s LEFT JOIN Agents a ON s.fk_agent_id = a.id
```
