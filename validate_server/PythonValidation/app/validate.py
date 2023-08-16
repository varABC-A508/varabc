import multiprocessing
import subprocess
import time
import threading

import psutil

def memory_monitor(process_pid, max_memory_usage):
    while True:
        try:
            process = psutil.Process(process_pid)
            mem_info = process.memory_info()
            current_memory_usage = mem_info.rss
            if current_memory_usage > max_memory_usage.value:
                max_memory_usage.value = current_memory_usage
            time.sleep(0.001)
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            break

def run_subprocess(queue, input_content, memory_usage):
    process = subprocess.Popen(["python3", "test.py"], stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True, env={"PYTHONIOENCODING": "utf-8"})
    #서브프로세스의 가동중에 스레드를 생성해 해당 스레드에서 현재 실행중인 서브프로세스의 메모리 사용량을 추적한다
    monitor_thread = threading.Thread(target=memory_monitor, args=(process.pid, memory_usage))
    monitor_thread.start()
    #프로세스를 실행하고 결과를 output에 저장한다.
    output, _ = process.communicate(input=input_content)
    queue.put(output.strip())
    monitor_thread.join()

def run_code_with_test_case(input_content, output_content, time_limit, memory_limit):
    expected_output = output_content.strip()
    result = {'result': 0, 'execution_time': 0, 'memory_usage': 0, 'exception_message': ''}
    memory_usage = multiprocessing.Value('i', 0)
    try:
        queue = multiprocessing.Queue()
        start_time = time.time()
        #프로세스의 실행시간을 탐지하기 위해 멀티프로세싱을 적용해 시간초과 여부를 확인한다.
        process = multiprocessing.Process(target=run_subprocess, args=(queue, input_content, memory_usage))
        process.start()
        process.join(timeout=time_limit)
        end_time = time.time()

        if process.is_alive():
            print("Test case takes too long to complete. Killing...")
            process.terminate()
            process.join()
            result['result'] = 2
            result['exception_message'] = "Error: 시간초과"
        else:
            output = queue.get()
            print(output)
            print(expected_output)
            execution_time = end_time - start_time
            result['execution_time'] = int(execution_time*1000)
            result['memory_usage'] = int(memory_usage.value/1024)
            if memory_usage.value > memory_limit:
                result['result'] = 3
                result['exception_message'] = "Error: 메모리초과"
            else:
                result['result'] = 1 if output == expected_output else 4
    except Exception as e:
        result['exception_message'] = str(e)
    return result


def compile_code_with_test_case(input_content, output_content, time_limit, memory_limit):
    expected_output = output_content.strip()
    result = {'result': 0, 'execution_time': 0, 'memory_usage': 0, 'exception_message': '', 'output': ''}
    memory_usage = multiprocessing.Value('i', 0)
    try:
        queue = multiprocessing.Queue()
        start_time = time.time()
        #프로세스의 실행시간을 탐지하기 위해 멀티프로세싱을 적용해 시간초과 여부를 확인한다.
        process = multiprocessing.Process(target=run_subprocess, args=(queue, input_content, memory_usage))
        process.start()
        process.join(timeout=time_limit)
        end_time = time.time()

        if process.is_alive():
            print("Test case takes too long to complete. Killing...")
            process.terminate()
            process.join()
            result['result'] = 2
            result['exception_message'] = "Error: 시간초과"
        else:
            output = queue.get()
            print(output)
            print(expected_output)
            result['output']=output
            execution_time = end_time - start_time
            result['execution_time'] = int(execution_time*1000)
            result['memory_usage'] = int(memory_usage.value/1024)
            if memory_usage.value > memory_limit:
                result['result'] = 3
                result['exception_message'] = "Error: 메모리초과"
            else:
                result['result'] = 1
    except Exception as e:
        result['exception_message'] = str(e)
    return result