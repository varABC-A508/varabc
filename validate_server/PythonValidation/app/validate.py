import multiprocessing
import subprocess

def run_subprocess(queue, input_content):
    process = subprocess.Popen(["python", "test.py"], stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
    output, _ = process.communicate(input=input_content)
    queue.put(output.strip())

def run_code_with_test_case(input_content, output_content):
    expected_output = output_content.strip()
    # Create Queue and Process
    queue = multiprocessing.Queue()
    process = multiprocessing.Process(target=run_subprocess, args=(queue, input_content))

    # Start the process
    process.start()

    # Wait for 4 seconds or until process finishes
    process.join(timeout=4)

    # If thread is still active
    if process.is_alive():
        print("Test case takes too long to complete. Killing...")
        process.terminate()
        process.join()
        return "Error: 시간초과"
    else:
        output = queue.get()
        print(output)
        return "Passed" if output == expected_output else "Failed"