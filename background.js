
var settings = {
  oldName: '',
  newName: '',
  enabled: true
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getSettings') {
    sendResponse(settings);
  }
});

chrome.storage.sync.get(settings, (result) => {
  if (result.oldName) {
    settings.oldName = result.oldName;
  }
  if (result.newName) {
    settings.newName = result.newName;
  }
});
