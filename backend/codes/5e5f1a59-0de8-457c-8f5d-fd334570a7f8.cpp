#include <iostream>
#include <vector>
using namespace std;

int main() {
    int N;
    cin >> N;
    vector<int> jumps(N);
    for (int i = 0; i < N; i++) {
        cin >> jumps[i];
    }

    vector<bool> visited(N, false);
    int current = 0;

    while (true) {
        if (current == N) {
            // Program tries to execute instruction after the last one -> terminates
            cout << "TERMINATES" << endl;
            break;
        }
        if (current < 0 || current > N) {
            // Jumped outside the valid range, treat as terminates
            cout << "TERMINATES" << endl;
            break;
        }
        if (visited[current]) {
            // We've visited this instruction before -> infinite loop
            cout << "INFINITE" << endl;
            break;
        }
        visited[current] = true;
        current += jumps[current];  // Jump offset
    }

    return 0;
}
