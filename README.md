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

I used React JS's action/reducer to consume the Photo Backend App. I read in an array of objects which contains the photos' title, and url.
Each object is then inserted into an avl tree. Naturally this takes O(n * log n) time.

### A to Z
There is an A-Z button. Press this to sort the images alphabetically from A to Z. 
I used left to right in-order recursive traversal of the tree and push each node onto an array.
The array is then rendered via React JS. O(n)

### Z to A
There is an Z-A button. Press this to sort the images inverse alphabetically from Z to A.
I used right to left in-order recursive traversal of the tree and push each node onto an array. 
The array is then rendered via React JS. O(n)


### Search if title STARTS with a string

It uses a string you give as a pattern. 

1) It then travels right or left depending on if the pattern you are trying to match is greater or smaller alphabetically. If smaller, it goes left. If greater, it goes right. The pattern matching itself is at most pattern.length. Because we simply match pattern with the beginning substring of the image title.

2) When you have a successful pattern match, we store the current image title in a results array.
Then, instead of trying to see if we should go left or right, we actually need to check for BOTH left and right nodes. Because if the current node starts with your pattern, then the left or right node or BOTH may very well also start with your pattern. That's why when you get a match, you must evaluate both left and right.

For example, say we're looking for 'thai'. The current node is 'thaiM', left node is 'thaiA', and right node is 'thaiZ'. Thus, all three nodes must be included in our search.

3) But let's say our left node is 'aaa', and right node is thaiZ.

In this case, we already have had a match at thaiM. 
When we evaluate 'aaa', and if its not a match, we simply start over at 1).
If there is a match at thaiZ, then we apply 2).

The reason for this is because as each node is being added, they get rotated and they are not always next to each other alphabetically.

Here is an example:

[Photo Backend App](http://chineseruleof8.com/code/wp-content/uploads/2019/07/startWith_reasoning.jpg)

### Running Time

n is # of nodes.
p is length of pattern.

In the best case scenerio, its O(log n) + O(p) where there is only one match. You basically step down into the tree until you find that ONE match.

In the worse case secenerio, the root has a match. Thus, your whole tree potentically may start with your pattern, and thus, you'll have to traverse every node. This is O(n * p).




### Search if title CONTAINS a string

Say you want to see if any image title contains the pattern: 'thai'. 
Once you type in this pattern, all image titles that contains 'thai' will be displayed.

This is done by first exporting the avl tree nodes into an array.
Then I visit every element in the array and apply the [Bad Char Heuristic](https://github.com/redmacdev1988/photoFrontend/blob/master/src/BadHeuristics/BadHeuristics.js) algorithm. Running time is O(text.length / pattern.length);

If the Bad Car Heuristic algorithm found index(s) then I simply push this element onto a results array. In the end, the results array is what gets rendered. 

This is applied to every node in the tree because every image title may potentially contain the string 'thai'.
Hence running time for this part is O(n).

Total running time of applying Bad Char Heuristic to every node is: O(t * n / p).
Where t is the image title length. p is the pattern length. And n is the # of nodes.

