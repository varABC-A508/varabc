# app.py
from flask import Flask, render_template, request, jsonify
# 채점 프로그램 import
from validate import run_code_with_test_case

#Flask 객체 인스턴스 생성
app = Flask(__name__)

@app.route('/') # 접속하는 url
def index():
  return render_template('index.html')

@app.route('/validationpy', methods=['POST'])
def validate_py():
    response_data = evaluate_code()
    #위의 결과를 스프링서버로 재전송해야함
    return


@app.route('/evaluatepy', methods=['POST'])
def evaluate_code():
    data = request.get_json()
    code = data['code'].replace('\r', '')
    #파이썬 코드 파일은 여기서 초기에 한번만 생성해놓는다.
    with open("test.py", "w", encoding="utf-8") as file:
        file.write("# test.py\n")
        file.write("# -*- coding: utf-8 -*-\n")
        file.write(code)

    input_files = data['inputFiles']
    output_files = data['outputFiles']
    time_limit = int(data['timeLimit'])
    memory_limit = int(data['memoryLimit'])

    result = {'result': '', 'execution_time': 0.0, 'memory_usage': 0, 'exception_message': ''}
    response_data={
        'result': '',
        'executionTime': 0.0,
        'memoryUsage': '',
        'exceptionMessage': ''
    }
    results=[]
    # Check if the number of input files matches the number of output files
    if len(input_files) != len(output_files):
        response_data['result'] = 'Failed'
        response_data['exceptionMessage'] = 'Number of input files does not match number of output files.'
        return jsonify(result)

    for input_file, output_file in zip(input_files, output_files):
        input_file_content = input_file['content'].replace('\r', '')
        output_file_content = output_file['content'].replace('\r', '')
        # 채점 프로그램 돌려부러
        temp_result = run_code_with_test_case(input_file_content, output_file_content, time_limit, memory_limit)
        print(temp_result)
        #테케 결과가 pass가 아닌 결과가 있으면 실행을 중지하고 즉시 fail과 그 이유를 반환한다
        if temp_result['result']!='Passed':
            response_data['result'] = temp_result['result']
            response_data['exceptionMessage']=temp_result['exception_message']
            return jsonify(response_data)
        results.append(temp_result)

    #테케중에 가장 큰 실행시간과 가장 큰 메모리 사용량을 반환하도록 한다.
    max_execution_time=0
    max_memory=0
    for i in results:
        for j in i:
            max_execution_time=max(max_execution_time,i['execution_time'])
            max_memory=max(max_memory,i['memory_usage'])

    response_data['result']="Passed"
    response_data['executionTime']=max_execution_time
    response_data['memoryUsage']=f"{max_memory:} bytes"
    print(response_data)
    return jsonify(response_data)

if __name__=="__main__":
  # host 등을 직접 지정하고 싶다면
  app.run(host="127.0.0.1", port="5000", debug=False)
