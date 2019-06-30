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

Go to root directory and type:

```
yarn start
```

Wait a bit while the app starts up.

Assuming the [Photo Backend App](https://github.com/redmacdev1988/photoBackend) is running, a browser will automatically start up
at [http://localhost:3000](http://localhost:3000).

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

Say you want to see if any image title contains the pattern: 'thai'. 
Once you type in this pattern, all image titles that contains 'thai' will be displayed.

This is done by first exporting the avl tree nodes into an array.
Then I visit every element in the array and apply the [Bad Char Heuristic](https://github.com/redmacdev1988/photoFrontend/blob/master/src/BadHeuristics/BadHeuristics.js) algorithm. Running time is O(text.length / pattern.length);

If the Bad Car Heuristic algorithm found index(s) then I simply push this element onto a results array. In the end, the results array is what gets rendered. 

This is applied to every node in the tree because every image title may potentially contain the string 'thai'.
Hence running time for this part is O(n).

Total running time of applying Bad Char Heuristic to every node is: O(t * n / p).
Where t is the image title length. p is the pattern length. And n is the # of nodes.


### Search if title starts with a string

It uses a string you give as a pattern. It then travels right or left depending on if the pattern you are trying to match is greater or smaller alphabetically. If smaller, it goes left. If greater, right goes right. This is done O(log n) time.

When your pattern matches, then we need to check for all of this subtree. Because if the current node starts with your pattern, then the left or right node may very well also start with your pattern. 

For example, say we're looking for 'thai'. The subtree is thaiM, left node is thaiA, and right node is thaiZ.
Thus, this whole subtree starts with the string thai. That's why you'll have to traverse the whole string do the match.

Thus, at this point, I simply traverse the whole subtree. This is done in O(n) time. The running time of the string matching is O(pattern.text) because
we're simply looking to see if the image title STARTS with the pattern. Thus, you simply loop down the pattern.

n is # of nodes.
p is length of pattern.

In the best case scenerio, its O(log n) + O(p) where there is only one match. You basically step down into the tree until you find that ONE match.

In the worse case secenerio, the root has a match. Thus, your whole tree potentically may start with your pattern, and thus, you'll have to traverse every node. This is O(n * p).