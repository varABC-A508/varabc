
import sys
from itertools import combinations
input=sys.stdin.readline

class Ingre:
    def __init__(self, p, f, s, v, c):
        self.p = p
        self.f = f
        self.s = s
        self.v = v
        self.c = c

class Recipe:
    def __init__(self, cost_sum, idx_list):
        self.cost_sum = cost_sum
        self.idx_list = idx_list

def find_small():
    recipe_list.sort(key=lambda x: (x.cost_sum, ''.join(map(str, x.idx_list))))
    for r in recipe_list:
        sp = sf = ss = sv = 0
        for idx in r.idx_list:
            sp += table[idx].p
            sf += table[idx].f
            ss += table[idx].s
            sv += table[idx].v
        if sp >= stand[0] and sf >= stand[1] and ss >= stand[2] and sv >= stand[3]:
            return r
    return None

N = int(sys.stdin.readline().rstrip())
stand = list(map(int, sys.stdin.readline().split()))
table = [None] * (N + 1)
recipe_list = []

for i in range(1, N + 1):
    p, f, s, v, c = map(int, sys.stdin.readline().split())
    table[i] = Ingre(p, f, s, v, c)

for r in range(1, N + 1):
    for comb in combinations(range(1, N + 1), r):
        cost_sum = 0
        idx_list = list(comb)
        for idx in idx_list:
            cost_sum += table[idx].c
        recipe_list.append(Recipe(cost_sum, idx_list))

answer = find_small()

if answer is None:
    print(-1)
else:
    print(answer.cost_sum)
    print(' '.join(map(str, answer.idx_list)))
