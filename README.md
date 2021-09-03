# Taste Test App

**Table of Contents**
- [Purpose](#purpose)
- [Description](#description)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Challenges](#challenges)
- [Possible Improvements](#possible-improvements)

## Purpose
The primary purpose of developing this small app was to learn the basics of Svelte. 

## Description
This application can be used to streamline taste tests, specifically being used for taste tests hosted by my family. Taste tests being an organized anonymous sampling of different varieties of a type of food or drink, ie. brands of Cola, types of cheese, and subsequently ranking these individually then averaging these rankings to find which sampling is the most preferred. The app provides a clean interface to input participants and the samples that will be tested. The user can then use drag and drop to input each participants individual rankings of the samples and then performs some simple calculations based on these rankings. It displays the samples sorted by overall ranking and which sample was most hated and most loved, defined as the sample with the most last places and most first places.

## Tech Stack
- [Svelte](https://svelte.dev/docs)
- [SASS](https://sass-lang.com/documentation)

## Getting Started
[Visit the hosted app](https://taste-test.vercel.app/)

To run locally, clone the repository locally and navigate into the folder then install dependencies by running `npm install` then run the app by calling `npm start` or `npm run dev` depending on if you wish to develop on the application.

## Challenges
The most prevalent and obvious challenge in creating this app was learning Svelte. However, the use case is not very complex and the docuementation provided sufficient explanation and examples to complete the project. I was very impressed with the built in features and lack of boilerplate in Svelte and plan to use it for more projects in the future. A specific feature that took time to understand and complete was the page transitions using Svelte's built in transitions. I solved this by creating a component called PageWrapper which wrapped each page and handled the timing of the unmount and fade of the previous page while the next page waits to fade in.

## Possible Improvements

### Option to Restart
I realized I did not include any way to navigate from the results page back to the home page

### Better Guidelines for New Users
Since this was a small side project focused on exploring Svelte rather than building a well thought out app I feel as though the user experience is catered heavily to my family and their pre-existing knowledge of how we run taste tests. The app could include a better preface page that describes the premise of tests more thoroughly and how to conduct them as well as more thought could go into tips along the way.

### Use Websockets
I had debated using Socket.IO or something similar to allow all participants to input their own rankings and see the results on their individual mobile devices. I have not used this technology before so it provided a good oppurtunity for further learning. However, I decided not to, partially to avoid the added time but also as taste tests are a communal activity and the added functionality of each individual using their own mobile device inevitably lowers the amount of face to face interaction.

### Add Images
Could add background images, as well as debated looking into any APIs that could try to categorize the inputted type of samples and display relevant images
