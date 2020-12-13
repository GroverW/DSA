const fs = require('fs');

const getEarliestArrival = (startTime, busIds) => {
  let minBusId;
  let minWaitTime = Infinity;

  busIds.forEach((id) => {
    if (id === 'x') return;

    const minutesBeforestart = startTime % id;
    const waitTime = id - minutesBeforestart;
    if (waitTime < minWaitTime) {
      minBusId = id;
      minWaitTime = waitTime;
    }

  })

  return minWaitTime * minBusId;
}



const getOrderedArrival = (busIds) => {
  const arrivalMap = busIds.map((id, targetArrival) => {
    if (id === 'x') return false;;
    return [+id, targetArrival % id]
  }).filter((map) => map);

  const getLeastCommonMultiple = (large, small) => {
    let current = large;

    while (current % small) current += large;

    return current;
  }

  const [target] = arrivalMap.reduce((start, [id, arrival]) => {
    let [end, inc] = start
    let isFound = false;

    while (!isFound) {
      end += inc;
      const remainder = end % id;
      isFound = (!remainder && !arrival) || id - remainder === arrival;
    }

    inc = getLeastCommonMultiple(inc, id);

    return [end, inc];
  }, [0, 1])

  return target;
}

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const [arrival, buses] = data.split('\r\n');
  const busIds = buses.split(',')


  // console.log(arrival, busIds);
  console.log(getOrderedArrival(busIds));
});

/*
17,   1
x,    2
x,    3
x,    4
x,    5
x,    6
x,    7
41,   8
x,    9
x,    10
x,    11
x,    12
x,    13
x,    14
x,    15
x,    16
x,    17
643,  18
x,    19
x,    20
x,    21
x,    22
x,    23
x,    24
x,    25
23,   26
x,    27
x,    28
x,    29
x,    30
13,   31
x,    32
x,    33
x,    34
x,    35
x,    36
x,    37
x,    38
x,    39
x,    40
x,    41
x,    42
x,    43
x,    44
x,    45
x,    46
29,   47
x,    48
433,  49
x,    50
x,    51
x,    52
x,    53
x,    54
37,   55
x,    56
x,    57
x,    58
x,    59
x,    60
x,    61
x,    62
x,    63
x,    64
x,    65
x,    66
x,    67
19    68




17,   1     0
41,   8     1
643,  18    18
23,   26    3
13,   31    5
29,   47    18
433,  49    49
37,   55    18
19    68    11
*/