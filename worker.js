const showIcon = (showIcon) => {
  if (showIcon) {
    chrome.action.setIcon({
      path: {
        16: 'images/flagSmall.png',
        48: 'images/flagMedium.png',
        128: 'images/flagLarge.png'
      }
    });
  } else {
    chrome.action.setIcon({
      path: {
        128: 'images/disabledIcon.png'
      }
    });
  }
};

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'showIcon') { showIcon(message.value) }
})
