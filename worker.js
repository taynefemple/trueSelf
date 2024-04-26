// // // snippet from https://developer.chrome.com/docs/extensions/reference/api/offscreen

// // let creating; // A global promise to avoid concurrency issues
// // async function setupOffscreenDocument(path) {
// //   // Check all windows controlled by the service worker to see if one
// //   // of them is the offscreen document with the given path
// //   const offscreenUrl = chrome.runtime.getURL(path);
// //   const existingContexts = await chrome.runtime.getContexts({
// //     contextTypes: ['OFFSCREEN_DOCUMENT'],
// //     documentUrls: [offscreenUrl]
// //   });

// //   if (existingContexts.length > 0) {
// //     return;
// //   }

// //   // create offscreen document
// //   if (creating) {
// //     await creating;
// //   } else {
// //     creating = chrome.offscreen.createDocument({
// //       url: path,
// //       reasons: ['LOCAL_STORAGE'],
// //       justification: 'Store name settings solely for use in True Self extension',
// //     });
// //     await creating;
// //     creating = null;
// //   }
// // }

// // // end snippet

// // // allow for persistence in config
// // // i.e. if config.persistence = true then save to service worker.
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

chrome.runtime.onMessage.addListener(async (message) => {
  console.log(message.value)
  if (message.action === 'showIcon') { showIcon(message.value) }
})


// //   switch (message.action) {
// //     case 'getSettings':
// //       await setupOffscreenDocument('offscreen.html');
// //       console.log("received get setting message, relaying to offscreen doc");

// //       await chrome.runtime.sendMessage({ action: 'getSettings' });

// //       console.log('Names retrieved from storage');
// //     case 'setSettings':
// //       await setupOffscreenDocument('offscreen.html');

// //       await chrome.runtime.sendMessage({ action: 'setSettings' }); // this goes to offscreen, just relay the message here
// //       console.log("Names sent to offscreen");
// //       // chrome.storage.sync.get('settings', settings => {
// //       //   if (settings != null) {
// //       //     console.log(`HAPPY PATH: ${JSON.stringify(settings)}`)
// //       //     sendResponse(settings)
// //       //   } else {
// //       //     sendResponse({
// //       //       deadName: '',
// //       //       newName: '',
// //       //       enabled: false
// //       //     })
// //       //   }
// //       // }) // this get also moves to offscreen, just relay the message here
// //   }
// // });






// // chrome.storage.sync.get(settings, (res) => {
// //   if (res.deadName) {
// //     settings.deadName = res.deadName;
// //   }
// //   if (res.newName) {
// //     settings.newName = res.newName;
// //   }
// // });

// // chrome.runtime.onMessage.addListener(({ type, name }) => {
// //   if (type === "set-name") {
// //     chrome.storage.local.set({ name });
// //   }
// // });

// // chrome.action.onClicked.addListener(async (tab) => {
// //   const { name } = await chrome.storage.local.get(["name"]);
// //   chrome.tabs.sendMessage(tab.id, { name });
// // });

// // var settings = {
// //   deadName: '',
// //   newName: '',
// //   enabled: false
// // };
