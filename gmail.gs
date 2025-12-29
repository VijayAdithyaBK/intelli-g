function fetchNewMessages(lastRunTs) {
  const afterSeconds = Math.floor(lastRunTs / 1000);
  const query = afterSeconds > 0
    ? `in:inbox after:${afterSeconds}`
    : "in:inbox";

  const threads = GmailApp.search(query, 0, 50);
  const messages = [];

  threads.forEach(thread => {
    thread.getMessages().forEach(msg => {
      if (msg.getDate().getTime() > lastRunTs) {
        messages.push(msg);
      }
    });
  });

  return messages;
}

function sanitize(text) {
  if (!text) return "";
  return text.replace(/\n{3,}/g, "\n\n").slice(0, 12000);
}
