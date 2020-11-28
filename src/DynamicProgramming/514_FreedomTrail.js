/*
In the video game Fallout 4, the quest "Road to Freedom" requires players to reach a metal dial called the "Freedom Trail Ring", and use the dial to spell a specific keyword in order to open the door.

Given a string ring, which represents the code engraved on the outer ring and another string key, which represents the keyword needs to be spelled. You need to find the minimum number of steps in order to spell all the characters in the keyword.

Initially, the first character of the ring is aligned at 12:00 direction. You need to spell all the characters in the string key one by one by rotating the ring clockwise or anticlockwise to make each character of the string key aligned at 12:00 direction and then by pressing the center button.

At the stage of rotating the ring to spell the key character key[i]:

You can rotate the ring clockwise or anticlockwise one place, which counts as 1 step. The final purpose of the rotation is to align one of the string ring's characters at the 12:00 direction, where this character must equal to the character key[i].
If the character key[i] has been aligned at the 12:00 direction, you need to press the center button to spell, which also counts as 1 step. After the pressing, you could begin to spell the next character in the key (next stage), otherwise, you've finished all the spelling.
Example:


 
Input: ring = "godding", key = "gd"
Output: 4
Explanation:
For the first key character 'g', since it is already in place, we just need 1 step to spell this character. 
For the second key character 'd', we need to rotate the ring "godding" anticlockwise by two steps to make it become "ddinggo".
Also, we need 1 more step for spelling.
So the final output is 4.
Note:

Length of both ring and key will be in range 1 to 100.
There are only lowercase letters in both strings and might be some duplcate characters in both strings.
It's guaranteed that string key could always be spelled by rotating the string ring.
*/

var findRotateSteps = function (ring, key) {
  let costs = new Array(ring.length).fill(Infinity);
  let temp = new Array(ring.length).fill(Infinity);

  const locations = {};
  for (let i = 0; i < ring.length; i += 1) {
    locations[ring[i]] = locations[ring[i]] || [];
    locations[ring[i]].push(i);
  }

  for (let location of locations[key[0]]) {
    costs[location] = Math.min(location, ring.length - location) + 1;
  }

  for (let i = 1; i < key.length; i += 1) {
    for (let location of locations[key[i]]) {
      temp[location] = Infinity;
      for (let lastLocation of locations[key[i - 1]]) {
        const smaller = Math.min(location, lastLocation);
        const larger = Math.max(location, lastLocation);
        const distance = Math.min(larger - smaller, smaller + ring.length - larger) + 1

        temp[location] = Math.min(
          temp[location],
          costs[lastLocation] + distance
        );
      }
    }

    [costs, temp] = [temp, costs];
  }

  let minCost = Infinity;
  for (let location of locations[key[key.length - 1]]) {
    minCost = Math.min(minCost, costs[location]);
  }

  return minCost;
};

// const letters = 'abcdefghijklmnopqrstuvwxyz';
// for (let i = 0; i < 20; i += 1) {
//   const ringLen = Math.floor(Math.random() * 50);
//   const keyLen = Math.floor(Math.random() * ringLen);

//   let ring = '';
//   for (let j = 0; j < ringLen; j += 1) {
//     const idx = Math.floor(Math.random() * letters.length);
//     ring += letters[idx];
//   }

//   let key = '';
//   for (let k = 0; k < keyLen; k += 1) {
//     const idx = Math.floor(Math.random() * ringLen);
//     key += ring[idx];
//   }

//   logOutList(printRow([ring, key]))
// }
/*


*/

const tests = [
  ["godding", "gd"],
  ["cqueowevptycjwhllywu", "wtooeuyllypluwyl"],
  ["ndbxacvrzmkinanvotaznqvtlltlbxwifempozmqgbmgklofq", "eifmnwfveatcgvigzmagonvmbkt"],
  ["rjvmfnfounoxloybfhxbmtnpldbbyhpppsmlzvpnyd", "olpppzonobpyjfonpplvhnoyphbypthozt"],
  ["lofdhwrppnfyshzoqgbzdgackn", "afsynpppgbohgrngfz"],
  ["ugkyzidokhgppqblwzitypdmtgpxu", "udhguobbyzupy"],
  ["xlrwdmhoifivfeoxtcpxtxletdskejceubohrxs", "mcbxvlesxbs"],
  ["zioype", "zo"],
  ["dqfnpslbjjjutlztxhlnmwygsy", "jxttylupjnbulysddnf"],
  ["cqdjlmukrqbgvphi", "g"],
  ["ffvbcngjcqmlprzzmfpqxx", "nfxf"],
  ["adzkzpoiazlrqrdskdiapjiwagisd", "iqpdzgrzjwsppiq"],
  ["lokknhafuvimwrjqdclrrmpsjfzgvpwvl", "wl"],
  ["vbktsnhjawrljztakkpwfhei", "bkkkbtihhtzln"],
  ["meheptvyexttwjmteecjbvup", "e"],
  ["lo", "o"],
  ["akdkeeqf", "ekk"],
  ["dawcuppcvtqcdoylmkjkpuejz", "czkkcm"],
  ["ygicsirfqnnggk", "fgifrgiig"],
  ["peeswmqvyqlqvob", "byqvevqq"],
];

for (let test of tests) {
  logOutList(findRotateSteps(...test));
}

/*
"godding"
"gd"
"cqueowevptycjwhllywu"
"wtooeuyllypluwyl"
"ndbxacvrzmkinanvotaznqvtlltlbxwifempozmqgbmgklofq"
"eifmnwfveatcgvigzmagonvmbkt"
"rjvmfnfounoxloybfhxbmtnpldbbyhpppsmlzvpnyd"
"olpppzonobpyjfonpplvhnoyphbypthozt"
"lofdhwrppnfyshzoqgbzdgackn"
"afsynpppgbohgrngfz"
"ugkyzidokhgppqblwzitypdmtgpxu"
"udhguobbyzupy"
"xlrwdmhoifivfeoxtcpxtxletdskejceubohrxs"
"mcbxvlesxbs"
"zioype"
"zo"
"dqfnpslbjjjutlztxhlnmwygsy"
"jxttylupjnbulysddnf"
"cqdjlmukrqbgvphi"
"g"
"ffvbcngjcqmlprzzmfpqxx"
"nfxf"
"adzkzpoiazlrqrdskdiapjiwagisd"
"iqpdzgrzjwsppiq"
"lokknhafuvimwrjqdclrrmpsjfzgvpwvl"
"wl"
"vbktsnhjawrljztakkpwfhei"
"bkkkbtihhtzln"
"meheptvyexttwjmteecjbvup"
"e"
"lo"
"o"
"akdkeeqf"
"ekk"
"dawcuppcvtqcdoylmkjkpuejz"
"czkkcm"
"ygicsirfqnnggk"
"fgifrgiig"
"peeswmqvyqlqvob"
"byqvevqq"
*/