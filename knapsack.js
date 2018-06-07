const fs = require('fs');
const argv = process.argv.slice(2);



if (argv.length != 2) {
  console.error("usage: filename capacity");
  process.exit(1);
}

const filename = argv[0];
const capacity = parseInt(argv[1]);

// Read the file
const fileData = fs.readFileSync(filename, "utf8");
// Split the fileData on each new line
const lines = fileData.trim().split(/[\r\n]+/g);

// Process the lines
const items = [];

for (let l of lines) {
  //console.log(lines);
  const [index, size, value] = l.split(" ").map(n => parseInt(n));

  items.push({
    index: index,
    size: size,
    value: value,
  });
}

////////////////////////////////////////

greedyAlo = (items, capacity) => {

  const result = {
    size: 0,
    value: 0,
    chosen: [],
  };
  // console.log(items);

  // items = items.filter(item => item.size < capacity);
  items.sort((item1, item2) => {
    const x = item1.value / item1.size;
    const y = item2.value / item2.size;

    return y - x;
  });
  // console.log(items);

  for (let i = 0; i < items.length; i++) {
    if (items[i].size <= capacity) {
      // if it is, add it to our final result
      result.size += items[i].size;
      result.value += items[i].value;
      result.chosen.push(items[i].index);
      // don't forget to decrement our total capacity
      capacity -= items[i].size;
    }
  }
  console.log(result);
  return result;

}
greedyAlo(items, capacity);

//////////////////////////////////////
function naiveKnapsack(items, capacity) {
  function recurse(i, size) { // i = single index , size of single item ( we can call it the initial and remaining size)
    // console.log('size', size); // size is the capacity 
    //  console.log('i', i) // i is the highest index of the items 
    // base case
    if (i === -1) { // 
      return { // an empty result object that will receive the result 
        value: 0,
        size: 0,
        chosen: [],
      };
    }


    // check to see if the item fits
    else if (items[i].size > size) {// size is the remaining size , the item size is bigger cant fit 

      return recurse(i - 1, size); // we are calling the next item to send it in the recurs()
    }
    // Item fits, but might not be worth as much as items in there already
    else {
      const r0 = recurse(i - 1, size); // is running only 1 time
      console.log('r0', r0);
      const r1 = recurse(i - 1, size - items[i].size); // keep checking .....untill the end 
      console.log('r0', r1);
      r1.value += items[i].value;

      if (r0.value > r1.value) {
        return r0;
      } else {
        r1.size += items[i].size;
        r1.chosen = r1.chosen.concat(i + 1);
        return r1;
      }
    }
  }
  console.log(recurse(items.length - 1, capacity));
  return recurse(items.length - 1, capacity);
}
naiveKnapsack(items, capacity);
