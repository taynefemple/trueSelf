
walk(document.body);

function walk(node) {
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
function handleText(textNode, newName) {
  let trueName = textNode.nodeValue;

  // newNameLower = settings.newName.toLowerCase();
  // newNameUpper = settings.newName.toUpperCase();

  trueName = trueName.replace(/\bRuby\b/g, "R.J.");
  trueName = trueName.replace(/\bruby\b/g, "R.J.");
  trueName = trueName.replace(/\bRUBY\b/g, "R.J.");

  textNode.nodeValue = trueName;
}
