/*
Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,4,4,5,6,7] might become:

[4,5,6,7,0,1,4] if it was rotated 4 times.
[0,1,4,4,5,6,7] if it was rotated 7 times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums that may contain duplicates, return the minimum element of this array.

 

Example 1:

Input: nums = [1,3,5]
Output: 1
Example 2:

Input: nums = [2,2,2,0,1]
Output: 0
 

Constraints:

n == nums.length
1 <= n <= 5000
-5000 <= nums[i] <= 5000
nums is sorted and rotated between 1 and n times.
 

Follow up: This is the same as Find Minimum in Rotated Sorted Array but with duplicates. Would allow duplicates affect the run-time complexity? How and why?
*/

/*
pure binary search is difficult because all elements could be the same except one,
and you don't know where you are in the array.

Obvious solution is to just linear search because n <= 5000

results of tests w/ 10,000,000 elements
aggregated runtime over 10 tests for each

[
["25% duplicates - binary:",          0.132568359375]
["25% duplicates - linear:",          62.53515625]
["50% duplicates - binary:",          0.13623046875]
["50% duplicates - linear:",          62.868408203125]
["75% duplicates - binary:",          0.13525390625]
["75% duplicates - linear:",          63.41259765625]
["90% duplicates - binary:",          0.14013671875]
["90% duplicates - linear:",          65.421630859375]
["99% duplicates - binary:",          0.1767578125]
["99% duplicates - linear:",          66.088134765625]
["99.9% duplicates - binary:",        0.847412109375]
["99.9% duplicates - linear:",        63.6591796875]
["99.99% duplicates - binary:",       0.1044921875]
["99.99% duplicates - linear:",       66.972412109375]
["99.999% duplicates - binary:",      0.6015625]
["99.999% duplicates - linear:",      65.16064453125]
["99.9999% duplicates - binary:",     4.514892578125]
["99.9999% duplicates - linear:",     64.583984375],
["99.99999% duplicates - binary:",    196.738525390625]
["99.99999% duplicates - linear:",    61.80224609375]
["99.999999% duplicates - binary:",   239.419189453125]
["99.999999% duplicates - linear:",   62.346923828125]
],

% duplicates    linear    binary
25%             62.535    0.1325
50%             62.868    0.1362
75%             63.412    0.1352
90%             65.421    0.1401
99%             66.088    0.1767
99.9%           63.659    0.8474
99.99%          66.972    0.1044
99.999%         65.160    0.6015
99.9999%        64.583    4.5148
99.99999%       61.802    196.73
99.999999%      62.346    239.41

POST: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/discuss/1107981/javascript-ran-some-additional-tests-for-fun-n-107
*/

var findMinBinary = function (nums) {
  const pivot = nums.length - 1;
  let left = 0;
  let right = nums.length - 1;
  let mid = 0;

  if (nums[left] < nums[right]) return nums[left];
  while (nums[left] === nums[right]) left += 1;


  while (left < right) {
    mid = Math.floor((left + right) / 2);

    if (nums[mid] <= nums[pivot]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return nums[right];
};

var findMinLinear = function (nums) {
  let min = nums[0];
  for (let i = 1; i < nums.length; i += 1) {
    min = Math.min(min, nums[i]);
  }

  return min;
}

// for (let i = 0; i < 50; i += 1) {
//   const len = numberBetween(1, maxLen);

//   const nums = [numberBetween(0, 20)];

//   for(let j = 1; j < len; j += 1) {
//     const num = Math.random() < .25
//       ? nums[j - 1]
//       : numberBetween(nums[j - 1], nums[j - 1] + 20);

//     nums.push(num);
//   }

//   const pivot = numberBetween(0, len);
//   const rotated = [...nums.slice(pivot), ...nums.slice(0, pivot)];

//   // logOutList('"' + parenString + '",')
//   // logOutList(printRow([commands, actions]) + ',')
//   // logOutList(printRow([s, t]) + ',');
//   // logOutList(numberBetween(1, 100) + ',');
//   logOutList(printRow(rotated) + ',')
// }

// const nums = new Array(maxLen).fill(1);
// nums[0] = 0;
// const end = nums.length;
// for(let i = 0; i < end; i += 1) {
//   logOutList(printRow(nums) + ',');
//   [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]]
// }

/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~REGULAR TESTS~~~~~~~~~~~~~~~~~~~~~~~
 */

const tests = [
  [599, 599, 599, 599, 606, 623, 623, 628, 632, 646, 646, 656, 658, 658, 660, 18, 27, 27, 43, 49, 58, 61, 61, 78, 78, 98, 114, 114, 114, 128, 133, 133, 137, 154, 159, 169, 182, 182, 182, 188, 206, 209, 215, 215, 215, 230, 230, 234, 241, 253, 255, 275, 275, 275, 275, 286, 295, 313, 332, 348, 366, 366, 372, 388, 392, 392, 392, 406, 414, 426, 445, 445, 455, 460, 476, 484, 486, 506, 510, 521, 536, 536, 549, 549, 568, 581, 596, 596],
  [69, 71, 71, 79, 90, 106, 109, 121, 126, 140, 152, 154, 155, 172, 176, 178, 183, 187, 191, 195, 197, 204, 208, 218, 218, 218, 219, 223, 223, 235, 245, 260, 270, 270, 273, 290, 301, 301, 302, 316, 322, 322, 337, 345, 345, 345, 356, 371, 382, 382, 386, 394, 394, 408, 408, 408, 3, 6, 9, 9, 9, 9, 23, 32, 37, 50, 55, 60, 60, 68, 69],
  [465, 465, 481, 485, 496, 500, 500, 516, 520, 530, 530, 530, 530, 530, 543, 547, 555, 571, 591, 596, 596, 616, 616, 619, 631, 643, 652, 661, 3, 6, 14, 34, 47, 49, 56, 64, 64, 64, 64, 68, 80, 85, 91, 103, 113, 127, 140, 140, 140, 140, 140, 160, 171, 171, 185, 204, 221, 235, 249, 249, 249, 263, 268, 284, 294, 300, 301, 304, 322, 322, 338, 342, 342, 346, 350, 350, 353, 364, 379, 391, 409, 409, 417, 419, 437, 442, 449, 457],
  [4],
  [437, 450, 450, 450, 460, 462, 7, 24, 44, 44, 54, 54, 63, 76, 76, 87, 87, 89, 92, 101, 119, 139, 156, 156, 173, 192, 197, 201, 205, 215, 234, 234, 241, 241, 250, 270, 270, 270, 276, 287, 287, 303, 303, 303, 303, 312, 320, 320, 330, 344, 344, 348, 348, 366, 366, 381, 382, 399, 412, 419, 422],
  [52, 64, 71, 75, 75, 78, 78, 87, 87, 100, 100, 114, 114, 120, 122, 122, 126, 133, 139, 13, 13, 20, 34],
  [41, 61, 78, 90, 4, 24],
  [164, 164, 171, 171, 181, 181, 181, 181, 181, 183, 187, 190, 190, 190, 193, 203, 215, 226, 226, 226, 237, 239, 252, 266, 277, 286, 286, 293, 304, 310, 325, 328, 343, 346, 346, 358, 366, 373, 373, 392, 392, 405, 11, 29, 44, 57, 76, 94, 94, 106, 112, 112, 116, 135, 148],
  [99, 103, 111, 129, 144, 154, 14, 22, 22, 23, 32, 32, 32, 34, 34, 42, 55, 55, 61, 79, 99],
  [418, 418, 430, 440, 446, 451, 451, 451, 465, 472, 472, 481, 489, 507, 521, 521, 537, 537, 14, 14, 24, 24, 35, 47, 63, 64, 70, 79, 89, 105, 105, 108, 114, 124, 141, 151, 156, 159, 178, 197, 209, 222, 238, 238, 246, 246, 246, 251, 251, 264, 264, 264, 283, 287, 287, 291, 291, 300, 303, 305, 319, 331, 334, 334, 354, 371, 372, 389, 403, 403, 403, 408],
  [99, 105, 114, 114, 114, 114, 114, 115, 118, 118, 137, 137, 148, 167, 180, 183, 187, 201, 217, 217, 217, 217, 217, 229, 229, 11, 11, 11, 28, 44, 56, 61, 79],
  [156, 156, 173, 175, 175, 175, 179, 184, 186, 197, 197, 208, 210, 222, 222, 222, 225, 240, 240, 256, 256, 256, 267, 276, 293, 310, 311, 313, 313, 325, 341, 349, 357, 357, 373, 390, 398, 403, 416, 419, 432, 435, 442, 456, 466, 469, 486, 504, 512, 528, 532, 532, 542, 544, 560, 560, 564, 580, 589, 608, 608, 609, 609, 17, 23, 27, 28, 28, 33, 33, 33, 44, 44, 60, 60, 68, 72, 72, 73, 81, 96, 96, 105, 123, 136],
  [155, 166, 166, 170, 170, 170, 170, 173, 188, 199, 216, 219, 233, 233, 233, 233, 247, 264, 264, 283, 301, 315, 319, 336, 336, 341, 352, 362, 362, 378, 379, 379, 394, 395, 395, 395, 409, 426, 435, 438, 452, 470, 475, 18, 18, 34, 34, 34, 52, 58, 70, 70, 79, 93, 107, 118, 122, 133, 152, 154],
  [496, 510, 510, 518, 531, 545, 552, 560, 564, 568, 571, 574, 579, 584, 600, 610, 628, 643, 5, 14, 34, 34, 34, 42, 42, 42, 48, 48, 68, 73, 74, 94, 94, 94, 106, 110, 110, 130, 146, 154, 154, 162, 179, 199, 219, 219, 233, 248, 248, 248, 252, 254, 254, 269, 289, 295, 295, 295, 304, 308, 312, 312, 312, 312, 326, 326, 326, 329, 336, 345, 362, 363, 372, 372, 391, 400, 400, 402, 402, 416, 429, 429, 441, 446, 458, 458, 463, 478, 494, 494],
  [30, 30, 19, 19, 30],
  [199, 199, 199, 203, 209, 225, 227, 227, 227, 245, 258, 265, 284, 291, 300, 303, 303, 303, 316, 327, 346, 348, 348, 357, 363, 381, 399, 410, 430, 441, 461, 461, 461, 463, 471, 476, 476, 494, 509, 509, 509, 515, 518, 518, 536, 549, 549, 549, 549, 566, 583, 593, 594, 594, 607, 626, 641, 656, 659, 659, 659, 659, 665, 682, 682, 682, 692, 702, 705, 720, 720, 720, 720, 720, 734, 744, 750, 7, 9, 25, 25, 39, 45, 64, 79, 97, 102, 113, 126, 131, 151, 153, 157, 157, 174, 184, 184, 199, 199],
  [136, 147, 152, 161, 161, 168, 177, 188, 199, 199, 206, 209, 214, 228, 229, 231, 242, 249, 249, 249, 258, 258, 259, 274, 287, 292, 301, 313, 321, 341, 341, 361, 365, 369, 371, 375, 378, 393, 393, 393, 411, 422, 422, 422, 428, 428, 448, 467, 481, 489, 497, 509, 509, 509, 512, 512, 514, 534, 547, 567, 571, 578, 586, 597, 608, 620, 620, 620, 632, 650, 653, 654, 667, 669, 681, 683, 690, 704, 713, 732, 11, 11, 16, 18, 19, 35, 55, 69, 89, 97, 110, 117, 117, 119, 121, 123],
  [642, 659, 673, 673, 673, 673, 9, 25, 32, 45, 61, 69, 72, 88, 106, 106, 114, 118, 118, 132, 135, 140, 146, 146, 156, 162, 173, 173, 176, 176, 184, 200, 216, 236, 238, 238, 239, 255, 255, 267, 267, 267, 271, 284, 284, 292, 293, 299, 309, 327, 340, 350, 350, 354, 357, 365, 365, 385, 400, 414, 415, 415, 417, 417, 420, 434, 441, 455, 455, 463, 483, 501, 501, 501, 501, 501, 516, 516, 516, 526, 533, 533, 547, 565, 580, 585, 590, 596, 605, 605, 624, 642],
  [212, 229, 243, 243, 245, 262, 10, 26, 26, 26, 26, 45, 47, 56, 67, 85, 85, 97, 113, 131, 131, 141, 145, 160, 166, 185, 205],
  [22, 32, 34, 37, 37, 56, 1, 15],
  [2, 4, 17, 22, 34, 34, 51, 52, 53, 73, 91, 98, 104, 108, 108, 108, 128, 128, 128, 130, 136, 152, 155, 156, 167, 173, 183, 199, 217, 217, 223, 223, 230, 242, 250, 269, 285, 287, 290, 308, 308, 314, 323, 326, 345, 355, 363, 372, 383, 393, 412, 412, 427, 441, 443, 458, 462, 476, 487, 487, 488, 503, 503, 510, 523, 543, 543, 543, 543, 550, 566, 571, 583, 596, 610, 610, 610, 622, 623, 623, 639, 645, 665, 677, 688, 695, 711, 724, 731, 741, 750, 750, 750, 0, 2],
  [52, 52, 72, 82, 95, 95, 114, 118, 118, 131, 145, 145, 145, 145, 145, 162, 177, 187, 193, 193, 202, 213, 217, 217, 225, 228, 13, 13, 29, 29, 29, 29, 39],
  [0, 16, 16, 25, 25, 25, 38, 55, 75, 89, 89, 107, 107, 110, 110, 110, 126, 138, 138, 142, 148, 167, 168, 168, 175, 192, 192, 192, 192, 195, 199, 209, 213, 217, 233, 249, 265, 283, 283, 292, 309, 309, 326, 326, 336, 343, 361, 376, 376, 376, 380, 380, 382, 402, 403, 410, 418, 431, 431, 431, 433, 435, 435, 435, 435, 452, 461, 461, 470, 479, 494, 499, 506, 510, 517, 520, 520, 527, 547, 547, 563, 564, 570, 570, 570, 583],
  [2, 20, 39, 39, 39, 50, 58, 64, 76, 95, 108, 109, 109, 128, 146, 146, 157, 159, 162, 166, 173, 189, 189, 189, 206, 217, 222, 231, 231, 245, 253, 253, 262, 274, 274, 277, 277, 285, 303, 303, 303, 303, 323, 335, 345, 358, 358, 365, 378, 389, 409, 421, 428, 437, 440, 457, 458, 476, 495],
  [580, 585, 593, 601, 611, 611, 611, 620, 627, 637, 637, 655, 669, 669, 682, 697, 713, 714, 714, 730, 734, 744, 759, 759, 767, 768, 778, 794, 794, 807, 823, 828, 840, 840, 14, 25, 25, 25, 25, 35, 39, 57, 73, 81, 88, 107, 116, 124, 124, 126, 132, 134, 149, 152, 152, 168, 178, 196, 196, 205, 223, 242, 260, 260, 262, 262, 269, 289, 307, 307, 310, 310, 322, 342, 350, 360, 378, 395, 400, 400, 417, 423, 431, 442, 448, 456, 471, 484, 499, 510, 522, 522, 539, 556, 566],
  [65, 65, 80, 11, 25, 25, 32, 39, 39, 51, 51],
  [560, 580, 8, 21, 36, 53, 55, 55, 61, 61, 66, 80, 87, 103, 112, 112, 113, 113, 133, 148, 148, 152, 163, 178, 188, 188, 188, 188, 188, 203, 210, 218, 218, 226, 226, 226, 227, 243, 247, 247, 261, 266, 266, 270, 283, 302, 308, 312, 331, 345, 361, 361, 371, 372, 381, 384, 389, 401, 401, 419, 423, 426, 444, 447, 463, 463, 478, 479, 479, 482, 486, 495, 504, 507, 507, 510, 522, 534, 536, 553, 553, 553, 553, 560],
  [80, 94, 107, 116, 127, 137, 144, 156, 157, 157, 159, 178, 178, 181, 198, 198, 198, 211, 216, 229, 242, 242, 256, 256, 262, 282, 282, 282, 284, 289, 289, 309, 319, 319, 335, 338, 345, 349, 359, 377, 380, 387, 387, 402, 409, 409, 420, 420, 436, 451, 451, 452, 456, 456, 474, 478, 486, 491, 491, 501, 513, 531, 531, 541, 550, 550, 563, 568, 587, 587, 605, 621, 632, 632, 3, 16, 19, 26, 26, 34, 43, 43, 43, 43, 47, 47, 60, 60],
  [38, 40, 52, 64, 83, 83, 94, 101, 118, 123, 132, 146, 148, 165, 165, 165, 185, 202, 218, 224, 235, 243, 255, 4, 21],
  [267, 279, 279, 279, 279, 298, 298, 298, 304, 304, 307, 307, 317, 326, 341, 353, 361, 378, 396, 413, 432, 445, 464, 475, 475, 475, 493, 5, 24, 24, 32, 38, 49, 64, 82, 82, 93, 100, 106, 106, 119, 133, 135, 140, 140, 148, 149, 154, 173, 178, 190, 191, 207, 227, 237, 248, 267],
  [94, 99, 106, 106, 116, 124, 131, 134, 146, 146, 147, 154, 174, 189, 196, 199, 200, 200, 200, 201, 201, 216, 216, 216, 228, 245, 19, 24, 35, 53, 68, 83, 94],
  [51, 71, 82, 102, 106, 106, 106, 106, 106, 121, 140, 142, 148, 166, 174, 181, 181, 198, 198, 211, 227, 227, 244, 244, 262, 273, 293, 313, 313, 313, 332, 352, 352, 368, 371, 379, 383, 383, 402, 404, 404, 404, 404, 407, 426, 438, 456, 456, 464, 471, 490, 490, 500, 506, 510, 510, 510, 527, 527, 534, 553, 572, 573, 587, 587, 588, 604, 613, 621, 625, 625, 645, 645, 645, 665, 672, 681, 681, 696, 697, 5, 5, 21, 28, 48],
  [15, 15],
  [459, 459, 471, 488, 499, 508, 515, 516, 516, 529, 534, 543, 543, 543, 557, 576, 576, 591, 591, 591, 597, 617, 2, 2, 18, 25, 33, 53, 69, 87, 106, 115, 118, 135, 135, 146, 163, 171, 172, 186, 203, 203, 218, 237, 256, 268, 270, 287, 287, 293, 307, 307, 319, 338, 338, 347, 366, 366, 381, 381, 391, 395, 405, 424, 424, 443, 443, 444, 444, 444, 459, 459, 459],
  [122, 122, 127, 16, 16, 16, 20, 23, 40, 49, 56, 72, 84, 98, 98, 98, 106],
  [385, 385, 403, 421, 430, 449, 449, 466, 475, 485, 501, 520, 520, 1, 19, 36, 47, 51, 51, 52, 53, 60, 70, 70, 82, 93, 102, 109, 109, 127, 146, 161, 170, 178, 178, 178, 178, 196, 196, 196, 203, 218, 237, 252, 264, 272, 285, 285, 285, 288, 292, 292, 292, 307, 307, 307, 324, 336, 336, 345, 364, 378, 379, 385],
  [55, 55, 60, 69, 83, 84, 99, 107, 1, 21, 32, 39],
  [289, 289, 290, 306, 309, 324, 343, 343, 343, 355, 364, 371, 383, 383, 383, 403, 411, 425, 438, 458, 472, 481, 500, 509, 509, 525, 525, 528, 530, 532, 534, 551, 559, 559, 6, 6, 6, 6, 6, 10, 19, 19, 19, 29, 44, 53, 55, 60, 74, 92, 108, 115, 135, 143, 152, 156, 166, 171, 179, 197, 216, 216, 234, 234, 249, 267, 281, 283, 289],
  [171, 171, 171, 171, 191, 17, 24, 38, 47, 60, 75, 75, 85, 89, 106, 110, 110, 128, 128, 146, 160, 160, 161],
  [177, 188, 20, 20, 22, 22, 33, 33, 37, 45, 51, 69, 79, 86, 104, 108, 116, 126, 136, 145, 155, 157, 158, 159],
  [104, 104, 116, 120, 122, 136, 147, 7, 7, 9, 27, 27, 43, 60, 79, 89, 92],
  [86, 98, 98, 111, 122, 127, 138, 138, 138, 147, 150, 151, 164, 168, 168, 187, 188, 188, 188, 188, 190, 190, 204, 217, 225, 225, 233, 233, 237, 257, 274, 281, 281, 293, 293, 293, 301, 312, 322, 336, 337, 347, 362, 382, 388, 408, 417, 417, 427, 444, 444, 444, 464, 464, 471, 479, 490, 507, 522, 528, 529, 1, 5, 5, 21, 21, 31, 42, 52, 61, 61, 61, 61, 64, 68, 72, 72, 77, 86, 86, 86, 86, 86],
  [100, 106, 125, 130, 130, 130, 130, 149, 159, 159, 164, 167, 174, 186, 186, 205, 205, 206, 10, 14, 22, 22, 25, 26, 26, 26, 44, 48, 56, 75, 75, 94],
  [131, 142, 158, 163, 168, 168, 168, 174, 187, 197, 202, 206, 206, 218, 235, 253, 263, 263, 272, 272, 283, 293, 296, 305, 322, 322, 340, 343, 352, 352, 370, 15, 35, 41, 60, 60, 61, 71, 80, 98, 101, 101, 119, 124, 129, 131],
  [9, 13, 23, 40, 58, 71, 79, 98, 113, 113, 113, 113, 113, 113, 113, 122, 141, 155, 171, 172, 176, 176, 193, 212, 227, 235, 235, 241, 241, 243, 244, 246, 248, 253, 260, 261, 276, 286, 296, 307, 307, 325, 344, 354, 360, 379, 379, 379, 384, 400, 415, 431, 443, 443, 457, 476, 491, 502, 507, 511, 512, 525, 525, 525, 534, 546, 552, 552, 556, 560, 568, 578, 582, 590, 608, 615, 615, 615, 633, 648, 663, 663, 672, 677, 697, 708, 722, 727, 727],
  [1, 13, 25],
  [101, 116, 133, 135, 135, 135, 139, 139, 139, 139, 151, 163, 163, 164, 181, 196, 204, 212, 6, 26, 26, 26, 43, 43, 43, 59, 75, 81, 83, 91, 101],
  [32, 48, 15],
  [3, 5, 14, 23, 39, 48, 48, 0],
  [430, 433, 433, 433, 453, 453, 453, 467, 473, 493, 497, 497, 499, 507, 523, 538, 548, 550, 559, 559, 577, 584, 596, 613, 629, 629, 648, 653, 657, 657, 657, 666, 672, 687, 687, 693, 706, 714, 720, 720, 722, 726, 737, 750, 762, 780, 784, 14, 33, 52, 59, 78, 80, 90, 92, 92, 92, 111, 115, 132, 141, 152, 156, 157, 157, 170, 175, 190, 192, 209, 213, 231, 245, 253, 253, 258, 270, 289, 299, 314, 333, 334, 334, 346, 350, 350, 356, 356, 365, 368, 373, 387, 407, 423],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(findMin(test));
  console.timeEnd(i);
  i += 1;
}

/**
 * ~~~~~~~~~~~~~~~~TESTS~~~~~~~~~~~~~~~~
 */
const len = 10000000;
const runTest = (testCase, dupeChance, ...tests) => {
  const [test1, test1Label, test2, test2Label] = tests;
  const nums = [numberBetween(0, 20)];

  for (let j = 1; j < len; j += 1) {
    const num = Math.random() < dupeChance
      ? nums[j - 1]
      : numberBetween(nums[j - 1], nums[j - 1] + 20);

    nums.push(num);
  }

  const pivot = numberBetween(0, len);
  const rotated = [...nums.slice(pivot), ...nums.slice(0, pivot)];

  console.time(`${testCase} ${test1Label}`);
  test1(rotated);
  console.timeEnd(`${testCase} ${test1Label}`);
  console.time(`${testCase} ${test2Label}`);
  test2(rotated);
  console.timeEnd(`${testCase} ${test2Label}`);
}

const testCases = [
  ['startup', .1],
  ['25% duplicates -', .25],
  ['50% duplicates -', .5],
  ['75% duplicates -', .75],
  ['90% duplicates -', .9],
  ['99% duplicates -', .99],
  ['99.9% duplicates -', .999],
  ['99.99% duplicates -', .9999],
  ['99.999% duplicates -', .99999],
  ['99.9999% duplicates -', .999999],
  ['99.99999% duplicates -', .9999999],
  ['99.999999% duplicates -', .99999999],
]

for (let [testCase, dupeChance] of testCases) {
  let test1 = [findMinBinary, 'binary'];
  let test2 = [findMinLinear, 'linear'];

  for (let i = 0; i < 10; i += 1) {
    runTest(testCase, dupeChance, ...test1, ...test2);
    [test1, test2] = [test2, test1];
  }
}

const testResults = [
  ['25% duplicates - binary:', 0.014892578125],
  ['25% duplicates - linear:', 6.689208984375],
  ['25% duplicates - linear:', 6.030029296875],
  ['25% duplicates - binary:', 0.010009765625],
  ['25% duplicates - binary:', 0.012939453125],
  ['25% duplicates - linear:', 6.437255859375],
  ['25% duplicates - linear:', 5.886962890625],
  ['25% duplicates - binary:', 0.010009765625],
  ['25% duplicates - binary:', 0.015869140625],
  ['25% duplicates - linear:', 6.26123046875],
  ['25% duplicates - linear:', 6.10693359375],
  ['25% duplicates - binary:', 0.012939453125],
  ['25% duplicates - binary:', 0.015869140625],
  ['25% duplicates - linear:', 6.4482421875],
  ['25% duplicates - linear:', 6.1318359375],
  ['25% duplicates - binary:', 0.01318359375],
  ['25% duplicates - binary:', 0.01416015625],
  ['25% duplicates - linear:', 6.277587890625],
  ['25% duplicates - linear:', 6.265869140625],
  ['25% duplicates - binary:', 0.0126953125],
  ['50% duplicates - binary:', 0.012939453125],
  ['50% duplicates - linear:', 6.2001953125],
  ['50% duplicates - linear:', 6.40283203125],
  ['50% duplicates - binary:', 0.012939453125],
  ['50% duplicates - binary:', 0.013916015625],
  ['50% duplicates - linear:', 6.43017578125],
  ['50% duplicates - linear:', 6.330078125],
  ['50% duplicates - binary:', 0.01416015625],
  ['50% duplicates - binary:', 0.014892578125],
  ['50% duplicates - linear:', 6.18310546875],
  ['50% duplicates - linear:', 6.2578125],
  ['50% duplicates - binary:', 0.01171875],
  ['50% duplicates - binary:', 0.01416015625],
  ['50% duplicates - linear:', 6.215087890625],
  ['50% duplicates - linear:', 6.031982421875],
  ['50% duplicates - binary:', 0.013916015625],
  ['50% duplicates - binary:', 0.013916015625],
  ['50% duplicates - linear:', 6.550048828125],
  ['50% duplicates - linear:', 6.26708984375],
  ['50% duplicates - binary:', 0.013671875],
  ['75% duplicates - binary:', 0.014892578125],
  ['75% duplicates - linear:', 6.18896484375],
  ['75% duplicates - linear:', 6.27783203125],
  ['75% duplicates - binary:', 0.011962890625],
  ['75% duplicates - binary:', 0.01611328125],
  ['75% duplicates - linear:', 6.43701171875],
  ['75% duplicates - linear:', 6.5458984375],
  ['75% duplicates - binary:', 0.010009765625],
  ['75% duplicates - binary:', 0.01416015625],
  ['75% duplicates - linear:', 6.34912109375],
  ['75% duplicates - linear:', 6.0908203125],
  ['75% duplicates - binary:', 0.01318359375],
  ['75% duplicates - binary:', 0.013916015625],
  ['75% duplicates - linear:', 6.85107421875],
  ['75% duplicates - linear:', 6.3720703125],
  ['75% duplicates - binary:', 0.012939453125],
  ['75% duplicates - binary:', 0.014892578125],
  ['75% duplicates - linear:', 6.202880859375],
  ['75% duplicates - linear:', 6.096923828125],
  ['75% duplicates - binary:', 0.01318359375],
  ['90% duplicates - binary:', 0.01708984375],
  ['90% duplicates - linear:', 6.601806640625],
  ['90% duplicates - linear:', 6.76806640625],
  ['90% duplicates - binary:', 0.010986328125],
  ['90% duplicates - binary:', 0.014892578125],
  ['90% duplicates - linear:', 6.218994140625],
  ['90% duplicates - linear:', 6.094970703125],
  ['90% duplicates - binary:', 0.011962890625],
  ['90% duplicates - binary:', 0.01513671875],
  ['90% duplicates - linear:', 6.77783203125],
  ['90% duplicates - linear:', 7.099853515625],
  ['90% duplicates - binary:', 0.012939453125],
  ['90% duplicates - binary:', 0.016845703125],
  ['90% duplicates - linear:', 6.22607421875],
  ['90% duplicates - linear:', 6.09912109375],
  ['90% duplicates - binary:', 0.013671875],
  ['90% duplicates - binary:', 0.0146484375],
  ['90% duplicates - linear:', 7.357177734375],
  ['90% duplicates - linear:', 6.177734375],
  ['90% duplicates - binary:', 0.011962890625],
  ['99% duplicates - binary:', 0.018798828125],
  ['99% duplicates - linear:', 6.64990234375],
  ['99% duplicates - linear:', 6.010009765625],
  ['99% duplicates - binary:', 0.012939453125],
  ['99% duplicates - binary:', 0.020751953125],
  ['99% duplicates - linear:', 6.615966796875],
  ['99% duplicates - linear:', 6.3017578125],
  ['99% duplicates - binary:', 0.01904296875],
  ['99% duplicates - binary:', 0.016845703125],
  ['99% duplicates - linear:', 6.385986328125],
  ['99% duplicates - linear:', 6.4912109375],
  ['99% duplicates - binary:', 0.01318359375],
  ['99% duplicates - binary:', 0.01513671875],
  ['99% duplicates - linear:', 7.149169921875],
  ['99% duplicates - linear:', 7.007080078125],
  ['99% duplicates - binary:', 0.02490234375],
  ['99% duplicates - binary:', 0.021240234375],
  ['99% duplicates - linear:', 7.3828125],
  ['99% duplicates - linear:', 6.09423828125],
  ['99% duplicates - binary:', 0.013916015625],
  ['99.9% duplicates - binary:', 0.078125],
  ['99.9% duplicates - linear:', 6.15283203125],
  ['99.9% duplicates - linear:', 6.107177734375],
  ['99.9% duplicates - binary:', 0.0380859375],
  ['99.9% duplicates - binary:', 0.1240234375],
  ['99.9% duplicates - linear:', 6.3740234375],
  ['99.9% duplicates - linear:', 6.325927734375],
  ['99.9% duplicates - binary:', 0.030029296875],
  ['99.9% duplicates - binary:', 0.070068359375],
  ['99.9% duplicates - linear:', 6.295166015625],
  ['99.9% duplicates - linear:', 7.034912109375],
  ['99.9% duplicates - binary:', 0.052734375],
  ['99.9% duplicates - binary:', 0.02197265625],
  ['99.9% duplicates - linear:', 7.208251953125],
  ['99.9% duplicates - linear:', 5.741943359375],
  ['99.9% duplicates - binary:', 0.0322265625],
  ['99.9% duplicates - binary:', 0.39306640625],
  ['99.9% duplicates - linear:', 6.21923828125],
  ['99.9% duplicates - linear:', 6.19970703125],
  ['99.9% duplicates - binary:', 0.007080078125],
  ['99.99% duplicates - binary:', 0.01318359375],
  ['99.99% duplicates - linear:', 6.184814453125],
  ['99.99% duplicates - linear:', 6.4921875],
  ['99.99% duplicates - binary:', 0.008056640625],
  ['99.99% duplicates - binary:', 0.008056640625],
  ['99.99% duplicates - linear:', 7.73974609375],
  ['99.99% duplicates - linear:', 6.375244140625],
  ['99.99% duplicates - binary:', 0.011962890625],
  ['99.99% duplicates - binary:', 0.0078125],
  ['99.99% duplicates - linear:', 6.300048828125],
  ['99.99% duplicates - linear:', 6.126220703125],
  ['99.99% duplicates - binary:', 0.0078125],
  ['99.99% duplicates - binary:', 0.012939453125],
  ['99.99% duplicates - linear:', 6.557861328125],
  ['99.99% duplicates - linear:', 6.4140625],
  ['99.99% duplicates - binary:', 0.0068359375],
  ['99.99% duplicates - binary:', 0.018798828125],
  ['99.99% duplicates - linear:', 7.037109375],
  ['99.99% duplicates - linear:', 7.7451171875],
  ['99.99% duplicates - binary:', 0.009033203125],
  ['99.999% duplicates - binary:', 0.047119140625],
  ['99.999% duplicates - linear:', 6.711181640625],
  ['99.999% duplicates - linear:', 6.674072265625],
  ['99.999% duplicates - binary:', 0.09814453125],
  ['99.999% duplicates - binary:', 0.09716796875],
  ['99.999% duplicates - linear:', 6.3330078125],
  ['99.999% duplicates - linear:', 6.3359375],
  ['99.999% duplicates - binary:', 0.0849609375],
  ['99.999% duplicates - binary:', 0.09912109375],
  ['99.999% duplicates - linear:', 6.337890625],
  ['99.999% duplicates - linear:', 6.60498046875],
  ['99.999% duplicates - binary:', 0.0849609375],
  ['99.999% duplicates - binary:', 0.0458984375],
  ['99.999% duplicates - linear:', 7.280029296875],
  ['99.999% duplicates - linear:', 6.49169921875],
  ['99.999% duplicates - binary:', 0.008056640625],
  ['99.999% duplicates - binary:', 0.02685546875],
  ['99.999% duplicates - linear:', 6.322998046875],
  ['99.999% duplicates - linear:', 6.06884765625],
  ['99.999% duplicates - binary:', 0.00927734375],
  ['99.9999% duplicates - binary:', 0.0341796875],
  ['99.9999% duplicates - linear:', 6.592041015625],
  ['99.9999% duplicates - linear:', 7.3427734375],
  ['99.9999% duplicates - binary:', 0.8212890625],
  ['99.9999% duplicates - binary:', 0.09814453125],
  ['99.9999% duplicates - linear:', 6.14013671875],
  ['99.9999% duplicates - linear:', 6.218017578125],
  ['99.9999% duplicates - binary:', 0.7529296875],
  ['99.9999% duplicates - binary:', 0.56494140625],
  ['99.9999% duplicates - linear:', 6.501953125],
  ['99.9999% duplicates - linear:', 6.487060546875],
  ['99.9999% duplicates - binary:', 0.203125],
  ['99.9999% duplicates - binary:', 0.48291015625],
  ['99.9999% duplicates - linear:', 6.229248046875],
  ['99.9999% duplicates - linear:', 6.243896484375],
  ['99.9999% duplicates - binary:', 0.526123046875],
  ['99.9999% duplicates - binary:', 0.959228515625],
  ['99.9999% duplicates - linear:', 6.43896484375],
  ['99.9999% duplicates - linear:', 6.389892578125],
  ['99.9999% duplicates - binary:', 0.072021484375],
  ['99.99999% duplicates - binary:', 27.872802734375],
  ['99.99999% duplicates - linear:', 5.987060546875],
  ['99.99999% duplicates - linear:', 5.850830078125],
  ['99.99999% duplicates - binary:', 7.105224609375],
  ['99.99999% duplicates - binary:', 54.1650390625],
  ['99.99999% duplicates - linear:', 6.0390625],
  ['99.99999% duplicates - linear:', 6.1220703125],
  ['99.99999% duplicates - binary:', 18.80078125],
  ['99.99999% duplicates - binary:', 0.676025390625],
  ['99.99999% duplicates - linear:', 6.7890625],
  ['99.99999% duplicates - linear:', 6.01318359375],
  ['99.99999% duplicates - binary:', 1.35009765625],
  ['99.99999% duplicates - binary:', 25.9169921875],
  ['99.99999% duplicates - linear:', 6.1689453125],
  ['99.99999% duplicates - linear:', 6.06201171875],
  ['99.99999% duplicates - binary:', 25.48876953125],
  ['99.99999% duplicates - binary:', 10.345947265625],
  ['99.99999% duplicates - linear:', 6.85400390625],
  ['99.99999% duplicates - linear:', 5.916015625],
  ['99.99999% duplicates - binary:', 25.016845703125],
  ['99.999999% duplicates - binary:', 25.5859375],
  ['99.999999% duplicates - linear:', 5.984130859375],
  ['99.999999% duplicates - linear:', 6.64208984375],
  ['99.999999% duplicates - binary:', 25.396240234375],
  ['99.999999% duplicates - binary:', 24.838134765625],
  ['99.999999% duplicates - linear:', 6.01318359375],
  ['99.999999% duplicates - linear:', 6.158935546875],
  ['99.999999% duplicates - binary:', 25.385009765625],
  ['99.999999% duplicates - binary:', 25.51708984375],
  ['99.999999% duplicates - linear:', 6.3798828125],
  ['99.999999% duplicates - linear:', 6.212890625],
  ['99.999999% duplicates - binary:', 25.1533203125],
  ['99.999999% duplicates - binary:', 12.10693359375],
  ['99.999999% duplicates - linear:', 6.511962890625],
  ['99.999999% duplicates - linear:', 6.120849609375],
  ['99.999999% duplicates - binary:', 25.27001953125],
  ['99.999999% duplicates - binary:', 24.9677734375],
  ['99.999999% duplicates - linear:', 5.9970703125],
  ['99.999999% duplicates - linear:', 6.325927734375],
  ['99.999999% duplicates - binary:', 25.19873046875],
]

testResults.sort((a, b) => a[0] < b[0] ? -1 : 1);
const compiled = testResults.reduce((total, [test, result], testCase) => {
  if (!testCase || test !== testResults[testCase - 1][0]) {
    total.push([test, result]);
  } else {
    total[total.length - 1][1] += result;
  }
  return total;
}, [])

logOutList(printGrid(compiled))