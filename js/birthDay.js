const myBirthTime = new Date('1999-09-14 13:40');
function updateParagraph() {
  const now = new Date();
  const seconds = (now.getTime() - myBirthTime.getTime()) / 1000;
  document.getElementById('birthTime').innerText = 
  `生まれてから${seconds}秒経過...`;
}
setInterval(updateParagraph, 1000)