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
Each object is then inserted into an avl tree. Naturally this takes O(n) time.

### A to Z
There is an A-Z button. Press this to sort the images alphabetically from A to Z. 
I used left to right in-order recursive traversal of the tree and push each node onto an array.
The array is then rendered via React JS. O(n)

### Z to A
There is an Z-A button. Press this to sort the images inverse alphabetically from Z to A.
I used right to left in-order recursive traversal of the tree and push each node onto an array. 
The array is then rendered via React JS. O(n)


### Search if title STARTS with a string

It uses a string you give as a pattern. It then travels right or left depending on if the pattern you are trying to match is greater or smaller alphabetically. If smaller, it goes left. If greater, it goes right. This is done O(log n) time.

When your pattern matches, then we need to check for both left and right nodes. Because if the current node starts with your pattern, then the left or right node may very well also start with your pattern. 

For example, say we're looking for 'thai'. The node is thaiM, left node is thaiA, and right node is thaiZ. This whole subtree starts with the string 'thai'.

Continuing from the above example of node thaiM. Say our left node is 'AAA', and right node is thaiZ.

In this case, when we evaluate 'AAA', its not match and we can stop the recursion. This is because if 'AAA' is not a match, then it is impossible for any of its children to be a match. 

Let's take a look at this example here:

```
let test = new AVLTreeClass();
test.insert('localhost:1234/thaiM.jpg');
test.insert('localhost:1234/hobo.jpg');
test.insert('localhost:1234/thaiZ.jpg');
test.insert('localhost:1234/thaiS.jpg');
test.insert('localhost:1234/zz.jpg');
test.insert('localhost:1234/aa.jpg');
test.insert('localhost:1234/icarus.jpg');

test.displayAllNodes();

let results = test.searchForStartingWith('localhost:1234', 'thai');
console.log(results);
```

![Test Results](http://chineseruleof8.com/code/wp-content/uploads/2019/06/avl_subtree_ex.jpg)

When we hit thaiM, we have a match. 
When we go left, there is no match at 'hobo'. Since we're in the subtree of a match already, we simply return. This is because if the current node at 'hobo' does not 
match, its impossible for its children to have a match.

If we were to go right, we hit 'thaiZ'. There is a match here. Thus, we need to hit both left and right nodes. 
.. and so on. 


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

