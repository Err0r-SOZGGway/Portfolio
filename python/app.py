from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/orderResult', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        code = request.form.get('code', '');
        complexity = analyze_complexity(code)
        return render_template('orderResult.html', complexity = complexity, code = code)
    return render_template('orderForm.html')

# 計算量解析のシンプルな関数
def analyze_complexity(code):
    # for、whileの計算量を出力する
    if 'for' in code:
        return "O(n)"
    elif 'while' in code:
        return "O(n^2)"
    return "O(1)"

if __name__ == '__main__':
    app.run(debug=True)
