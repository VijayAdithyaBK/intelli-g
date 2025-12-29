function processNewEmails() {
  const props = PropertiesService.getScriptProperties();
  const lastRun = Number(props.getProperty("LAST_RUN_TS") || 0);
  const now = Date.now();

  const messages = fetchNewMessages(lastRun);
  if (messages.length === 0) {
    props.setProperty("LAST_RUN_TS", String(now));
    return;
  }

  const sheets = getSheets();

  messages.forEach(msg => {
    const body = sanitize(msg.getPlainBody());
    if (!body) return;

    const extracted = runGemini(body);
    if (!extracted) return;

    const parsed = parseGeminiOutput(extracted);
    const row = buildRow(parsed, msg);

    // Always append to ALL
    sheets.ALL.appendRow(row);

    const categoryText = (parsed["Context / Category"] || "").toLowerCase();

    if (isJobCategory(categoryText)) {
      sheets.JOBS.appendRow(row);
    }

    if (isTransactionCategory(categoryText)) {
      sheets.TRANSACTIONS.appendRow(row);
    }
  });

  props.setProperty("LAST_RUN_TS", String(now));
}
