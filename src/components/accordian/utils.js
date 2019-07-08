export const arrayify = obj => [].concat(obj);

export const getActiveItem = children => {
  let activeItem = [];

  arrayify(children)
    .filter(el => el)
    .forEach((children, index) => {
      if (!children.props.disabled && children.props.expanded) {
        activeItem.push(index);
      }
    });

  return activeItem;
};

export const isSame = (array1, array2) =>
  array1.length === array2.length &&
  array1.every((element, index) => element === array2[index]);
