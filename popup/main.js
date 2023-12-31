function listenForClicks() {
  document.addEventListener("click", (e) => {
    function getHistoryText(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "getHistoryText",
      });
    }

    function getHistoryWord(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "getHistoryWord",
      });
    }

    function getPattern(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "getPattern",
      });
    }

    function reportError() {
      console.log("Unexpected error");
    }

    if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
      return;
    }

    if (e.target.id === "getHistoryText") {
      browser.tabs.query({ active: true, currentWindow: true }).then(getHistoryText, reportError);
    } else if (e.target.id === "getHistoryWord") {
      browser.tabs.query({ active: true, currentWindow: true }).then(getHistoryWord, reportError);
    } else if (e.target.id === "getPattern") {
      browser.tabs.query({ active: true, currentWindow: true }).then(getPattern, reportError);
    }
  });
}

browser.tabs.executeScript({ file: "/content_scripts/script.js" }).then(listenForClicks);
