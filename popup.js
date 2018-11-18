let oldName;
let newName;
let submit;
let background;
let settings;
let close;

chrome.runtime.sendMessage({ action: 'getSettings' }, (res) => {
  settings = res
})

const loadHandler = () => {
  oldName = document.querySelector('.old-name');
  newName = document.querySelector('.new-name');
  submit = document.querySelector('.submit');
  close = document.querySelector('.close');
  background = chrome.extension.getBackgroundPage();

  newName.addEventListener('keyup', () => {
    updateHandler();
  }, false);
  newName.value = background.settings.newName;

  oldName.addEventListener('keyup', (event) => {
    updateHandler();
    console.log('OLD NAME EVENT', event, 'GIVEN NAME', settings.oldName);
  });
  oldName.value = background.settings.oldName;
  submit.checked = background.settings.enabled;

  submit.addEventListener('click', () => {
    if (!submit.checked) {
      chrome.browserAction.setIcon({
        path: {
          128: 'disabledIcon.png'
        }
      });
      submit.checked = false;
      background.settings.enabled = false;
      background.settings.oldName = '';
      background.settings.newName = '';
    }
    else {
      chrome.browserAction.setIcon({
        path: {
          16: 'images/flagSmall.png',
          48: 'images/flagMedium.png',
          128: 'images/flagLarge.png'
        }
      });
      submit.checked = true;
      background.settings.enabled = true;
    }
  });

  close.addEventListener('click', () => window.close());
}

const updateHandler = () => {
  settings = {
    oldName: oldName.value,
    newName: newName.value,
    enabled: true
  };
  background.settings.oldName = settings.oldName;
  background.settings.newName = settings.newName;
  chrome.storage.sync.set(settings);
};

// init
document.addEventListener('DOMContentLoaded', loadHandler);

// this will be a browser action -- disable:
// chrome.browserAction.setIcon({ path: `icon-disabled-full-size.jpg` });
// settings.enabled = false
