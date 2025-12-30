# 📧 Gmail to Sheets: The Intelligent Extractor

![platform](https://img.shields.io/badge/platform-Google%20Apps%20Script-4285F4?style=flat-square&logo=google)
![api](https://img.shields.io/badge/AI-Gemini_Flash-8E44AD?style=flat-square&logo=google-gemini)
![license](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![cost](https://img.shields.io/badge/cost-100%25%20Free-success?style=flat-square)

> **Turn your messy inbox into a structured database.** Automatically extract facts, dates, and action items from emails and log them into Google Sheets using the power of Google Gemini.

---

## 🚀 Why do I need this?

Let's face it: **Inbox search is terrible for facts.** 

Trying to find *"that invoice from last month"* or *"the deadline for the project"* usually involves endless scrolling and keyword guessing. This project solves that by turning your emails into **structured data rows**.

✨ **No more:**
- 🏷️ Managing complex filters or labels
- 🧠 Manually copying data to spreadsheets
- 💸 Paying for expensive SaaS integrations

Just simple, predictable, and **private** automation running right in your Google account.

---

## ⚡ What it does

This script lives in your Google Apps Script customized environment. Every 15 minutes, it wakes up and:

1.  🕵️‍♂️ **Scans** your Gmail for *brand new* emails only.
2.  🧠 **Reads** the content and sends it to **Gemini** (Google's AI).
3.  🎯 **Extracts** key facts: *Who? What? When? Decision?*
4.  📝 **Routes** the data into specific Google Sheets tabs:
    -   `JOBS` for career stuff 💼
    -   `TRANSACTIONS` for money stuff 💸
    -   `ALL` for everything else 🗂️

---

## 🛠️ Setup Guide (5 Minutes)

You don't need to be a coder. Just follow these steps!

### Prerequisities
- A Google Account (Personal or Workspace)
- A **Free** Gemini API Key

### Step 1: The Spreadsheet 📊

1.  Create a new **Google Sheet**.
2.  Rename the whole spreadsheet to sensible, e.g., `My Email Brain`.
3.  Create **three tabs** at the bottom with these exact names:
    -   `ALL`
    -   `JOBS`
    -   `TRANSACTIONS`
4.  Adding Headers: Copy-paste the following into **Row 1** of *all three tabs*:
    ```text
    Context / Category | Primary Subject | Key Identifiers | Entities Involved | Decision / Outcome | Reason Given | Required Action from Me | Deadline / Time Sensitivity | Reply Allowed | Source Type | Email Subject | From | Received Date | Gmail Message ID
    ```
5.  **Important:** Copy the `Spreadsheet ID` from your browser URL. It's the long gibberish string between `/d/` and `/edit`.

### Step 2: The Intelligence (API Key) 🧠

1.  Head over to [Google AI Studio](https://aistudio.google.com).
2.  Click **Get API key** (top left).
3.  Create a key for a new project.
4.  **Copy it.** (Don't share it!)

### Step 3: The Engine (Apps Script) ⚙️

1.  Go to [script.google.com](https://script.google.com) and click **New Project**.
2.  Name it something cool like `Inbox AI Agent`.
3.  You'll see a `Code.gs` file. You need to create **5 files** in total.
    -   Click the `+` icon next to "Files" -> "Script".
    -   Name them exactly as below and paste the code from this repo:
        -   `Code.gs` (Main logic)
        -   `gmail.gs` (Email fetching)
        -   `gemini.gs` (AI integration)
        -   `sheets.gs` (Spreadsheet operations)
        -   `classifier.gs` (Routing rules)

### Step 4: Configuration 🔧

1.  In the Apps Script editor, click the **Project Settings** (gear icon ⚙️) on the left sidebar.
2.  Scroll to **Script Properties**.
3.  Click **Add script property** for each of these:

| Property | Value |
| :--- | :--- |
| `GEMINI_API_KEY` | *[Paste your key from Step 2]* |
| `SHEET_ID` | *[Paste your Spreadsheet ID from Step 1]* |
| `LAST_RUN_TS` | `0` |

### Step 5: Liftoff! 🚀

1.  Go back to the Editor (`Code.gs`).
2.  Select `processNewEmails` from the dropdown menu in the toolbar.
3.  Click **Run**.
4.  **Authorize**: Google will ask for permission to read your mail and edit sheets. Since *you* wrote this script (technically), it's safe! Click "Advanced" -> "Go to project (unsafe)" to proceed.

*Check your Sheet! You should see your recent emails populated!* 🎉

### Step 6: Automate It ⏰

1.  Click the **Triggers** icon (alarm clock ⏰) on the left.
2.  **Add Trigger** (bottom right).
3.  Settings:
    -   Function: `processNewEmails`
    -   Event Source: `Time-driven`
    -   Type: `Minutes timer`
    -   Interval: `Every 15 minutes` (or whatever you prefer).
4.  Save.

> [!TIP]
> **Recommendation:** Set the interval to **1 hour**, **6 hours**, or **12 hours**.
>
> While you *can* run it every 15 minutes, we recommend a longer interval because:
> 1.  **Quota Safety:** Free Google accounts have a limited amount of script runtime per day. Running constantly can max this out.
> 2.  **Efficiency:** Batching executions ensures your "Inbox Brain" runs reliably without hitting API rate limits or unnecessary checks.

---

## 🤖 How It Works Under the Hood

### The Prompt
We use a structured prompt to tell Gemini: *"You are a data extractor. Don't summarize, just extract facts."*

### The Routing
Common logic handles where data goes based on the `Context / Category` determined by AI:

-   **Jobs**: Keywords like `recruit`, `interview`, `hiring`.
-   **Transactions**: Keywords like `payment`, `bank`, `invoice`.
-   **Everything**: Logged to `ALL` for safekeeping.

*Want to change this?* Edit `classifier.gs`! It's just simple Javascript.

---

## ❓ FAQ

**Q: Is this free?**
A: Yes! The Gemini Flash model has a generous free tier, and Apps Script is free for personal accounts.

**Q: Will it read my old emails?**
A: Only up to the timestamp of the "Last Run". The first time you run it, it might grab a batch of recent ones, but generally, it's designed for *forward* processing.

**Q: Is my data private?**
A: **Yes.** The script runs in *your* Google Cloud account. Data goes from *your* Gmail to *your* Sheet via *your* API key. No third-party servers involved.

---

## 🤝 Contributing

Got a better prompt? A smarter classifier? PRs are welcome! 

1.  Fork it 🍴
2.  Create your feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add some amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  <i>⚡ Crafted by Vijay Adithya B K</i>
</p>