export function checkParent(child, selector) {
  if (child.closest(selector) === null) {
    return false;
  }
  return true;
}

export function sortByOrder(a, b) {
  const sort_order = {
    2: 10,
    3: 20,
    4: 30,
    5: 40,
    6: 50,
    7: 60,
    8: 70,
    9: 80,
    10: 90,
    В: 100,
    Д: 200,
    К: 300,
    Т: 400,
  };
  return sort_order[a.value] - sort_order[b.value];
}
