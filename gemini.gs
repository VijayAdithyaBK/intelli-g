function runGemini(emailText) {
  const apiKey = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");

  const url =
    "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
    apiKey;

  const prompt = `
You are processing emails for automation.
Output must be machine-safe and consistent.

Read the email and extract only clear, factual information.

Use this structure exactly:

* Context / Category:
* Primary Subject:
* Key Identifiers:
* Entities Involved:
* Decision / Outcome:
* Reason Given:
* Required Action from Me:
* Deadline / Time Sensitivity:
* Reply Allowed:
* Source Type:

Rules:
* If a field is not mentioned, write "Not stated".
* Use bullet points only.
* No interpretation.

Email:
"""${emailText}"""
`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  const res = UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  if (res.getResponseCode() !== 200) return null;

  const json = JSON.parse(res.getContentText());
  return json?.candidates?.[0]?.content?.parts?.[0]?.text || null;
}

function parseGeminiOutput(text) {
  const data = {};
  text.split("\n").forEach(line => {
    const match = line.match(/^\*\s*(.+?):\s*(.*)$/);
    if (match) data[match[1].trim()] = match[2].trim();
  });
  return data;
}
