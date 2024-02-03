# MutationCubeGuy
### A half assed attempt to make a evolution simulator (Mutation algorithm)

## How it works (in maybe simple terms)
1. Creates 4 cubes and gives it random x and y speed
2. If all the cubes die it finds the cube with the most distance
3. If a cube reaches the end of the screen then it will get that cube
4. With the speed data from the best cube, we set the speed of 4 new cubes to the one of the best cube with a small mutation (It adds a number between -1 and 1 to each speed variable)
5. repeats until no cubes die

## Libraries used
- Pixi.js for rendering
- Vite for bundling
- Yeah thats it. That's really it!
- Also F*CK Manny (DOWK)

# How to run
1. With node.js and vite installed go into the directory
2. Type `npx vite` or just `vite`
3. click on the link it gives you
4. Waste 20 minutes of your life watching white squares fight to the death