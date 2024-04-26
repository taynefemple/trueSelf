const getSettings = async () => {
  const { settings } = await chrome.storage.sync.get(['settings']);
  return settings;
}

const walk = async (deadName, newName, node) => {
  // This function is the bizness -- walks the dom and swaps
  // I stole this function from here:
  // http://is.gd/mwZp7E

  let child;
  let next;

  if (node.nodeName.toLowerCase() === 'input' || node.nodeName.toLowerCase() === 'textarea') {
    return;
  }

  switch (node.nodeType) {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        await walk(deadName, newName, child);
        child = next;
      }
      break;

    case 3: // Text node
      handleText(deadName, newName, node);
      break;
  }
}

// where the magic happens...
const handleText = async (deadName, newName, textNode) => {
  let trueName = textNode.nodeValue;
  let regexp = new RegExp(`\\b(${deadName})\\b`, 'gi')

  trueName = trueName.replace(regexp, newName);
  textNode.nodeValue = trueName;
};

const getSettingsAndReplace = async (node) => {
  const { deadName, newName, enabled } = await getSettings();
  // if values are present service worker handles icon change
  await chrome.runtime.sendMessage({ action: 'showIcon', value: enabled });

  await walk(deadName.trim(), newName.trim(), node)
}

getSettingsAndReplace(document.body);
