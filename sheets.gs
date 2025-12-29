function getSheets() {
  const sheetId = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
  const ss = SpreadsheetApp.openById(sheetId);

  return {
    ALL: ss.getSheetByName("ALL"),
    JOBS: ss.getSheetByName("JOBS"),
    TRANSACTIONS: ss.getSheetByName("TRANSACTIONS")
  };
}

function buildRow(data, msg) {
  return [
    data["Context / Category"] || "Not stated",
    data["Primary Subject"] || "Not stated",
    data["Key Identifiers"] || "Not stated",
    data["Entities Involved"] || "Not stated",
    data["Decision / Outcome"] || "Not stated",
    data["Reason Given"] || "Not stated",
    data["Required Action from Me"] || "Not stated",
    data["Deadline / Time Sensitivity"] || "Not stated",
    data["Reply Allowed"] || "Not stated",
    data["Source Type"] || "Not stated",
    msg.getSubject(),
    msg.getFrom(),
    msg.getDate(),
    msg.getId()
  ];
}
