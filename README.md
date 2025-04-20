# TripLab

#### Seamless planning for unforgettable escapes.
<img src="public/images/triplab.png" alt="TripLab Home Page"/>

## Description
TripLab is a collaborative travel planning platform designed to make organizing your next adventure simple and seamless. Whether you're mapping out a weekend getaway or a bucket-list journey with friends, TripLab brings your plans together in one easy-to-use space.

## Quick Links
* **Project planning** can be found [here](https://trello.com/b/epUCcSl0/travel-app).
* **Wireframe** can be found [here](https://lucid.app/lucidchart/bcf47620-83d2-4df6-97f1-8463e40dfd30/edit?invitationId=inv_9ebe864a-4e20-4917-ae79-88fcaa82c609&page=0_0#).
* **GitHub repo: Front-end** can be found [here](https://github.com/JadAoun1/travel-companion-frontend).
* **GitHub repo: Back-end** can be found [here](https://github.com/JadAoun1/travel-companion-backend).
* **Deployed project** link can be found [here](https://triplabapp.netlify.app/).

## Table of Contents
* [Technologies Used](#technologiesused)
* [Attributions](#attributions)
* [Features](#features)
* [Design](#design)
* [Project Next Steps](#nextsteps)
* [Team](#team)
* [Works Cited](#workscited)

## <a name="technologiesused"></a>Technologies Used
* MongoDB + Mongoose
* Express
* React
* Node
* Javascript
* Google Maps API
* CSS
* bcrypt
* dotenv

## <a name="attributions"></a>Attributions
* [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding): used to convert addresses or Place IDs to latitude/longitude coordinates, add markers on the map
* [Google Maps Places (New) API](https://developers.google.com/maps/documentation/places/web-service/op-overview): used to convert geocoding data to place details, including location name ('displayName').
<!-- This section should include links to any external resources (such as libraries or assets) you used to develop your application that require attribution. You can exclude this section if it does not apply to your application. -->

## <a name="design"></a>Design
* Notable design details including what inspired the design.

## <a name="nextsteps"></a>Project Next Steps
* Replace current dropdown for adding users to a trip with a searchable input field allowing users to search by usernames to easily add others to their trips. 
* Refactor MapView.jsx to lift state so that Google Maps Places (New) API data can be rendered elsewhere.
* Build out models to incorporate more data within the UI (including, but not limited to user profiles, and destination/attraction details)
* Incorporate in-app messaging system so users assigned to the same trip can communicate. 
* Show multiple markers on trip and destination show page maps. 
* Utilize more capababilities of the Google Maps Places (New) API to allow users to find additional nearby attractions.

## <a name="Team"></a>Team
* Scrummaster: Jad Aaoun
* Backend-Lead: Anna Steckel
* Frontend-Lead: Amen Ali

## <a name="workscited"></a>Works Cited:
* **[git revert vs reset](https://medium.com/@halilatilla/git-revert-and-reset-understanding-their-purpose-and-differences-d11a913e288)**: This project was a crash course in github collaboration so we utilized git reset on multiple occasions to get to our last working version.
* **[Google API docs](https://developers.google.com/maps)**: Anna learned firsthand just how hard these docs are to navigate (pun intended).
* **[How to Implement Google Places API in Your Application (JS, Express, Node.js)](https://medium.com/swlh/how-to-implement-google-places-api-in-your-application-js-express-node-js-97b16da24835)**: This was a super brief overview of how to implement Google Places API. The research that followed reading this article included a deep rabbit hole of guides that required Typescript translation into Javascript, lots of chatGPT prompts like, "Can you explain _____ concept when implementing Google Maps API?", and many YouTube tutorials. 
* **[SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON](https://stackoverflow.com/questions/73359274/syntaxerror-unexpected-token-doctype-is-not-valid-json)**: This was just one of many resources we used when getting this error message (which happened far more than we would have liked). 
* **[Full React Tutorial by Net Ninja](https://www.youtube.com/watch?v=PHaECbrKgs0)**: And other YouTube tutorials refreshing our understanding of React.
* **[React DOM Components](https://react.dev/reference/react-dom/components)**: This resource was used to understand form components and how to use select in different ways.  
* **[StackOverflow: Generate options by mapping over array of objects with react-select ](https://stackoverflow.com/questions/55173409/generate-options-by-mapping-over-array-of-objects-with-react-select/55173797#55173797)**: This helped understand how to generate select options by mapping over an array so users can be seen in a dropdown.  
* **[GeeksforGeeks: Mongoose Populate Method](https://www.geeksforgeeks.org/mongoose-populate-method/)**: This helped give a better understanding on the .populate() method and how to use it to retrieve data in queries. 
* **[MDN: .toString() Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)**: This filled learning gaps and helped in understanding how the toString() method works, and how it can be used in different parts of the code to convert values to strings.
* **[General Assembly Hoot Front-End](https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-hoot-front-end/setup/)**: Helped with initial front end set-up. 
* **[General Assembly Hoot Back-End](https://pages.git.generalassemb.ly/modular-curriculum-all-courses/express-api-hoot-back-end/create-hoot/)**: Helped with initial back-end set up for routes 
* **[General Assembly JWT-Auth in React](https://pages.git.generalassemb.ly/modular-curriculum-all-courses/jwt-authentication-in-react/setup/)**: This lecture helped setup user authorization and JWT token based authentication to signup, signin, and signout.
* **[How To Manage User Roles In Node.js – Web Dev Simplified:](https://www.youtube.com/watch?v=jI4K7L-LI58&ab_channel=WebDevSimplified)**: This video helped to understand how to add roles to different users and control what they have access to.