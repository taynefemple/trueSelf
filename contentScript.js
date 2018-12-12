let newName;
let oldName;

chrome.runtime.sendMessage({ action: 'getSettings' }, (settings) => {
  newName = settings.newName;
  oldName = settings.oldName;
})

const walk = (node) => {
  // This function is the bizness -- walks the dom and swaps
  // I stole this function from here:
  // http://is.gd/mwZp7E

  let child, next;

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
        walk(child);
        child = next;
      }
      break;

    case 3: // Text node
      handleText(node);
      break;
  }
}

// where the magic happens...
const handleText = (textNode) => {
  let trueName = textNode.nodeValue;
  let regexp = new RegExp(`\\b(${oldName})\\b`, 'gi')

  trueName = trueName.replace(regexp, newName);
  textNode.nodeValue = trueName;
};

const delayWalk = () => {
  const waitOnSettings = () => {
    if (oldName && newName) {
      clearInterval(jsInitChecktimer);
      walk(document.body);
    }
  }
  const jsInitChecktimer = setInterval(waitOnSettings, 0);
}

window.addEventListener('load', delayWalk, false);
