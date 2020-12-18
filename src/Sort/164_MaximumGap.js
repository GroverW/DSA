/*

*/

var maximumGap = function (nums) {
  if (nums.length < 2) return 0;
  const [min, max] = nums.reduce((minMax, val) => {
    minMax[0] = Math.min(minMax[0], val);
    minMax[1] = Math.max(minMax[1], val);
    return minMax;
  }, [Infinity, -Infinity]);

  const bucketSize = Math.max(1, Math.ceil((max - min) / (nums.length - 1)));
  const numBuckets = Math.ceil((max - min) / bucketSize) + 1;
  const buckets = new Array(numBuckets).fill(0)
    .map(() => ({ min: Infinity, max: -Infinity }));

  nums.forEach((num) => {
    const bucketIdx = Math.floor((num - min) / bucketSize);
    const bucket = buckets[bucketIdx];
    bucket.min = Math.min(bucket.min, num);
    bucket.max = Math.max(bucket.max, num);
  });

  let lastBucket = buckets[0];
  return buckets.reduce((maxDiff, bucket) => {
    if(bucket.min === Infinity) return maxDiff;
    maxDiff = Math.max(maxDiff, bucket.min - lastBucket.max);
    lastBucket = bucket;
    return maxDiff;
  }, 0)
};

const tests = [
  [3, 6, 9, 1],
  [898, 537, 977, 243, 406, 2, 729, 912, 634, 494, 115, 632, 23, 541, 913, 387, 317, 621, 137, 845, 115, 613, 204, 201, 540, 523, 118, 177, 573, 871, 51, 203, 736, 257, 119, 322, 875, 529, 434, 270, 272, 970, 191, 294, 413, 8, 818, 990, 277, 208, 93, 188, 714, 430],
  [701, 200, 956, 439, 849, 487, 788, 225, 148, 836, 279, 203, 640, 836, 615, 277, 155, 38, 542, 590, 633, 605, 303, 238, 160, 984, 455, 880, 51, 339, 454, 668, 440, 880, 367, 750, 777, 802, 984, 318, 794, 996, 74, 628, 36, 285, 94, 116, 865, 303],
  [975, 99, 473, 501, 435, 349, 521, 670, 363, 773],
  [847, 560, 102, 720, 649, 492, 575, 592, 774, 655, 610, 813, 649, 649, 274, 609, 23, 395, 211, 158, 410, 483, 350, 156, 39, 235, 499, 583, 836, 921, 310, 346, 907, 553, 935, 557, 810, 864, 970, 222, 306, 396, 653, 651, 646, 759, 864, 697, 209, 73, 620, 47, 478, 705],
  [694, 500, 755, 433, 706, 695, 892, 107, 184, 771, 226, 570, 971, 65, 341, 460, 65, 505, 645, 738, 859, 218, 208, 428, 130, 734, 241, 716, 992, 537, 558, 501, 469, 290, 556],
  [209, 594, 145, 182, 363],
  [57, 899, 451, 300, 36, 20, 749, 950, 899, 775, 997, 201, 318, 951, 461, 884, 755, 823, 134, 77, 206, 398, 553, 791, 329, 952, 552, 545, 533, 516, 908, 709, 554, 392, 154, 970, 792, 24, 802, 610, 482, 416, 638, 850, 75, 789, 944, 842],
  [840, 391, 484, 69, 455, 862, 532, 533, 255, 196, 802, 983, 259, 861],
  [40, 817, 501, 84, 774, 377, 702, 213, 867, 785, 710, 516, 769, 643, 706, 532, 966, 757, 581, 481, 815, 670, 65, 225, 184, 525, 134, 62, 174, 327, 499, 322, 83, 741, 182],
  [732, 966],
  [960, 684, 980, 423, 519, 418, 931, 682, 989, 97, 696, 599, 118, 406, 929, 445, 464, 137, 617, 176, 550, 651, 844, 736, 855, 885, 121, 784, 525, 134, 466, 886, 737, 529, 13, 325, 847, 618, 843, 325, 918, 577, 942, 608, 131, 72, 17, 147, 635, 761, 538, 73, 591, 794, 788, 911, 713, 528, 982, 612, 397, 646, 138, 522, 560, 856, 992, 83, 133, 463, 906, 563, 294, 378, 21, 451, 955, 521, 806, 478, 258, 392, 41, 295, 890, 988, 381, 737, 786, 309, 187, 948, 118],
  [97, 820, 559, 249, 328, 595, 249, 413, 936, 904, 294, 732, 290, 104, 504, 628, 629, 231, 470, 578, 895, 923, 915, 211, 294, 481, 204, 501, 584, 889, 442, 802, 545],
  [599, 978, 717, 78, 373, 602, 522, 188, 47, 988, 46, 412, 81, 496, 940, 23, 132, 678, 87, 640, 330, 582, 67, 52, 133, 628, 420, 238, 803, 417, 366, 455, 990, 625, 891, 381, 169, 772, 462, 390, 74, 895, 764, 544, 911, 486, 507, 987, 349, 904, 32, 366, 826, 760, 349, 402, 34, 128, 710, 593, 466, 360, 111, 508, 795, 829, 790, 93, 826, 880, 927, 430, 903, 122, 637, 408, 413, 132, 245, 946, 170, 916, 535, 857, 90, 372, 264, 192, 308, 119, 105],
  [667, 715, 744, 131, 57, 21, 496, 314, 188, 551, 660, 539, 131, 964, 938, 351, 142, 522, 849, 765, 646, 877, 613, 477, 103, 896, 398, 492, 139, 720, 533, 110, 505, 409, 694, 513, 761, 912, 80, 38, 195, 350, 395, 13, 436, 473, 161, 270, 880, 947, 691, 963, 43, 10, 117, 317, 643, 921, 120, 822, 755, 419, 99],
  [942, 764, 207, 953, 344, 613, 954, 567, 537, 896, 267, 599, 552, 122, 550, 789, 189, 17, 87, 291],
  [830, 913, 886, 532, 416, 23, 970, 635, 829, 933, 543, 16],
  [202, 429, 24, 126, 342, 727, 421, 857, 453, 27, 624, 60, 376, 95, 506, 605, 913, 635, 16, 988, 826, 142, 415, 493, 521, 972, 467, 652, 328, 577, 202, 39, 409, 684, 157, 602],
  [770, 403, 101, 202, 98, 813, 776, 930, 869, 935, 815, 515, 357, 822, 169, 237, 272, 84, 533, 744, 619, 513, 626, 605, 516, 952, 405, 987, 23, 633, 687, 959, 440, 866, 672, 9, 569, 902, 115, 322, 835, 69, 701, 964, 173, 46, 928, 440, 559, 951, 284, 879, 802, 86, 836, 313, 127, 426, 291, 139, 396, 474, 872, 470, 833, 804, 465, 399, 673, 475, 200, 893, 316, 270, 174, 219, 482, 106, 208, 93, 53, 141, 402, 665, 301, 352, 148, 805, 425, 594, 632, 344, 490, 15, 507, 323, 344, 301, 277],
  [455, 970, 451, 281, 185, 943, 410, 427, 51, 986, 135, 180, 133, 659, 816, 127, 26, 986, 446, 251, 57, 27, 977, 240, 563, 461, 578, 919, 646, 126, 222, 695, 192, 346, 577, 975, 96, 742, 644, 324, 75, 279, 659, 147, 82, 708, 552, 955, 504, 115, 875, 213, 798, 994, 566, 407, 265, 281, 242, 587, 797, 635, 64, 178, 866, 574, 750, 834, 209, 223, 701, 340, 148, 704, 222, 874, 171, 885, 936, 555, 344, 340, 104, 347, 134, 658, 106, 395, 598, 396],
  [921, 54, 484, 389, 377, 900, 288, 902, 539, 123, 447, 83, 666, 771, 431, 69, 152, 429, 918, 437, 175, 186, 169, 994, 636, 670, 509, 493, 343, 886, 220, 218, 344, 602, 46, 90, 97, 944, 35, 292, 925, 177, 42, 479, 890, 755, 193, 560, 504, 496, 610, 121, 0, 38, 858, 823, 461, 869, 945, 409, 617, 846, 232, 132, 946, 819, 501, 554, 26, 51, 330, 865, 715, 783, 132, 299, 728, 545, 390, 534, 527, 295, 929, 626, 453, 518, 710, 444, 393, 229, 788, 762, 587, 879],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(maximumGap(test));
  console.timeEnd(i);
  i += 1;
}

/*
[3, 6, 9, 1]
[898, 537, 977, 243, 406, 2, 729, 912, 634, 494, 115, 632, 23, 541, 913, 387, 317, 621, 137, 845, 115, 613, 204, 201, 540, 523, 118, 177, 573, 871, 51, 203, 736, 257, 119, 322, 875, 529, 434, 270, 272, 970, 191, 294, 413, 8, 818, 990, 277, 208, 93, 188, 714, 430]
[701, 200, 956, 439, 849, 487, 788, 225, 148, 836, 279, 203, 640, 836, 615, 277, 155, 38, 542, 590, 633, 605, 303, 238, 160, 984, 455, 880, 51, 339, 454, 668, 440, 880, 367, 750, 777, 802, 984, 318, 794, 996, 74, 628, 36, 285, 94, 116, 865, 303]
[975, 99, 473, 501, 435, 349, 521, 670, 363, 773]
[847, 560, 102, 720, 649, 492, 575, 592, 774, 655, 610, 813, 649, 649, 274, 609, 23, 395, 211, 158, 410, 483, 350, 156, 39, 235, 499, 583, 836, 921, 310, 346, 907, 553, 935, 557, 810, 864, 970, 222, 306, 396, 653, 651, 646, 759, 864, 697, 209, 73, 620, 47, 478, 705]
[694, 500, 755, 433, 706, 695, 892, 107, 184, 771, 226, 570, 971, 65, 341, 460, 65, 505, 645, 738, 859, 218, 208, 428, 130, 734, 241, 716, 992, 537, 558, 501, 469, 290, 556]
[209, 594, 145, 182, 363]
[57, 899, 451, 300, 36, 20, 749, 950, 899, 775, 997, 201, 318, 951, 461, 884, 755, 823, 134, 77, 206, 398, 553, 791, 329, 952, 552, 545, 533, 516, 908, 709, 554, 392, 154, 970, 792, 24, 802, 610, 482, 416, 638, 850, 75, 789, 944, 842]
[840, 391, 484, 69, 455, 862, 532, 533, 255, 196, 802, 983, 259, 861]
[40, 817, 501, 84, 774, 377, 702, 213, 867, 785, 710, 516, 769, 643, 706, 532, 966, 757, 581, 481, 815, 670, 65, 225, 184, 525, 134, 62, 174, 327, 499, 322, 83, 741, 182]
[732, 966]
[960, 684, 980, 423, 519, 418, 931, 682, 989, 97, 696, 599, 118, 406, 929, 445, 464, 137, 617, 176, 550, 651, 844, 736, 855, 885, 121, 784, 525, 134, 466, 886, 737, 529, 13, 325, 847, 618, 843, 325, 918, 577, 942, 608, 131, 72, 17, 147, 635, 761, 538, 73, 591, 794, 788, 911, 713, 528, 982, 612, 397, 646, 138, 522, 560, 856, 992, 83, 133, 463, 906, 563, 294, 378, 21, 451, 955, 521, 806, 478, 258, 392, 41, 295, 890, 988, 381, 737, 786, 309, 187, 948, 118]
[97, 820, 559, 249, 328, 595, 249, 413, 936, 904, 294, 732, 290, 104, 504, 628, 629, 231, 470, 578, 895, 923, 915, 211, 294, 481, 204, 501, 584, 889, 442, 802, 545]
[599, 978, 717, 78, 373, 602, 522, 188, 47, 988, 46, 412, 81, 496, 940, 23, 132, 678, 87, 640, 330, 582, 67, 52, 133, 628, 420, 238, 803, 417, 366, 455, 990, 625, 891, 381, 169, 772, 462, 390, 74, 895, 764, 544, 911, 486, 507, 987, 349, 904, 32, 366, 826, 760, 349, 402, 34, 128, 710, 593, 466, 360, 111, 508, 795, 829, 790, 93, 826, 880, 927, 430, 903, 122, 637, 408, 413, 132, 245, 946, 170, 916, 535, 857, 90, 372, 264, 192, 308, 119, 105]
[667, 715, 744, 131, 57, 21, 496, 314, 188, 551, 660, 539, 131, 964, 938, 351, 142, 522, 849, 765, 646, 877, 613, 477, 103, 896, 398, 492, 139, 720, 533, 110, 505, 409, 694, 513, 761, 912, 80, 38, 195, 350, 395, 13, 436, 473, 161, 270, 880, 947, 691, 963, 43, 10, 117, 317, 643, 921, 120, 822, 755, 419, 99]
[942, 764, 207, 953, 344, 613, 954, 567, 537, 896, 267, 599, 552, 122, 550, 789, 189, 17, 87, 291]
[830, 913, 886, 532, 416, 23, 970, 635, 829, 933, 543, 16]
[202, 429, 24, 126, 342, 727, 421, 857, 453, 27, 624, 60, 376, 95, 506, 605, 913, 635, 16, 988, 826, 142, 415, 493, 521, 972, 467, 652, 328, 577, 202, 39, 409, 684, 157, 602]
[770, 403, 101, 202, 98, 813, 776, 930, 869, 935, 815, 515, 357, 822, 169, 237, 272, 84, 533, 744, 619, 513, 626, 605, 516, 952, 405, 987, 23, 633, 687, 959, 440, 866, 672, 9, 569, 902, 115, 322, 835, 69, 701, 964, 173, 46, 928, 440, 559, 951, 284, 879, 802, 86, 836, 313, 127, 426, 291, 139, 396, 474, 872, 470, 833, 804, 465, 399, 673, 475, 200, 893, 316, 270, 174, 219, 482, 106, 208, 93, 53, 141, 402, 665, 301, 352, 148, 805, 425, 594, 632, 344, 490, 15, 507, 323, 344, 301, 277]
[455, 970, 451, 281, 185, 943, 410, 427, 51, 986, 135, 180, 133, 659, 816, 127, 26, 986, 446, 251, 57, 27, 977, 240, 563, 461, 578, 919, 646, 126, 222, 695, 192, 346, 577, 975, 96, 742, 644, 324, 75, 279, 659, 147, 82, 708, 552, 955, 504, 115, 875, 213, 798, 994, 566, 407, 265, 281, 242, 587, 797, 635, 64, 178, 866, 574, 750, 834, 209, 223, 701, 340, 148, 704, 222, 874, 171, 885, 936, 555, 344, 340, 104, 347, 134, 658, 106, 395, 598, 396]
[921, 54, 484, 389, 377, 900, 288, 902, 539, 123, 447, 83, 666, 771, 431, 69, 152, 429, 918, 437, 175, 186, 169, 994, 636, 670, 509, 493, 343, 886, 220, 218, 344, 602, 46, 90, 97, 944, 35, 292, 925, 177, 42, 479, 890, 755, 193, 560, 504, 496, 610, 121, 0, 38, 858, 823, 461, 869, 945, 409, 617, 846, 232, 132, 946, 819, 501, 554, 26, 51, 330, 865, 715, 783, 132, 299, 728, 545, 390, 534, 527, 295, 929, 626, 453, 518, 710, 444, 393, 229, 788, 762, 587, 879]
*/