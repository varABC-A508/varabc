import os
import subprocess
# import resource  # resource 모듈 추가 이건 맥이랑 리눅스만 가능
import time
import psutil

def read_file_contents(file_path):
    with open(file_path, "r") as file:
        return file.read()

def run_code_with_test_case(code, input_content,output_content):
    # 코드를 파일에 저장하여 임시로 실행.
    results = []
    expected_output = output_content
    # print(code)
    # print(output_content)
    try:
        # 코드를 실행하여 결과를 얻음, 아오 왜 안되는거여
        # print(input_data)
        process = subprocess.Popen(["python", "temp_code.py"], stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
        # start_time = resource.getrusage(resource.RUSAGE_CHILDREN).ru_utime  # 시작 시간 기록
        start_time = time.time()
        output, _ = process.communicate(input=input_content)
        # end_time = resource.getrusage(resource.RUSAGE_CHILDREN).ru_utime  # 종료 시간 기록
        end_time = time.time()
        output = output.strip()
        print("inside test")
        print(input_content)
        print("output: ")
        print(output)
        print("expected output: ")
        print(expected_output)

        # 시간 측정
        execution_time = end_time - start_time
        print(f"Start Time: {start_time} seconds")
        print(f"Execution Time: {execution_time} seconds")
        # 메모리 사용량 측정
        memory_usage = psutil.virtual_memory().used
        memory_usage = format(memory_usage / 1000, ",.3f")
        print(f"Memory Usage: {memory_usage} Mbytes")
        # 실행 결과를 평가
        result = "Passed" if output == expected_output else "Failed"
        results.append((result))
    except Exception as e:
        results.append(("Error: " + str(e)))

    # 임시 파일 삭제
    # os.remove("temp_code.py")

    return results

# 예시 문제와 풀이 코드
problem_id = 1
solution_code = ""

# 테스트 케이스 예시
test_cases = [
    {}
]

# 코드 실행 및 채점
# results = run_code_with_test_cases(solution_code,test_cases)
# for test_num, result in results:
#     print(f"Test {test_num}: {result}")