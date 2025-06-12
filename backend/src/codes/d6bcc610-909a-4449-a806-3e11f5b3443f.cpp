// C++ code for correct a BST where two nodes are swapped,
// Using recursion

#include <iostream>
#include <queue>
using namespace std;

class Node {
public:
    int data;
    Node *left, *right;
    Node(int val) {
        data = val;
        left = nullptr;
        right = nullptr;
    }
};

// Recursive Function for inorder traversal to find out 
// the two swapped nodes.
void correctBSTUtil(Node* root, Node* &first, Node* &middle, 
                                  Node* &last, Node* &prev) {
    if (root == nullptr)
        return;

    // Recur for the left subtree
    correctBSTUtil(root->left, first, middle, last, prev);

    // If this node is smaller than the previous node, 
    // it's violating the BST rule.
    if (prev && root->data < prev->data) {
      
        // If this is the first violation, mark these 
        // two nodes as 'first' and 'middle'
        if (!first) {
            first = prev;
            middle = root;
        }
      
        // If this is the second violation, 
        // mark this node as last
        else
            last = root;
    }

    // Mark this node as previous
    prev = root;

    // Recur for the right subtree
    correctBSTUtil(root->right, first, middle, last, prev);
}

// Function to fix the given BST, where two nodes are swapped.
void correctBST(Node *root) {
  	
    // Initialize pointers needed for correctBSTUtil()
    Node *first = nullptr, *middle = nullptr, 
         *last = nullptr, *prev = nullptr;

    // Set the pointers to find out two nodes
    correctBSTUtil(root, first, middle, last, prev);

    // Fix (or correct) the tree
    if (first && last)
        swap(first->data, last->data);
    else if (first && middle)
        swap(first->data, middle->data);
}

// Print tree as level order
void printLevelOrder(Node *root) {
    if (root == nullptr) {
        cout << "N ";
        return;
    }

    queue<Node *> qq;
    qq.push(root);
    int nonNull = 1;

    while (!qq.empty() && nonNull > 0) {
        Node *curr = qq.front();
        qq.pop();

        if (curr == nullptr) {
            cout << "N ";
            continue;
        }
        nonNull--;

        cout << (curr->data) << " ";
        qq.push(curr->left);
        qq.push(curr->right);
        if (curr->left)
            nonNull++;
        if (curr->right)
            nonNull++;
    }
}

int main(){
  
    // Constructing the tree with swapped nodes
    //       6
    //     /  \
    //    10   2
    //   / \  / \
    //  1  3 7  12
    // Here, 10 and 2 are swapped
  
    Node *root = new Node(6);
    root->left = new Node(10);
    root->right = new Node(2);
    root->left->left = new Node(1);
    root->left->right = new Node(3);
    root->right->right = new Node(12);
    root->right->left = new Node(7);

    correctBST(root);
    printLevelOrder(root);
 
    return 0;
}