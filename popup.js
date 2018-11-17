let oldName;
let newName;
let submit;
let background;
let settings;

chrome.runtime.sendMessage({ action: 'getSettings' }, (res) => {
  settings = res
})

var loadHandler = () => {
  oldName = document.querySelector('.old-name');
  newName = document.querySelector('.new-name');
  submit = document.querySelector('.submit');
  background = chrome.extension.getBackgroundPage();
  console.log(background);

  newName.addEventListener('keyup', () => {
    updateHandler();
  }, false);
  newName.value = background.settings.newName;

  oldName.addEventListener('keyup', (event) => {
    updateHandler();
    console.log('OLD NAME EVENT', event, 'GIVEN NAME', settings.oldName);
  });
  oldName.value = background.settings.oldName;

  submit.addEventListener('click', () => {

    //also call browserAction.disable here. Also change enabled to false. build in conditional for enable or disable based on settings.enabled

    window.close()

  });
}

var updateHandler = () => {
  settings = {
    oldName: oldName.value,
    newName: newName.value,
    enabled: true
  };
  background.settings.oldName = settings.oldName;
  background.settings.newName = settings.newName;
  chrome.storage.sync.set(settings);
};



// make it stick

// init
document.addEventListener('DOMContentLoaded', loadHandler);

// this will be a browser action -- disable:
// chrome.browserAction.setIcon({ path: `icon-disabled-full-size.jpg` });
// settings.enabled = false
