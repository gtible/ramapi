# Rick & Morty's API project

## Installation
npm run install

npm run start 

nom run build 

npm run test (with cypress)

## Architecture
I've followed a classical architecture with folders by functionnalities: store, model, components, assets.

## Data Fetching
### REST API & javascript client
First, I used a REST API with axios to get the datas. Then, I noticed that the API had a javascript client and I tried it. But finally, I made the choice to use axios for all the requests. 

Axios is very useful and enables to get the datas easily.

### Vuex
I've followed the flux pattern. I made a lot of actions and mutations to manage the data flow.


## Typescript
I've used the api's typescript interfaces to check all the app's variables types.


## Design & UX
I've made the choice to reuse Rick & Morty's colors, hoping you'll enjoy it ;)
For the UX, I've caught all the errors and contextualized them. 
The app follows the basic responsive guidelines.

## Optimizations
I run the build from vue-cli to get js & css minifying files.

## Tests
### Jest
I wanted to use it but I had hard times to configure it. I had some problems with libs versions and compatibility. So I changed and tried to test Cypress.

### Cypress
Amazing test software. It was very fast to write some use cases and test them. I love this soft ;)



## Beyond this project
### PWA, offline, localstorage, indexDB & Web workers
I think, we can download all the datas to build an offline app. With web workers, it's possible to fetch the datas in background without freezing the UI. 
### Internationalization

### Accessibility
