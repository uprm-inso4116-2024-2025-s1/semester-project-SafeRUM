# Semester-Project-Saferum
# - NOT FINAL!

# SafeRUM - Campus Safety Notification System

# Project Overview

SafeRUM is a mobile app designed to enhance emergency communication and campus safety at the University of Puerto Rico, Mayagüez Campus (UPRM). The current method of disseminating safety alerts via email can result in delays and unreliable notifications. SafeRUM addresses these issues by offering a centralized platform for delivering timely, location-specific safety information and resources to the campus community.

The project is structured as follows:
- **Managers:** Evand Sánchez and Yanishka Ruiz
- **Documentation Leader:** Lex Feliciano
- **Teams Dedicated to Features:**
  - Sign In/Log In Team
  - Admin Interface Team
  - Location Management Team
  - Trust System Team

# Key Features

    Real-time Emergency Alerts: SafeRUM delivers push notifications, SMS, and in-app alerts to users based on their location, ensuring they receive urgent safety information during emergencies.

    Safety Resources: The app provides users with access to important safety details, such as potential hazards, emergency procedures, and evacuation routes.

    Reporting Capabilities: SafeRUM allows users to quickly report safety concerns, suspicious activities, or emergency incidents directly to campus security.

    Security Integration: The app facilitates direct communication with campus security, enabling users to call for assistance or send alerts that require an immediate response.

Team Responsibilities and Features

1. User Interface Team: Sign In/Log In

This team focuses on creating a seamless and secure user experience for accessing the SafeRUM app.

	Sign In/Log In Functionalities:
	•	Successful Login: Ensure users can log in using their UPRM email.
	•	Authentication & Session Management: Securely handle user sessions and manage authentication tokens.
	•	Error Handling: Display appropriate messages for incorrect passwords, and manage account lockout after multiple failed attempts.
	•	Account Creation: Validate user emails to ensure only UPRM students can create accounts.
	•	Profile Management: Allow users to view and edit their profile information.

2. Admin Interface Team: UPRM Guards Communication

This team develops the admin (campus security) interface, which includes all user functionalities but with enhanced capabilities for managing security.

	Admin Dashboard:
	•	Report Management: Admins can access, review, and respond to user-submitted reports.
	•	Alert Reception: Admins receive specific alerts such as SOS, Panic Alerts, and Immediate Help requests.
	•	Profile Management: Similar to the user interface but tailored for campus security personnel.
	•	Authentication & Session Management: Handle admin authentication with additional security layers.

3. Location Management Team

This team handles all aspects related to location tracking, reporting, and boundary management within the SafeRUM app.

	Location Reporting:
	•	Coordinate Tracking: Automatically attach the user’s location to reports.
	•	Boundary and Coordinate Handling: Convert raw coordinates into recognizable place names (e.g., “Stefani Building” instead of latitude/longitude).
	•	Map Integration: Integrate with mapping services (like Google Maps) to enable location selection and display.

4. Trust System Team

This team focuses on managing the credibility of reports through a trust system that tracks and evaluates user activity.

	Rumor and Report Management:
	•	Rumor Handling: Allow users to report unconfirmed alerts, which are then reviewed by admins.
	•	Trust Level Calculation: Implement an algorithm to track and calculate user trust levels based on report accuracy and reliability.
	•	User Interface: Create an interface with buttons for reporting specific issues (e.g., suspicious person, safety issue) and for sending immediate alerts (SOS, Panic Alert).

Report System Template

The report system is a critical component of SafeRUM, enabling users to quickly and accurately report incidents.

	•	Title: A short, descriptive title for the report.
	•	Description: A detailed description of the incident.
	•	Location: Users can specify the location via an interactive map or by entering an address.
	•	Submit Button: Allows users to submit the report, with confirmation provided upon successful submission.

Summary

SafeRUM is a comprehensive solution designed to improve the safety and security of the UPRM campus community. By enabling real-time communication, providing valuable resources, and facilitating direct reporting, the app ensures that students, faculty, and security personnel are better prepared to handle emergencies.

