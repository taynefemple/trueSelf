let newName;
let oldName;


chrome.runtime.sendMessage({ action: 'getSettings' }, (settings) => {
  newName = settings.newName;
  oldName = settings.oldName;
})

const walk = (node) => {

  // get settings first - this is happening last (async) --- ideas:
  // 1: set walk on timer, 2: event listener fires message before walk(),
  // 3. Figure out why async/await is not working....


  // This function is the bizness -- walks the dom and swaps
  // I stole this function from here:
  // http://is.gd/mwZp7E

  let child, next;

  if (node.nodeName.toLowerCase() === 'input' || node.nodeName.toLowerCase() === 'textarea') {
    return;
  }

  // TODO -- Default case?
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

  console.log('OLDNAME!!!!!', oldName)
  let regexp = new RegExp("\\b(" + oldName + ")\\b", "gi")
  console.log('REGEXOP!!!', regexp)

  trueName = trueName.replace(regexp, newName);
  console.log('TRUE NAME', trueName)

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
// walk(document.body);
window.addEventListener('load', delayWalk, false);


//  oldname is coming up as undefined.... the call for settings is not returned until after all the other logic here.
