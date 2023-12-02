const conversionButton = document.getElementById('conversion');
const resultDivided = document.getElementById('result-area');

// ボタンが押されたら計算結果を出力する
conversionButton.onclick = () => {
  const calendarInput = document.getElementById('calendar');
  let val = parseInt(calendarInput.value);
  // 入力欄が空欄、または指定されていない値を入力するとアラート
  if (document.seireki.calendar.value == "" || (val < 1926 || val > 2030)) {
    alert('1926～2030までの数字で入力して下さい');
    return false;
  } else {
    let answer = 0;
    resultDivided.innerText = '';
    const header = document.createElement('h2');
    resultDivided.appendChild(header);
    if (val <= 1988) {
      answer = val - 1925;
      header.innerText = `昭和${answer}年です`;
    } else if (val < 2018) {
      answer = val - 1988;
      header.innerText = `平成${answer}年です`;
    } else {
      answer = val - 2018;
      header.innerText = `令和${answer}年です`;
    }
  }
}