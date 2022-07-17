/* 트윗 상세 페이지에서는 1시간 미만일 경우 몇분전 + 년 월 일 표시  1시간이상일 경우 오후 1시 + 년 월 일
트윗 목록에서는 
당일엔
1시간 미만 : 몇분전
1시간 이상 : 몇시간 전
24시간 이상: 월 일 
1년이상 : 년 월 일*/

export default function twitterDate(
  date: any,
  kind: "list" | "detail" | "join"
) {
  if (!date) return;
  const tweetTime = new Date(`${date}`);
  const now = new Date();
  const tweetTimeNum = tweetTime.getTime();
  const nowTimeNum = now.getTime();
  const diff = nowTimeNum - tweetTimeNum;
  if (kind === "list") {
    if (now.getFullYear() > tweetTime.getFullYear()) {
      return (
        tweetTime.getFullYear() +
        "년 " +
        (tweetTime.getMonth() + 1) +
        "월 " +
        tweetTime.getDate() +
        "일 "
      );
    } else if (diff >= 86400000) {
      return tweetTime.getMonth() + 1 + "월 " + tweetTime.getDate() + "일 ";
    } else if (diff >= 3600000) {
      return Math.floor(diff / 3600000) + "시간 ";
    } else if (diff >= 60000) {
      return Math.floor(diff / 60000) + "분 ";
    } else {
      return "방금 전";
    }
  }
  if (kind === "detail") {
    return (
      (tweetTime.getHours() > 11 ? "오후 " : "오전 ") +
      (tweetTime.getHours() % 12 === 0 ? 12 : tweetTime.getHours() % 12) +
      ":" +
      (tweetTime.getMinutes() < 10
        ? "0" + tweetTime.getMinutes()
        : tweetTime.getMinutes()) +
      " · " +
      tweetTime.getFullYear() +
      "년 " +
      (tweetTime.getMonth() + 1) +
      "월 " +
      tweetTime.getDate() +
      "일 "
    );
  }
  if (kind === "join") {
    return (
      tweetTime.getFullYear() +
      "년 " +
      (tweetTime.getMonth() + 1) +
      "월 " +
      tweetTime.getDate() +
      "일 "
    );
  }
}
