let envelopeIdCounter = 0;


const createElement = (elementType, queryArguments) => {
  if (queryArguments.hasOwnProperty('name') &&
      queryArguments.hasOwnProperty('budget')) {
    let currentId;
    envelopeIdCounter += 1;
    currentId = envelopeIdCounter;
    return {
      'id':    currentId,
      'name':  queryArguments.name,
      'budget': queryArguments.budget,
    };
  } else {
    return false;
  }
};

module.exports = {
  createElement: createElement
}