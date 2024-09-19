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

# How to run?
# Windows
1. Make sure to have node.js installed if not sure open a cmd and type "npm --version" to see if the command is recognized, if command is not recognized install latest version from node.js website
2. cd into safe-rum folder
3. run "npm install" on terminal
4. run "npx expo start" on terminal
# Macos
1. Make sure homebrew is installed on ur computer if u do not have it follow official instructions here https://brew.sh/
2. If u do not have npm installed run these commands 
3. run "brew install node@22"
		# verifies the right Node.js version is in the environment
4. run "node -v" # should print `v22.8.0`
		# verifies the right npm version is in the environment
5. run "npm -v"  # should print `10.8.2`'
6. cd into safe-rum folder
7. run "npm install"
8. run "npm start"
# Linux
1. if node js or npm is not installed run this commands
2. run "sudo apt update"
3. run "sudo apt install nodejs npm"
4. cd into safe-rum folder
5. run "npm install"
6. run "npm start"
# IOS
 1. To run the app in ios make sure to have Expo go app installed 
 2. Scan with the camera app the qr code that is generated when u run 
	"npm start" or "npm expo start"
 3. Click allow when the notification aboout connecting to local devices pop up
 4. Application should load
# Android

 1. To run the app in android  make sure to have Expo app installed 
 2. Scan with the expo app the qr code that is generated when u run 
	"npm start" or "npm expo start"
 3. Application should load

# How to Install Android Studio
- Windows
1. Download Android Studio.
2. Open Android Studio Setup. Under Select components to install, select Android Studio and Android Virtual Device. Then, click Next.
3. In the Android Studio Setup Wizard, under Install Type, select Standard and click Next.
4. The Android Studio Setup Wizard will ask you to verify the settings, such as the version of Android SDK, platform-tools, and so on. Click Next after you have verified.
5. In the next window, accept licenses for all available components.
6. After the tools installation is complete, configure the ANDROID_HOME environment variable. Go to Windows Control Panel > User Accounts > User Accounts (again) > Change my environment variables and click New to create a new ANDROID_HOME user variable. The value of this variable will point to the path to your Android SDK:
7. To verify that the new environment variable is loaded, open PowerShell, and copy and paste the following command:
"Get-ChildItem -Path Env:" The command will output all user environment variables. In this list, see if ANDROID_HOME has been added
8. To add platform-tools to the Path, go to Windows Control Panel > User Accounts > User Accounts (again) > Change my environment variables > Path > Edit > New and add the path to the platform-tools to the list.
9. Finally, make sure that you can run adb from the PowerShell. For example, run the adb --version to see which version of the adb your system is running.

Now once u have those steps completed u can go ahead and set up an android emulator with this steps ,also if you run into any issues during installation u can refer to this page https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated

- Android simulator Windows
1. On the Android Studio main screen, click More Actions, then Virtual Device Manager in the dropdown.
2. Click the Create device button.
3. Under Select Hardware, choose the type of hardware you'd like to emulate. We recommend testing against a variety of devices.
4. Select an OS version to load on the emulator (probably one of the system images in the Recommended tab), and download the image.
5. Change any other settings you'd like, and press Finish to create the emulator. You can now run this emulator anytime by pressing the Play button in the AVD Manager window.

-Macos
1. Download and install Android Studio.
2. Open the Android Studio app, click More Actions and select SDK Manager.
3. Open Android Studio, go to Settings > Languages & Frameworks > Android SDK. From the SDK Platforms tab, select the latest Android version (API level).
	Then, click on the SDK Tools tab and make sure you have at least one version of the Android SDK Build-Tools and Android Emulator installed.
4. Copy or remember the path listed in the box that says Android SDK Location.
5. Click Apply and OK to install the Android SDK and related build tools.
6. If you are on macOS or Linux, add an environment variable pointing to the Android SDK location in ~/.bash_profile (or ~/.zshrc if you use Zsh). For example: export ANDROID_HOME=/your/path/here.
Add the following lines to your /.zprofile or ~/.zshrc (if you are using bash, then ~/.bash_profile or ~/.bashrc) config file:
"export ANDROID_HOME=$HOME/Library/Android/sdk"
"export PATH=$PATH:$ANDROID_HOME/emulator"
"export PATH=$PATH:$ANDROID_HOME/platform-tools"
7. Reload the path environment variables in your current shell:
"source $HOME/.zshrc"
"source $HOME/.bashrc"
8. Finally, make sure that you can run adb from your terminal.

- Android Simulator Macos

1. On the Android Studio main screen, click More Actions, then Virtual Device Manager in the dropdown.
2. Click the Create device button.
3. Under Select Hardware, choose the type of hardware you'd like to emulate. We recommend testing against a variety of devices.
4. Select an OS version to load on the emulator (probably one of the system images in the Recommended tab), and download the image.
5. Change any other settings you'd like, and press Finish to create the emulator. You can now run this emulator anytime by pressing the Play button in the AVD Manager window.

# Set up an iOS Simulator with Expo Go
1. Install Xcode
Open up the Mac App Store, search for Xcode, and click Install (or Update if you have it already).
2. Install Xcode Command Line Tools
Open Xcode, choose Settings... from the Xcode menu (or press cmd ⌘ + ,). Go to the Locations and install the tools by selecting the most recent version in the Command Line Tools dropdown.
3. Install Watchman
Watchman is a tool for watching changes in the filesystem. Installing it will result in better performance. You can install it with:

"brew update"
"brew install watchman"

-How to Use
When you start a development server with npx expo start on the start developing page, press i to open the iOS Simulator. Expo CLI will install Expo Go automatically.


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

