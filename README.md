This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



## Requirement

This project requires [Photo Backend App](https://github.com/redmacdev1988/photoBackend) to be running.
It will then consume data from that app to render an image gallery.


### Installing Node Modules

After you have cloned the project onto your computer, go to the root directory.

```
yarn install
```

There should then be a node_modules folder.



### Running the app

Assuming the [Photo Backend App](https://github.com/redmacdev1988/photoBackend) is running, open a browser
and type [http://localhost:3000](http://localhost:3000).

You should then be able to see the photo gallery.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


## Features

The photo titles/urls are organized in an avl tree.

### A to Z
There is an A-Z button. Press this to sort the images alphabetically from A to Z. 
I used left to right in-order recursive traversal of the tree and push each node onto an array.
The array is then rendered via React JS.

### Z to A
There is an Z-A button. Press this to sort the images inverse alphabetically from Z to A.
I used right to left in-order recursive traversal of the tree and push each node onto an array. 
The array is then rendered via React JS.

### Search if title contains a string

Say you want to see if any image title contains the pattern: 'thai'. Once you type in this pattern, all image titles that contains 'thai' will be displayed.

This is done by first exporting the avl tree nodes into an array.
Then I visit every element in the array and apply the [Bad Char Heuristic](https://github.com/redmacdev1988/photoFrontend/blob/master/src/BadHeuristics/BadHeuristics.js) algorithm. Running is O ( text.length / pattern.length);

It uses the string you give as a pattern, and tries to see where it exists in the image title. If it does, then I simply push this element
onto a results array. In the end, the results array is what gets rendered. 

This is applied via traversing the whole tree. Hence running time is O(n).

Total running time is: O(t * n / p);


### Search if title starts with a string

It uses a string you give as a pattern. It then travels right or left depending on if the pattern you are trying to match is greater or smaller alphabetically. If smaller, it goes left. If greater, right goes right. This is done O(log n) time.

When your pattern matches, then we need to check for all of this subtree. Because if the current node starts with your pattern, then the left or right node may very well also start with your pattern. Thus, at this point, I simply traverse the whole subtree. This is done in O(n) time.

In the best case scenerio, its O(log n) where there is only one match. You basically step down into the tree until you find that ONE match.

In the worse case secenerio, the root has a match. Thus, your whole tree potentically may start with your pattern, and thus, you'll have to traverse every node. This is O(n).