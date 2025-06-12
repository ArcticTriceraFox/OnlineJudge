#include <iostream>
using namespace std;
#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> charIndex;
    int maxLength = 0, left = 0;

    for (int right = 0; right < s.length(); ++right) {
        if (charIndex.count(s[right]) && charIndex[s[right]] >= left) {
            left = charIndex[s[right]] + 1;
        }
        charIndex[s[right]] = right;
        maxLength = max(maxLength, right - left + 1);
    }

    return maxLength;
}

int main() {
    string s;
    getline(cin, s); // to handle empty input and spaces
    if (s.empty()) {
        cout << 0 << endl;
    } else {
        cout << lengthOfLongestSubstring(s) << endl;
    }
    return 0;
}
