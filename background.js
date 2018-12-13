
var settings = {
  oldName: '',
  newName: '',
  enabled: false
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getSettings') {
    sendResponse(settings);
  }
});

chrome.storage.sync.get(settings, (res) => {
  if (res.oldName) {
    settings.oldName = res.oldName;
  }
  if (res.newName) {
    settings.newName = res.newName;
  }
});
