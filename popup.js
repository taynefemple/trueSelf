let oldName;
let newName;
let submit;
let background;
let settings;
let close;

const refresh = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.reload(tabs[0].id);
  });
}

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

const showIcon = (bool) => {
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
        128: 'images/disabledIcon.png'
      }
    });
  }
};

const onInputHandler = (bool) => {
  if (!bool) {
    oldName.value = '';
    newName.value = '';
  }

  if (!oldName.value || !newName.value) {
    submit.checked = false;
  } else {
    submit.checked = bool;
  }
  showIcon(bool);
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

  submit.addEventListener('click', () => {
    if (oldName.value && newName.value) {
      refresh();
    }
    onInputHandler(!!submit.checked);
  });
  submit.checked = background.settings.enabled;

  close.addEventListener('click', () => {
    window.close();
    refresh();
  })
}

// init
document.addEventListener('DOMContentLoaded', loadHandler);
