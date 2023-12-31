(function () {
  if (window.hasRun) {
    return;
  }

  window.hasRun = true;

  function getHistory(isTxt) {
    let date = document.getElementsByClassName("mb-4 text-center text-sm")[0].innerHTML;
    let items = document.getElementsByClassName(
      "rounded-lg border border-slate-dark bg-black-a px-3 py-2 text-center"
    );
    let text = getHistoryValues(items);

    if (isTxt) {
      saveText(`${date}.txt`, text);
    } else {
      saveDocument(`${date}.doc`, text);
    }
  }

  function getHistoryValues(items) {
    let text = "";

    for (i = items.length; i--; ) {
      let item = items[i].getElementsByClassName("mb-1")[0].alt;

      if (item === "bonus") {
        item = "d";
      }

      text += item + " ";
    }

    return text;
  }

  function getPattern() {
    let patternDiv = document.getElementsByClassName("relative flex h-24")[0];
    let items = patternDiv.getElementsByClassName("previous-rolls-item");
    let text = getPatternValues(items);

    navigator.clipboard.writeText(text);
  }

  function getPatternValues(items) {
    let text = " ";

    for (i = 0; i < items.length; i++) {
      let item = items[i].children[0].className;

      if (item.includes("coin-ct")) {
        text += "ct";
      } else if (item.includes("coin-t")) {
        text += "t";
      } else if (item.includes("coin-bonus")) {
        text += "d";
      }

      text += " ";
    }

    return text;
  }

  function saveText(filename, text) {
    let link = document.createElement("a");

    link.setAttribute("download", filename);
    link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    link.click();
  }

  function saveDocument(filename, text) {
    let link = document.createElement("a");

    link.setAttribute("download", filename);
    link.setAttribute(
      "href",
      "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(text)
    );
    link.click();
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "getHistoryText") {
      getHistory(true);
    } else if (message.command === "getHistoryWord") {
      getHistory(false);
    } else if (message.command === "getPattern") {
      getPattern();
    }
  });
})();
