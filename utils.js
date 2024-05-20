let envelopeIdCounter = 0;


const createElement = (elementType, queryArguments) => {    //creates a new element using the parameters given
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

const seedElements = (arr, type) => { //seeds two envelopes as the program starts
  if (type === 'envelopes') {
    arr.push(createElement('envelopes', {'name': 'gas', 'budget': '$100'}));
    arr.push(createElement('envelopes', {'name': 'house', 'budget': '$1000'}));
  }
  else{
    throw new Error(`seed type must be 'envelope'`);
  }
}

const getElementById = (id, elementList) => {
  return elementList.find((element) => {
    return element.id === Number(id);
  });
};

const getId = (id, elementList) => {  // searches for the ID
  return elementList.findIndex((element) => {
    return element.id === Number(id);
  });
};

const updateElement = (id, queryArguments, elementList) => {    //searches for the element by ID and updates the arguments inside
  const elementIndex = getId(id, elementList);
  if (elementIndex === -1) {
    throw new Error('updateElement must be called with a valid id parameter');
  }
  if (queryArguments.id) {
    queryArguments.id = Number(queryArguments.id);
  }
  Object.assign(elementList[elementIndex], queryArguments);
  return elementList[elementIndex];
};

function subCount(){          //function to decrease the ID counter after a DELETE is called
  envelopeIdCounter -= 1;
}
module.exports = {  //export all the modules
  createElement: createElement,
  seedElements: seedElements,  
  getElementById:getElementById,
  getId: getId,
  updateElement: updateElement,
  subCount
}