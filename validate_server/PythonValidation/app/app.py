# app.py
from flask import Flask, render_template, request, jsonify
# 채점 프로그램 import
from validate import run_code_with_test_case

#Flask 객체 인스턴스 생성
app = Flask(__name__)

@app.route('/') # 접속하는 url
def index():
  return render_template('index.html')

@app.route('/evaluate', methods=['POST'])
def evaluate_code():
    data = request.get_json()
    code = data['code'].replace('\r', '')
    #파이썬 코드 파일은 여기서 초기에 한번만 생성해놓는다.
    with open("test.py", "w", encoding="utf-8") as file:
        file.write(code)

    input_files = data['inputFiles']
    output_files = data['outputFiles']
    time_limit = int(data['timeLimit'])
    memory_limit = int(data['memoryLimit'])

    response_data = {
        'message': 'Code evaluation completed.',
        'code': code,
        'testCases': []
    }

    # Check if the number of input files matches the number of output files
    if len(input_files) != len(output_files):
        response_data['message'] = 'Number of input files does not match number of output files.'
        return jsonify(response_data)

    for input_file, output_file in zip(input_files, output_files):
        input_file_content = input_file['content'].replace('\r', '')
        output_file_content = output_file['content'].replace('\r', '')
        # 채점 프로그램 돌려부러
        result = run_code_with_test_case(input_file_content, output_file_content, time_limit, memory_limit)
        # response data에 결과 삽입
        test_case_data = {
            'inputFileName': input_file['name'],
            'inputFileContent': input_file_content,
            'outputFileName': output_file['name'],
            'outputFileContent': output_file_content,
            'result': result
        }
        print(result)
        response_data['testCases'].append(test_case_data)

    return jsonify(result)

if __name__=="__main__":
  # host 등을 직접 지정하고 싶다면
  app.run(host="127.0.0.1", port="5000", debug=False)
