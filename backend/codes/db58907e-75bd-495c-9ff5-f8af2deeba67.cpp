#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> lastSeen;
    int maxLength = 0;
    int start = 0; // Left pointer of the sliding window

    for (int end = 0; end < s.length(); ++end) {
        char currentChar = s[end];

        // If the character is already in the map and its index is within the current window
        if (lastSeen.find(currentChar) != lastSeen.end() && lastSeen[currentChar] >= start) {
            start = lastSeen[currentChar] + 1; // Move the start to exclude the last occurrence
        }

        lastSeen[currentChar] = end; // Update last seen index of the current character
        maxLength = max(maxLength, end - start + 1);
    }

    return maxLength;
}

int main() {
    string s;
    cin >> s;

    int result = lengthOfLongestSubstring(s);
    cout << result << endl;

    return 0;
}
