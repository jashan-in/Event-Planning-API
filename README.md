## Event Planning API

This project is a backend API built with Node.js, Express, TypeScript, and Firebase Firestore.
It allows users to manage events, attendees, and tickets.
The project includes authentication, authorization, input validation, documentation, and automated background tasks.

## Overview

## The API supports Event creation and management, Registering attendees for specific events, Ticket purchasing and management, Role-based access control (admin, organizer, user), Request validation using Joi, Swagger documentation

### New Component integrated:
Cron job to detect events happening within the next 24 hours

## Features
### Events
Create, read, update, and delete events
Stores title, date, location, description, timestamps

### Attendees
Add attendee to a specific event
Get all attendees for an event
Remove attendee from an event
Ensures attendee always belongs to the event they access

### Tickets
Create tickets only if the attendee belongs to the event
Read, update, and delete tickets
Stores type, price, status, timestamps

### Authentication and Authorization

Authentication uses Firebase ID tokens.
Authorization uses role based permissions as follow
### Role	### Permissions
admin	        Full access
organizer	    Manage events, attendees, tickets 
user	        Can view events, buy tickets

## API Documentation

Swagger documentation is available at
http://localhost:3000/api-docs