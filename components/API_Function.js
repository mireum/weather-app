// API를 받을 때 시간을 정해주는 함수
const getDate = () => {
  const day = new Date();
  let nowTime = String(day.getHours())+String(day.getMinutes()).padStart(2, '0');
  nowTime = Number(nowTime);
  let standTime;
  if (nowTime > 2310) {standTime = '2300'}
  else if (nowTime > 2010) {standTime = '2000'}
  else if (nowTime > 1710) {standTime = '1700'}
  else if (nowTime > 1410) {standTime = '1400'}
  else if (nowTime > 1110) {standTime = '1100'}
  else if (nowTime > 810) {standTime = '0800'}
  else if (nowTime > 510) {standTime = '0500'}
  else {standTime = '0200'}
  
  return standTime;
}

module.exports = {
    getDate
};