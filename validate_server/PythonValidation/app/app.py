# app.py
from flask import Flask, render_template, request, jsonify
# 채점 프로그램 import
from validate import run_code_with_test_case, read_file_contents

#Flask 객체 인스턴스 생성
app = Flask(__name__)

@app.route('/') # 접속하는 url
def index():
  return render_template('index.html')

@app.route('/evaluate', methods=['POST'])
def evaluate_code():
    code = request.form['code']
    input_file = request.files['inputFile']
    output_file = request.files['outputFile']
    input_file_content = input_file.read().decode('utf-8').replace('\r', '')
    # 개행 문자를 기준으로 문자열을 나누어 리스트로 저장
    output_file_content = output_file.read().decode('utf-8').replace('\r', '')

    # 여기에 실제 채점 로직을 구현하고 결과를 계산합니다.
    # 현재는 간단히 코드와 파일 내용을 출력하는 예시를 제공합니다.
    # print('Code:')
    # print(code)
    print('Input File Name:', input_file.filename)
    print('Input File Content:')
    print(input_file_content)
    print('Output File Name:', output_file.filename)
    print('Output File Content:')
    print(output_file_content)
    result=run_code_with_test_case(code,input_file_content,output_file_content)
    print(result)
    response_data = {
        'message': 'Code evaluation completed.',  # 채점이 완료되었다는 메시지를 전송할 수도 있습니다.
        'code': code,
        'inputFileName': input_file.filename,
        'inputFileContent': input_file_content,
        'outputFileName': output_file.filename,
        'outputFileContent': output_file_content
    }
    return jsonify(response_data)

if __name__=="__main__":
  # host 등을 직접 지정하고 싶다면
  app.run(host="127.0.0.1", port="5000", debug=True)


