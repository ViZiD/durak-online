export function checkParent(child, selector) {
  if (child.closest(selector) === null) {
    return false;
  }
  return true;
}
