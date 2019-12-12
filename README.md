# JobHunt - React Native Mobile JobPosting App
---
## Table of Contents

- [Prerequiste](#prerequiste)
- [Configuration](#configuration)
- [Installation](#installation)
  - [Clone](#clone)
  - [Google Map](#google-map-api)
  - [Build](#build-debug)
- [Screenshots](#screenshots)
---

## Prerequiste
- React Native - Install [React Navite CLI](https://facebook.github.io/react-native/docs/getting-started) - React Native is an open-source mobile application framework created by Facebook.
- Firebase - Create account in [firebase](http://firebase.google.com/) - Firebase is a mobile and web application development platform developed by Firebase, Inc.
---

## Configuration

<ol>
  <li>Basic Configuration</li>
  <li>Structured</li>
  <li>Redux Implementation</li>
</ol>

---

## Installation

### Clone
```bash
$ git clone https://github.com/argo46/Halo-chat---react-native
$ cd Halo-chat---react-native
$ yarn install
```
---
### Setting up Firebase Project
- Set up firebase project with react-native-firebase library to your app by following this [instructuion](https://invertase.io/oss/react-native-firebase/quick-start/existing-project)
---

### Google MAP API
- Create your gmap API key by following this [instruction](https://developers.google.com/maps/documentation/embed/get-api-key)
- Go to /android/src/main and edit the AndroidManifest.xml
```xml
<application
  ...
  <meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_API_KEY"/>
</application>
```
---
### Build debug
```bash
$ react-native run-android
```
---

## Screenshots
<img src="https://raw.githubusercontent.com/argo46/Halo-chat---react-native/master/screenshots/LoginHaloChat.png" width="200">    <img src="https://raw.githubusercontent.com/argo46/Halo-chat---react-native/master/screenshots/ChatHistory%20HaloChat.png" width="200">    <img src="https://raw.githubusercontent.com/argo46/Halo-chat---react-native/master/screenshots/Chat%20room%20HaloChat.png" width="200">  <img src="https://raw.githubusercontent.com/argo46/Halo-chat---react-native/master/screenshots/HaloChat%20Profile.png" width="200">

<img src="https://raw.githubusercontent.com/argo46/Halo-chat---react-native/master/screenshots/Contacts%20HaloChat.png" width="200">    <img src="https://raw.githubusercontent.com/argo46/Halo-chat---react-native/master/screenshots/Map%20HaloChat.png" width="200">

---
