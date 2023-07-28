#include <iostream>
#include <vector>
using namespace std;

int N;
vector<int> timelist, costlist;
vector<int> dp;

int dpTrack(int day) {
    if (day > N + 1) {
        return -100000000;
    }
    if (day == N + 1) {
        return 0;
    }
    if (dp[day] != -1) {
        return dp[day];
    }
    dp[day] = max(dpTrack(day + 1), dpTrack(day + timelist[day]) + costlist[day]);
    return dp[day];
}

int main() {
    cin.tie(nullptr);

    cin >> N;
    timelist.resize(N + 1);
    costlist.resize(N + 1);
    dp.resize(N + 1, -1);

    for (int i = 1; i <= N; i++) {
        cin >> timelist[i] >> costlist[i];
    }

    cout << dpTrack(1) << "\n";

    return 0;
}