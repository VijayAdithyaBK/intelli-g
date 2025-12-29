function isJobCategory(text) {
  return (
    text.includes("job") ||
    text.includes("recruit") ||
    text.includes("application") ||
    text.includes("interview") ||
    text.includes("hiring") ||
    text.includes("career")
  );
}

function isTransactionCategory(text) {
  return (
    text.includes("transaction") ||
    text.includes("financial") ||
    text.includes("bank") ||
    text.includes("credit") ||
    text.includes("debit") ||
    text.includes("statement") ||
    text.includes("payment") ||
    text.includes("alert")
  );
}
