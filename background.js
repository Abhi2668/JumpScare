chrome.runtime.onStartup.addListener(() => {
    chrome.windows.create({url: "start.html", type: "popup", width: 100, height: 100});
});
