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
    code = request.form['code'].replace('\r', '')
    #파이썬 코드 파일은 여기서 초기에 한번만 생성해놓는다.
    with open("test.py", "w", encoding="utf-8") as file:
        file.write(code)

    input_files = request.files.getlist('inputFiles')
    output_files = request.files.getlist('outputFiles')
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
        input_file_content = input_file.read().decode('utf-8').replace('\r', '')
        output_file_content = output_file.read().decode('utf-8').replace('\r', '')
        # Run the validation logic for each test case
        result = run_code_with_test_case(input_file_content, output_file_content)
        print(result)
        # Add the result for this test case to the response data
        test_case_data = {
            'inputFileName': input_file.filename,
            'inputFileContent': input_file_content,
            'outputFileName': output_file.filename,
            'outputFileContent': output_file_content,
            'result': result
        }
        response_data['testCases'].append(test_case_data)
    print("read end")
    return jsonify(response_data)

if __name__=="__main__":
  # host 등을 직접 지정하고 싶다면
  app.run(host="127.0.0.1", port="5000", debug=False)


