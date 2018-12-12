let oldName;
let newName;
let submit;
let background;
let settings;
let close;

// is this necessary?
chrome.runtime.sendMessage({ action: 'getSettings' }, (res) => {
  settings = res;
});

const updateHandler = () => {
  settings = {
    oldName: oldName.value,
    newName: newName.value,
    enabled: !!submit.checked
  };
  background.settings.oldName = settings.oldName;
  background.settings.newName = settings.newName;
  background.settings.enabled = settings.enabled;
  chrome.storage.sync.set(settings);
};

const onInputHandler = (bool) => {
  submit.checked = bool;
  if (bool) {
    chrome.browserAction.setIcon({
      path: {
        16: 'images/flagSmall.png',
        48: 'images/flagMedium.png',
        128: 'images/flagLarge.png'
      }
    });
  } else {
    chrome.browserAction.setIcon({
      path: {
        128: 'disabledIcon.png'
      }
    });
    oldName.value = '';
    newName.value = '';
  }
  updateHandler();
};

const loadHandler = () => {
  oldName = document.querySelector('.old-name');
  newName = document.querySelector('.new-name');
  submit = document.querySelector('.submit');
  close = document.querySelector('.close');
  background = chrome.extension.getBackgroundPage();


  newName.addEventListener('keyup', () => onInputHandler(true), false);
  newName.value = background.settings.newName;

  oldName.addEventListener('keyup', () => onInputHandler(true), false);
  oldName.value = background.settings.oldName;

  submit.addEventListener('click', () => onInputHandler(!!submit.checked));
  submit.checked = background.settings.enabled;

  close.addEventListener('click', () => window.close());
}

// init
document.addEventListener('DOMContentLoaded', loadHandler);

// this will be a browser action -- disable:
// chrome.browserAction.setIcon({ path: `icon-disabled-full-size.jpg` });
// settings.enabled = false
