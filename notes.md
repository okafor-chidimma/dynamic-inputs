## Dynamic Inputs notes

Used uuid from npm as an id generator. can't touch package.json here, so --- alternatively could use Math.floor(Math.random() * 1_000_000), for example, to generate mooostly unique ids for rows.  could also perhaps manipulate ids using the length prop on rows state value at a given moment (seemed finnicky)

Had to figure out how to track focus on a list of elements. decided to use an array for ref and put e.target.current values in there, and then manipulate a control variable (refControlIndex) to direct a focus() method call for the element currently to get focus. What I don't like is how there's little separation of concerns now between, for example. moving rows up and down or deleting them, and the focus control. Didn't necessarily like that but I'm glad it seems to work, even if it feels hacky.

Overall, I took care of adding, moving, deleting rows first, and then it felt like I don't have enough space to deal with the focus separately. 

Decided to go ahead and break put part of the return on DynamicInput into a separate InputRow component and passed all the necessary props to that. It remains, however, a dumb component, leaving only DynamicInput stateful.

Again, something wasn't working on Qualified, so instead of fighting the platform, I switched over to my own editor and environment, and actually put the code on github and the app on netlify. Hope that helps keep this valid. I did try to then paste the code here for reference, but for an optimally working solution, please look up the following:

### NETLIFY
https://react-dynamic-inputs-demo-adi.netlify.app/

### GITHUB 
https://github.com/adiforka/dynamic-inputs

