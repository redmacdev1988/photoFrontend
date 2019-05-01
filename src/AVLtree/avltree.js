
//var CONSTANTS = require("./constants");
var CONSTANTS  = {
    PREORDER: 1,
    INORDER: 2,
    POSTORDER: 3,
    LEFT_HEAVY: 4,
    RIGHT_HEAVY: 5,
    LEFT: 6,
    RIGHT: 7,
    REVERSE_PRINT: 8,
};


// Using ES6:
class TreeNode {
    constructor (left, newData, newHeight, newBalance, right) {
        this.left = left || null;
        this.data = newData;
        this.height = newHeight;
        this.balance = newBalance;
        this.right = right || null;
    }

    display() {
        console.log("> " +this.data + " height: " + this.height + ", balance: " + this.balance);
    }

    delete() {
        this.left = null;
        this.data = null;
        this.height = null;
        this.balance = null;
        this.right = null;
    }
}

function heightOfTree(node) {
    if (node === null) return -1;
    return Math.max(heightOfTree(node.left), 
                    heightOfTree(node.right)) + 1;
}

 // O( 1 )
 function calculateAndAssignNewBalance(node) {
    if (node === null) return 0;
    let leftHeight = (node.left ? node.left.height: -1);
    let rightHeight = (node.right ? node.right.height: -1);
    node.balance = leftHeight - rightHeight;
}

// O( 1 )
function calculateAndAssignNewHeight(node) {
    node.height = 1 + Math.max((node.right) ? node.right.height: -1,  (node.left) ? node.left.height: -1); 
}

// O(log n)
    // after each rotate, let's update the heights andn balance
function rotate(node, directionType) {
    var anchor = null;
    var toMove = node;

    if (directionType === CONSTANTS.LEFT) {
        anchor = node.right;
        toMove.right = (anchor.left) ? anchor.left : null;
        anchor.left = toMove;

    } else if (directionType === CONSTANTS.RIGHT) {
        anchor = node.left;
        toMove.left = (anchor.right) ? anchor.right : null;
        anchor.right = toMove;
    }

    // After an insertion, you need to update the balance factor of each "parent" 
    // all the way up the tree until the root; so it's a max of O(log n) updates.
    anchor.height = heightOfTree(anchor); // O(log n)
    toMove.height = heightOfTree(toMove); // O(log n)

    calculateAndAssignNewBalance(anchor);
    calculateAndAssignNewBalance(toMove);
    return anchor;
}

function inOrderCollect(data, node, results) {
    if (node === null || !node) { 
        return;
    }
    inOrderCollect(data, node.left, results);    
    if (node.data.startsWith(data)) {    
        results.push(node.data); 
    }
    inOrderCollect(data, node.right, results);
}
// REDO
// O( log n )
function anyMatchSearch(data, node, results) {
    if (node === null || !node) { 
        //console.log('uh oh node is empty');
        return; 
    }
    //console.log(`anyMatchSearch - node data: ${node.data}, data is: ${data}`);

    if (node.data.startsWith(data)) { 
        //console.log(`okay,found a match starting at ${node.data}`);
        // in order collect
        inOrderCollect(data, node, results);
    }

    else if (data < node.data) {
        //console.log(`anyMatchSearch go left`);
        anyMatchSearch(data, node.left, results);
    } else if (data > node.data) {
        //console.log(`anyMatchSearch go right`);
        anyMatchSearch(data, node.right, results);
    } 
}


// O( log n )
function exactSearch(data, node) {
    if (node === null || !node) { 
        console.log(`${data} not found in this tree`);
        return null; 
    }
    if (data < node.data) {
        return exactSearch(data, node.left);
    } else if (data > node.data) {
        return exactSearch(data, node.right);
    } else if (data === node.data) {
        return node;
    }
}

function rightMostOfLeftSubTree(node, callback) {
    if (!node.right) {
        let toConnect = node.left;
        callback(node);
        return toConnect; // no more node.right, so we return node left
    }
    node.right = rightMostOfLeftSubTree(node.right, callback);
    return updateHeightBalanceThenCorrectImbalance(node);
}

function leftMostOfRightSubTree(node, callback) {
    if (!node.left) {
        let toConnect = node.right;
        callback(node);
        return toConnect; // no more node.right, so we return node left
    }
    node.left = leftMostOfRightSubTree(node.left, callback);
    return updateHeightBalanceThenCorrectImbalance(node);
}


function updateHeightBalanceThenCorrectImbalance(node) {
    calculateAndAssignNewHeight(node);
    calculateAndAssignNewBalance(node);
    return correctImbalanceIfAny(node);
}

function stdBSTDelete(data, node) {
    if (node === null || !node) { 
        console.log(`${data} not found in this tree`);
        return null; 
    }
    if (data < node.data) {
        node.left = stdBSTDelete(data, node.left);
    } else if (data > node.data) {
        node.right = stdBSTDelete(data, node.right);
    } else if (data === node.data) {
        if (!node.left && !node.right) { // no children
            node.delete();
            node = null;
            return null;
        }

        if (node.left && !node.right) { // left child
            let leftNode = node.left;
            node.delete();
            return leftNode;
        }

        if (!node.left && node.right) { // right child
            let rightNode = node.right;
            node.delete();
            return rightNode;
        }

        if (node.left && node.right) { // both children
            if  (node.left.height >= node.right.height) {  
                node.left = rightMostOfLeftSubTree(node.left, function(toDelete) {
                    node.data = toDelete.data;
                    toDelete.delete();
                });
            }

            if  (node.right.height > node.left.height) {
                node.right = leftMostOfRightSubTree(node.right, function(toDelete) {
                    node.data = toDelete.data;
                    toDelete.delete();
                });
            }
        }
    }

   return updateHeightBalanceThenCorrectImbalance(node);
}

// O( log n )  for the insertion
// running time of 1 insertion:
// O( log n) , for updating the heights up to the root
// O( log n ) for binary recursion of inserting
// Thus, each insertion is O( log n )

// 1) BST standard insert to the end
// before you recurse back up:
// 2) update node's height 
// 3) update node's balance. Balance it with rotate if unbalanced
function stdBSTInsert(data, node) {
    if (node === null) { return new TreeNode(null, data, 0, 0, null); }
    if (data < node.data) {
        node.left = stdBSTInsert(data, node.left);
    } else {
        node.right = stdBSTInsert(data, node.right);
    }
    return updateHeightBalanceThenCorrectImbalance(node);
}

function correctImbalanceIfAny(node) {
    if (node.balance >= 2) {
        if (node.left && node.left.balance >= 1) {
            node = rotate(node, CONSTANTS.RIGHT);  // O(log n)
        }
        if (node.left && node.left.balance <= -1) {
            node.left = rotate(node.left, CONSTANTS.LEFT); // O(log n)
            node = rotate(node, CONSTANTS.RIGHT); // O(log n)
        }
    }

    if (node.balance <= -2) {
        if (node.right && node.right.balance <= -1) {
            node = rotate(node, CONSTANTS.LEFT);  // O(log n)
        }
        if (node.right && node.right.balance >= 1) {
            node.right = rotate(node.right, CONSTANTS.RIGHT); // O(log n)
            node = rotate(node, CONSTANTS.LEFT); // O(log n)
        }
    }
    return node;
}


function display(node) {
    if (!node) return;
    display(node.left);
    node.display();
    display(node.right);
}

function clear(node) {
    if (!node) return;
    clear(node.left);
    clear(node.right);

    node.delete();
    node = null;
}


function preOrder(node, results) {
    if (!node) return;
    preOrder(node.left, results);
    results.push(node.data);
    preOrder(node.right, results)
}

function preOrderReverse(node, results) {
    if (!node) return;
    preOrderReverse(node.right, results);
    results.push(node.data);
    preOrderReverse(node.left, results)
}


//module.exports = class AVLTree {
const AVLTreeClass = class AVLTree {
    constructor () { 
        this._head = null; 
    }
    static CreateObject() { return new AVLTree(); }

    clearWholeTree() {
        if (!this._head) {
            console.log(`tree already empty`);
        } else {
            clear(this._head);
            this._head = null;
        }
    }

    insert(data) {
        if (!this._head) {
            this._head = new TreeNode(null, data, 0, 0, null); 
        } else {
            this._head = stdBSTInsert(data, this._head);
        }
    }

    delete(data) {
        if (!this._head) {
            console.log(`ø tree is empty. Not data to be found`);
            return null;
        } else {
            this._head = stdBSTDelete(data, this._head);
        }
    }

    searchForAnyMatchStartingWith(data) {
        //console.log(`searchForAnyMatchStartingWith: ${data}`);
        let results = [];
        if (!this._head) {
            console.log(`ø tree is empty. No data to be found`);
            return results;
        } else {
            anyMatchSearch(data, this._head, results);
            return results;
        }
    }

    searchForExactMatch(data) {
        if (!this._head) {
            console.log(`ø tree is empty. Not data to be found`);
            return null;
        } else {
            return exactSearch(data, this._head);
        }
    }

    displayAllNodes() {
        console.log(`√ displayAllNodes √`);
        console.log(this._head);

        if (!this._head) {
            console.log('tree already empty;');
            return;
        } else {
            display(this._head);
        }
    }

    firstToLast() {
        let results = [];
        if (!this._head) {
            console.log('tree already empty;');
            return;
        } else {
            preOrder(this._head, results);
        }
        return results;
    }


    lastToFirst() {
        let results = [];
        if (!this._head) {
            console.log('tree already empty;');
            return;
        } else {
            preOrderReverse(this._head, results);
        }
        return results;
    }
}


export default AVLTreeClass;