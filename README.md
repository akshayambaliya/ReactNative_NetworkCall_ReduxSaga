# ReactNative_NetworkCall_ReduxSaga

This is centralized architecture using redux, How we can efficient way to structure React Native large scale projects to manage netowrk call and error handling.

For the purpose of this post, I will use the following patterns and packages:

**react-navigation :** Application navigation

**redux :** — Application state management

**redux-saga :** — Enabling asynchronous dispatching of actions

**axios :** — Http Client


Our first step will be to define the directory structure within `src` (Source). This directory will contain all major project files.


**assets/images :** All static images put in this folder and also expoort from images.js file.

**components :** Shared components used across features are placed in this directory.

**constants/string :** This file contains static values used within the projects.

**constants/theme :** If you have global styles defined in your project you can put it over here like colors, font styles like things.

**domain :** Moduler repositories for network call.

**navigation :** You project base navigation goes here. You can create stack navigator and export it to your application.

**network :** This folder contains logic related to external API communications.

**redux :** This holds all the redux files if you are using react-redux for managing state. Inside redux folder you have actions, reducers, store which can easily manage your redux files.

**screens :**  All the Ui file with styles.

**utils :** You can put utils files over here.
