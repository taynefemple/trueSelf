let deadName;
let newName;
let submit;
let settings;
let close;

const refresh = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.reload(tabs[0].id);
  });
}

const getSettingsFromStorage = async () => {
  const { settings } = await chrome.storage.sync.get(['settings'])
  newName.value = settings?.newName || '';
  deadName.value = settings?.deadName || '';
  submit.checked = settings?.enabled || false;
}

const updateHandler = async () => {
  settings = {
    deadName: deadName.value,
    newName: newName.value,
    enabled: submit.checked
  };
  await chrome.storage.sync.set({settings})
};

const onInputHandler = async (isChecked) => {
  // clear fields if slider is deactivated
  if (!isChecked) {
    deadName.value = '';
    newName.value = '';
  }
  // automatically turn on slider if fields are populated
  if (!deadName.value || !newName.value) {
    submit.checked = false;
  } else {
    submit.checked = true;
  }

  // service worker handles icon changes for popup and contentScript
  await chrome.runtime.sendMessage({ action: 'showIcon', value: submit.checked });

  await updateHandler();
};

const loadHandler = async () => {
  deadName = document.querySelector('.dead-name');
  newName = document.querySelector('.new-name');
  submit = document.querySelector('.submit');
  close = document.querySelector('.close');

  // now that variables are set, pull in values from storage and assign to elements
  await getSettingsFromStorage();

  newName.addEventListener('keyup', () => onInputHandler(true), false);
  deadName.addEventListener('keyup', () => onInputHandler(true), false);
  submit.addEventListener('click', async () => {
    await onInputHandler(!!submit.checked);
    refresh();
  });

  const closeAndApplyChanges = () => {
    window.close();
    refresh();
  }

  close.addEventListener('click', () => {
    closeAndApplyChanges();
  })

  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Enter') {
      closeAndApplyChanges();
    }
  })
}

// init
document.addEventListener('DOMContentLoaded', loadHandler);
