# Web Development Project 4 - *Find-A-Cat*

Submitted by: **Rafael Niebles**

This web app: **Allows you to discover new random cat breeds by clicking a button using [The Cat API](https://thecatapi.com/)**

Time spent: **8** hours spent in total

## Required Features

The following **required** functionality is completed: 

- [x] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - The type of attribute displayed for each image should be consistent across API calls (i.e. if you are using a cat API, and display the color, breed, and age in response to an initial API call, subsequent button clicks should also result in the color, breed, and age being displayed)
- [x] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**
  - A single result of an API call is displayed at a time 
  - Displayed attributes should match the displayed image (i.e., if showing a picture of a Siamese cat and the attribute breed, the displayed breed should be 'Siamese' not 'Ragdoll' or another breed that doesn't match)
  - There is at least one image per API call
- [x] **API call response results should appear random to the user**
  - Clicking on the API call button should generate a seemingly random new result each time
  - Note: Repeat results are permitted but the API used should have a reasonably large amount of data and repeats should not be frequent
- [x] **Clicking on a displayed value for one attribute adds it to a displayed ban list**
  - At least one attribute for each API result should be clickable
  - Clicking on a clickable attribute not on the ban list, should imnmediately add it to the ban list 
  - Clicking on an attribute in the ban list should immediately remove it from the ban list 
- [x] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**
  - Clicking on the API call button should not result in any image/attributes with attribute values in the ban list being displayed (ex. Using a cat API, if the ban list includes the value 'Siberian' for the breed attribute, clicking on the Discover button should never result in a Siberian cat being displayed)
  - Note: More attribute values on the ban list may result in a higher frequency of repeat results
  -  [x] _To ensure an accurate grade, your recording **must** show that when clicked, an attribute in the ban list is immediately removed from the list of banned attributes_

The following **optional** features are implemented:

- [x] Multiple types of attributes are clickable and can be added to the ban list
- [x] Users can see a stored history of their previously displayed  results from this session
  - A dedicated section of the application displays all the previous images/attributes seen before
  - Each time the API call button is clicked, the history updates with the newest API result

The following **additional** features are implemented:

- [x] Ability to use all breed attributes  
    > Breed attributes are provided as a single string by cat API with inconsistent capitalization; a system that tokenizes this string and processes it adequately was implemented so the breed string's listed attributes can be used like all other ones.

## Video Walkthrough

#### Overall Demonstration

![overall-demo](./github/overall-demo.gif)

#### Ban List Applying During API Request 

![ban-list-demo](./github/ban-list-demo.gif)

## Notes

A lot of this app's state is shared between components, meaning it needs to be lifted up. However, not all state is shared; in cases like this, because React re-renders all of a parent's children,  some re-renders ocurred when state that didn't concern them got updated. This was troublesome because I used one-shot animations that fire when re-renders occur, so updating the cat history, for example, made all the ban list entries pop in again.

I tried to resolve this using React contexts to make state sharing more semantic, but a context provider still refreshes all components that consume it even if state was unrelated still. I thought this wasn't the case for contexts.

My final solution was to memoize components using `useMemo` that did animations when re-rendering, ensuring they only did so when their specific dependencies changed. This fixed the problem and made animations (and re-renders) fire correctly.

## License

    Copyright [2025] (Rafael Niebles) 

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

