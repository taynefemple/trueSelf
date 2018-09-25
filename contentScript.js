walk(document.body);

function walk(node) {
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

function handleText(textNode) {
  let deadName = textNode.nodeValue;

  deadName = deadName.replace(/\bRuby\b/g, "R.J.");
  deadName = deadName.replace(/\bruby\b/g, "R.J.");
  deadName = deadName.replace(/\bRUBY\b/g, "R.J.");

  textNode.nodeValue = deadName;
}

