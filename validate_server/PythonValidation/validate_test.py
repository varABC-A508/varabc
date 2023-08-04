import os
import subprocess
# import resource  # resource 모듈 추가 이건 맥이랑 리눅스만 가능
import time
import psutil
#메모리용

def read_file_contents(file_path):
    with open(file_path, "r") as file:
        return file.read()

def run_code_with_test_cases(code, test_cases):
    # 코드를 파일에 저장하여 임시로 실행.
    with open("temp_code.py", "w") as temp_file:
        temp_file.write(code)

    results = []
    for i, test_case in enumerate(test_cases,1):
        input_file_path = "input.txt"
        input_data = read_file_contents(input_file_path)

        output_file_path = "output.txt"
        output_data = read_file_contents(output_file_path)
        expected_output = output_data
        try:
            # 코드를 실행하여 결과를 얻음
            # print(input_data)
            process = subprocess.Popen(["python3", "temp_code.py"], stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
            # start_time = resource.getrusage(resource.RUSAGE_CHILDREN).ru_utime  # 시작 시간 기록
            start_time = time.time()
            output, _ = process.communicate(input=input_data)
            # end_time = resource.getrusage(resource.RUSAGE_CHILDREN).ru_utime  # 종료 시간 기록
            end_time = time.time()
            output = output.strip()
            # print(output)
            # print(expected_output)

            #시간 측정
            execution_time = end_time - start_time
            print(f"Start Time: {start_time} seconds")
            print(f"Execution Time: {execution_time} seconds")
            # 메모리 사용량 측정
            memory_usage = psutil.virtual_memory().used
            memory_usage =  format(memory_usage / 1000, ",.3f")
            print(f"Memory Usage: {memory_usage} Mbytes")
            # 실행 결과를 평가
            result = "Passed" if output == expected_output else "Failed"
            results.append((i, result))
        except Exception as e:
            results.append((i, "Error: " + str(e)))

    # 임시 파일 삭제
    # os.remove("temp_code.py")

    return results

# 예시 문제와 풀이 코드
problem_id = 1
solution_code = """
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
"""

# 테스트 케이스 예시
test_cases = [
    {}
]

# 코드 실행 및 채점
results = run_code_with_test_cases(solution_code,test_cases)
for test_num, result in results:
    print(f"Test {test_num}: {result}")