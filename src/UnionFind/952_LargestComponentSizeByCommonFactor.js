/*
Given a non-empty array of unique positive integers A, consider the following graph:

There are A.length nodes, labelled A[0] to A[A.length - 1];
There is an edge between A[i] and A[j] if and only if A[i] and A[j] share a common factor greater than 1.
Return the size of the largest connected component in the graph.

 

Example 1:

Input: [4,6,15,35]
Output: 4

Example 2:

Input: [20,50,9,63]
Output: 2

Example 3:

Input: [2,3,6,7,4,12,21,39]
Output: 8

Note:

1 <= A.length <= 20000
1 <= A[i] <= 100000
*/

var largestComponentSize = function (A) {
  const groups = [];
  const groupSizes = [];
  const factors = {};

  const find = (startGroup) => {
    let group = groups[startGroup];
    while (groups[group] !== group) group = groups[group];
    groups[startGroup] = group;
    return group;
  }

  const merge = (group1, group2) => {
    if (group1 === group2) return group1;

    if (groupSizes[group1] >= groupSizes[group2]) {
      groupSizes[group1] += groupSizes[group2];
      groups[group2] = group1;
      return group1;
    }

    groupSizes[group2] += groupSizes[group1];
    groups[group1] = group2;
    return group2;
  }

  const addFactorGroup = (factor, group) => {
    const factorGroup = factors[factor];
    if (factorGroup !== undefined) {
      factors[factor] = merge(find(factorGroup), group);
    } else {
      factors[factor] = group;
    }
  }

  for (let i = 0; i < A.length; i += 1) {
    groups.push(i);
    groupSizes.push(1);

    const num = A[i];

    for (let factor = 2; factor ** 2 <= num; factor += 1) {
      if (!(num % factor)) addFactorGroup(factor, find(i));
      if (!((num / factor) % 1)) addFactorGroup(num / factor, find(i));
    }

    addFactorGroup(num, find(i));
  }

  return groupSizes.reduce((max, size) => Math.max(max, size), 0);
};

/*

*/


// const maxLen = 100;
// for (let i = 0; i < 50; i += 1) {
//   const len = Math.floor(Math.random() * maxLen) + 1;

//   const nums = new Array(len).fill(0)
//     .map(() => Math.floor(Math.random() * 1000) + 1);


//   logOutList(printRow(nums) + ',')
//   // logOutList(printRow(actions) + '],')
// }

const tests = [
  [4, 6, 15, 35],
  [20, 50, 9, 63],
  [2, 3, 6, 7, 4, 12, 21, 39],
  [553, 440, 981, 350, 852, 443, 735, 744, 802, 265, 46, 32, 813, 617, 249, 702, 391, 643, 991, 55, 333, 757, 98, 289, 830, 369, 443, 545, 17, 382, 160, 172, 273, 948, 111, 241, 847, 153, 3, 149, 170, 638, 164, 545, 703, 156, 535, 468, 753, 922, 494, 786, 949, 346, 533, 973, 14, 698, 984, 718],
  [84, 299, 386, 866, 731, 945, 906, 23, 863, 925, 910, 859, 586, 550, 976, 224],
  [585, 685, 773, 855, 985, 132, 658, 461, 318, 255, 963, 107, 176, 652, 172, 64, 865, 401, 550, 643, 123, 186, 274, 487, 965, 162, 460, 497, 166, 104, 68, 981],
  [872, 302, 617, 865, 953, 510, 483, 594, 600, 598, 842, 411, 626, 380, 753, 450, 131, 788, 111, 898, 495, 708, 884, 856, 269, 171, 754, 855, 194, 353, 955, 952, 462, 799, 57, 161, 903, 698, 789, 841, 338, 984, 579, 247, 755, 715, 935, 498, 308, 519, 859, 392, 741, 772, 652, 446, 295, 928, 597, 125, 962, 822, 708, 737, 581, 316, 292, 455, 571, 117, 596, 57, 315],
  [601, 126, 652, 557, 691, 941, 86, 406, 370, 893, 704, 346, 606, 472, 896, 264, 587, 856, 743, 322, 797, 974, 550, 643, 992, 234, 972, 359, 380, 94, 243, 853, 152, 653, 499, 979, 878, 5, 863, 631, 217, 29, 497, 311, 400, 864, 388, 311, 259, 561, 995, 796, 906, 797, 152, 118, 120, 332, 915, 965, 305, 166, 23, 428, 243, 291, 373, 296, 308, 967],
  [63, 999, 713, 501, 166, 203, 748, 154, 312, 433, 563, 664, 431, 569, 540, 477, 398, 372, 335, 168, 481, 681, 880, 720, 965, 361, 588],
  [266, 475, 620, 963, 615, 797, 475, 449, 723, 968, 141, 593, 737, 571, 481, 843],
  [890, 997, 199, 42, 720, 76, 257, 249, 899, 35, 796, 507, 31, 754, 309, 767, 724, 826, 460, 720, 364, 153, 212, 868, 54, 943, 590, 348, 793, 485, 817, 774, 575, 575, 990, 969, 893, 921, 235, 54, 211, 470, 972, 844, 620, 593, 454, 141, 672, 35, 997, 47, 106, 488, 323, 426, 972],
  [460, 489, 654, 436, 950],
  [444, 883, 997, 576, 513, 484, 198, 278, 404, 534, 686, 286, 452, 170, 118, 654, 681, 306, 684, 706, 100, 618, 524, 596, 510, 129, 802, 493, 122, 814, 736, 555, 424, 704, 970, 653, 687, 362, 198, 534, 496, 74, 318, 553, 183, 692, 601, 861, 476, 538, 742, 549, 852, 581, 226, 310, 109, 856, 101, 1000, 222, 907, 898, 207, 384, 874, 723, 75, 334, 75, 712, 793, 930, 554, 47, 31, 114, 92, 36],
  [924, 409, 621, 547, 398, 706, 363, 659, 147, 884, 759, 3, 892, 643, 936, 512, 665, 743, 828, 401, 562, 842, 931, 134, 187, 821, 358, 708, 358, 481, 367, 469, 887, 758, 1, 733, 334, 364, 424, 732, 173, 956, 972, 380, 444, 562, 989, 48, 855, 114, 404, 676, 912, 239, 927, 833, 6, 821, 82, 207, 496, 375, 959, 362, 441, 1, 106, 980, 9, 274, 500, 55],
  [574, 572, 863, 990, 310, 279, 495, 562, 817, 65, 89, 496, 449, 305, 195, 885, 942, 455, 24, 135, 165, 625, 890, 99, 230, 541, 484, 823, 238, 642, 203, 207, 265, 331, 271, 64, 493, 305, 358, 850, 180, 187, 420, 592, 200, 500, 467, 785, 788, 645, 261, 711, 435, 37, 531, 407, 455, 722, 182, 494, 919, 744, 660, 795, 502, 612, 547, 485, 976, 484],
  [924, 498, 829, 33, 545, 297, 118, 178, 81, 34, 518, 816, 755, 184, 387, 345, 635, 484, 183, 876, 179, 959, 82, 741, 81, 453, 261, 659, 819, 683, 683, 73, 550, 350, 403, 375, 279, 881, 788, 171, 596, 566, 800, 30, 786, 59, 406, 876, 619, 899, 800, 961, 824, 648, 329, 616, 780, 541, 502, 186, 149, 427, 914, 865, 431, 778, 717, 437, 516, 741, 540, 95, 976, 183, 68, 587, 988, 631, 498, 949, 743, 256, 666, 780, 268, 979, 187, 834, 671, 950, 226, 572, 352],
  [797, 785, 132, 102, 635, 187, 748, 865, 192, 185, 771, 994, 403, 139, 766, 246, 160, 979, 355, 194, 380, 546, 924, 19, 473, 695, 492, 62, 419, 594, 647, 64, 569, 1000, 617, 368, 467, 723, 232, 600, 858, 604, 175, 534, 338, 158, 850, 81, 317, 593, 41, 777, 632, 293, 794, 710, 230, 352, 129, 375, 173, 385, 267, 890, 70, 365, 151, 702, 384, 601, 616, 841, 695, 818, 48, 965, 346, 485, 179, 408, 618, 58, 933, 220, 652, 585, 141, 607, 404, 612, 270, 909, 788, 511, 40, 856, 935, 791],
  [567, 503, 2, 702, 140, 733, 772, 798, 351, 277, 409, 498, 353, 142, 576, 976, 917, 257, 228, 179, 598, 253, 623, 165, 392],
  [922, 485, 952],
  [736, 553, 813, 131, 499, 754, 314, 198, 384, 123, 481, 249, 943, 523, 849, 545, 414, 762, 598, 446, 293, 240, 716, 280, 673, 626, 928, 770, 961, 609, 484, 400, 252, 459, 134, 703, 265, 178, 116, 211, 896, 855],
  [512, 204, 400, 338, 64, 380, 276, 458, 685, 397, 450, 156, 714, 902, 732, 301, 358, 350, 233],
  [108, 525, 652, 112, 966, 534, 760, 65, 270, 120, 668, 347, 297, 215, 828, 180, 336, 485, 201, 541, 643, 833, 653, 240, 429, 948, 111, 836, 659, 512, 545, 407, 460, 365, 711, 188, 671, 181],
  [255, 659, 809, 374, 930, 819, 449, 603, 144, 403, 253, 160, 388, 632, 749, 879, 906, 755, 701, 787, 390, 445, 193, 590, 672, 276, 774, 661, 276, 386, 234, 167, 313, 539, 671, 493, 791, 647, 82, 350, 780, 782, 975, 830, 122, 921, 766, 972, 909, 841, 663, 136, 73, 140, 130, 189, 147, 806, 954, 510, 34, 807, 93, 157, 485, 668, 247, 870, 764, 768, 257],
  [503, 343, 288, 754, 982, 357, 952, 109, 786, 119, 736, 550, 578, 209, 246, 696, 343, 714, 707, 276, 912, 181, 274, 525, 600, 390, 293, 15, 233, 921, 845, 660, 402, 122, 416, 514, 563, 211, 828, 401, 308, 894, 1, 694, 376, 139, 638, 295, 197, 325, 937, 325, 195, 353, 867, 133, 101, 205, 424, 907, 657, 784, 265, 482, 618, 466, 122, 821, 553, 558, 487, 376, 366, 320, 793, 639, 110, 817, 966, 994, 289, 377, 344, 108, 248, 519, 154, 362],
  [666, 460, 537, 869, 323, 856, 570, 734, 841, 159, 828, 755, 178, 972, 380, 671, 67, 39, 529, 200, 91, 246, 462, 629, 49, 718, 801, 49, 564, 794, 113, 998, 503, 446, 606, 273, 232, 359, 50, 963, 612, 46, 660, 410, 539, 472, 596, 660, 155, 49, 903, 317, 680, 172, 167, 377, 18, 577, 504, 979, 247, 501, 350, 277],
  [873, 557, 510, 55, 307, 291, 350, 310, 787, 705, 867, 766, 24, 34, 601, 924, 504, 944, 839, 161, 487, 216, 815, 36, 378, 183, 329, 754, 293, 68, 234, 607, 541, 934, 539, 283, 412, 129, 399, 299, 889, 31, 794, 822, 13, 488, 521, 318, 977, 122, 392, 761, 911, 73, 450, 609, 59, 574, 789, 339, 614, 970, 327, 146, 581, 442, 932, 312, 103, 595, 967],
  [92, 150, 28, 587, 997, 766, 659, 620, 676, 485, 288, 991, 554, 220, 973, 270, 35, 802, 419, 443, 951, 187, 69, 162, 151, 449, 381, 81, 644, 318, 186, 261, 798, 330, 426, 705, 529, 409, 855, 343, 353, 98, 296, 240, 678, 67, 528, 366, 842, 796, 589, 676, 684, 919, 890, 441, 352, 67, 440, 480, 256, 752, 663, 158, 699, 541, 152, 556, 808, 87, 448, 443, 558, 288, 146, 411, 715, 695, 800, 738, 374, 782, 351, 325, 328, 171, 757, 748, 429, 698, 704, 786, 442, 76, 397],
  [387, 197, 464, 104, 882, 877, 777, 236, 266, 187, 553, 373, 494, 844, 59, 386, 168],
  [88, 561, 277, 891, 759, 613, 337, 469, 127, 899, 441, 484, 835, 182, 409, 479, 364, 97, 852, 326, 269, 297, 845, 542, 875, 479, 787, 943, 833, 141, 159, 698, 322, 417, 342, 865, 797, 880],
  [519, 904, 552, 927, 792, 388, 282, 771, 294, 833, 143, 986, 952, 934, 147, 927, 750, 121, 162, 800, 66, 817, 180, 375, 530, 819, 602, 849, 39, 920, 912, 372, 707, 306, 623, 764, 788, 994, 668, 946, 450, 530, 829, 185, 170, 912, 438],
  [126, 665],
  [223, 704, 786, 735, 545, 120, 735, 526, 825, 669, 317, 204, 340, 931, 82, 757, 85, 67, 75, 780, 826, 252, 647, 890, 235, 266, 485, 219, 769, 895, 248, 56, 789, 64, 328, 80, 717, 887, 208, 76, 376],
  [595, 452, 15, 213, 600],
  [708, 252, 299, 18, 195, 245, 707, 103, 638, 426, 597, 108, 984],
  [147, 784, 263, 56, 359, 619, 524, 10, 850, 861, 842, 954, 272, 45, 920, 61, 777, 906, 210, 91, 896, 950, 693, 124, 774, 370, 169, 560, 849, 552, 636, 632, 501, 482, 386, 936, 988, 55, 408, 954, 522, 580, 726, 244, 494, 872, 254],
  [958, 641, 556, 420, 23, 658, 990, 313, 323, 447, 781, 53, 518, 473, 346, 652, 846, 67, 580, 922, 684, 678, 335, 345, 6, 536],
  [545, 278, 239, 294, 491, 707, 587, 449, 83, 701, 244, 783, 444, 554, 405, 83, 111, 870, 986, 393, 481, 281, 137, 793, 650, 670, 879, 815, 979, 397, 15, 172, 920, 172, 901],
  [944, 201, 389, 782, 418, 11, 966, 739, 546, 332, 883, 886, 970, 377, 580, 938, 904, 904, 445, 263, 772, 982, 72, 620, 685, 624, 761, 953, 802, 518, 401, 851, 349, 774, 828, 591, 653, 429, 877, 204, 877, 421, 626, 675, 768, 350, 494, 121, 617, 665, 920, 974, 272, 759, 256, 486, 851, 586, 647, 900, 327, 221, 732, 217, 284, 336, 39, 584, 326, 526, 972, 915, 879, 193, 137, 294, 65, 59, 680, 598, 617, 803, 307, 661, 28, 806, 375, 915],
  [834, 927, 683, 254, 537, 994, 84, 193, 216, 874, 789, 78, 767, 721, 305, 22, 840, 749, 720, 1000, 288, 609, 969, 863, 516, 831, 86, 571, 266, 256, 697, 776, 901, 962, 711, 456, 199, 226, 144, 436, 610, 778, 775, 171, 67, 145, 914, 503, 533, 5, 787, 528, 810, 166, 491, 302, 15],
  [6, 63, 831, 975, 828, 997, 853, 244, 348, 283, 141, 325, 407, 856],
  [17, 126, 254, 318, 599, 73, 583, 568, 32, 174, 483, 518, 102, 539, 168, 380, 499, 308, 513, 936, 775, 857, 889, 611, 606, 196, 410, 474, 365, 912, 367, 135, 914, 413, 323, 993, 119, 694, 225, 865, 735, 666, 829, 501, 769, 670, 695, 940, 778, 166, 844, 285, 56],
  [359, 407, 891, 387, 445, 813, 313, 134, 409, 573, 914, 111, 138, 600, 154, 770, 940, 457, 238, 227, 584, 316, 98, 33, 752, 412, 924, 770, 122, 769, 75, 962, 734, 941, 798, 471, 325, 734, 267, 8, 72, 216, 343, 799, 405, 747, 281, 516, 507, 752, 686, 441, 471, 505],
  [909, 388, 941, 524, 911, 340, 633, 640],
  [31, 190, 491, 284, 471, 273, 150, 568, 212, 51, 752, 986, 206, 315, 799, 22, 522, 832, 146, 801, 986, 14, 963, 371, 81, 437, 381, 426, 925, 846, 723, 64, 567, 435, 777, 179, 223, 794, 799, 884, 439, 428, 11, 281, 183, 670, 393, 562, 912, 116, 284, 861, 475, 367, 489, 777, 493, 215, 494, 475, 163],
  [734, 537, 714, 479, 6, 471, 833, 2, 599, 694, 93, 670, 728, 284, 454, 795, 887, 714, 136, 984, 783, 936, 49, 216, 887, 278, 250, 56, 599, 514, 768, 615, 123, 864, 356, 822, 777, 147, 107, 112, 31, 29, 758, 946, 50, 215, 422, 563, 109, 73, 828, 598, 100, 98, 119, 779, 383, 59, 54, 452, 635, 811, 235, 314, 200, 730, 418, 518, 533, 4],
  [336, 511, 913, 8, 734],
  [442, 581, 235, 661, 111, 891, 598, 494, 707, 276, 453, 733, 568, 629, 144, 38, 239, 129, 460, 279, 711, 461, 853, 101, 578, 685, 177, 605, 975, 432, 981, 679, 738, 314, 408, 812, 877, 656, 942, 636, 940, 523, 994, 743, 223],
  [946, 267, 272, 875, 682, 900, 918, 117, 11, 599, 813, 607, 248, 148, 487, 969, 997, 545, 185, 166, 68, 90, 94, 232, 457, 347, 149, 627, 508, 936, 483, 78, 979, 827, 41, 946, 586],
  [720, 860, 529, 635, 583, 122, 651, 96, 837, 669, 381, 914, 145, 813, 256, 601, 464, 242, 456, 838, 649, 227, 862, 791, 915, 464, 312, 273, 926, 854, 704, 813, 821, 845, 62, 993, 539, 24, 50, 778, 652, 635, 334, 248, 42, 901, 813, 430, 809, 295, 422, 47, 37, 945, 390, 723, 813, 968, 906, 962, 502, 134, 213, 661, 153, 769, 185, 373, 251, 49, 992, 271, 630, 885, 13, 116, 662, 789, 314, 435, 187, 637, 725, 572, 520, 775, 756, 4, 592, 378, 559, 951],
  [29, 10, 597, 248, 339, 382, 414, 329, 25, 870, 579, 884, 106, 43, 868, 168, 67, 628, 469, 203, 309, 113, 62, 854, 402, 547, 26, 301, 927, 79, 203, 267, 793, 1, 301, 8, 386, 784, 10, 412, 436, 977, 220, 134, 859, 940, 251, 497],
  [196, 812, 26, 23, 901],
  [877, 213, 164, 718, 335, 349, 785, 299, 748, 168, 516, 755, 279, 925, 85, 673, 447, 703, 352, 241, 41, 169, 790, 609, 417, 109, 705, 92, 896, 405, 593, 392, 269, 235, 655, 948, 927, 38, 326, 646, 200, 579, 176, 608, 848, 588, 390, 31, 382, 273, 611, 500, 462, 925, 422, 648, 720, 832, 255, 615, 203, 227, 51, 23, 185, 892, 851, 385, 184, 102, 348, 772, 869],
  [587, 802, 976, 996, 306, 725, 111, 225, 418, 684, 522, 424, 920, 715, 391, 774, 526, 267, 314, 487, 458, 803, 237, 878, 48, 892, 137, 821, 574, 90, 208, 1000, 943, 797, 102, 808, 782, 182, 777, 254, 377, 696, 604, 476, 189, 408, 688, 700, 352, 725, 848, 186, 803, 560, 182, 98, 3, 215, 396, 379, 567, 850, 826, 337, 996, 591, 738, 673, 852, 351, 680, 437, 997, 86, 602, 234, 823, 930, 447],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(largestComponentSize(test));
  console.timeEnd(i);
  i += 1;
}

/*
[4, 6, 15, 35]
[20, 50, 9, 63]
[2, 3, 6, 7, 4, 12, 21, 39]
[553, 440, 981, 350, 852, 443, 735, 744, 802, 265, 46, 32, 813, 617, 249, 702, 391, 643, 991, 55, 333, 757, 98, 289, 830, 369, 443, 545, 17, 382, 160, 172, 273, 948, 111, 241, 847, 153, 3, 149, 170, 638, 164, 545, 703, 156, 535, 468, 753, 922, 494, 786, 949, 346, 533, 973, 14, 698, 984, 718]
[84, 299, 386, 866, 731, 945, 906, 23, 863, 925, 910, 859, 586, 550, 976, 224]
[585, 685, 773, 855, 985, 132, 658, 461, 318, 255, 963, 107, 176, 652, 172, 64, 865, 401, 550, 643, 123, 186, 274, 487, 965, 162, 460, 497, 166, 104, 68, 981]
[872, 302, 617, 865, 953, 510, 483, 594, 600, 598, 842, 411, 626, 380, 753, 450, 131, 788, 111, 898, 495, 708, 884, 856, 269, 171, 754, 855, 194, 353, 955, 952, 462, 799, 57, 161, 903, 698, 789, 841, 338, 984, 579, 247, 755, 715, 935, 498, 308, 519, 859, 392, 741, 772, 652, 446, 295, 928, 597, 125, 962, 822, 708, 737, 581, 316, 292, 455, 571, 117, 596, 57, 315]
[601, 126, 652, 557, 691, 941, 86, 406, 370, 893, 704, 346, 606, 472, 896, 264, 587, 856, 743, 322, 797, 974, 550, 643, 992, 234, 972, 359, 380, 94, 243, 853, 152, 653, 499, 979, 878, 5, 863, 631, 217, 29, 497, 311, 400, 864, 388, 311, 259, 561, 995, 796, 906, 797, 152, 118, 120, 332, 915, 965, 305, 166, 23, 428, 243, 291, 373, 296, 308, 967]
[63, 999, 713, 501, 166, 203, 748, 154, 312, 433, 563, 664, 431, 569, 540, 477, 398, 372, 335, 168, 481, 681, 880, 720, 965, 361, 588]
[266, 475, 620, 963, 615, 797, 475, 449, 723, 968, 141, 593, 737, 571, 481, 843]
[890, 997, 199, 42, 720, 76, 257, 249, 899, 35, 796, 507, 31, 754, 309, 767, 724, 826, 460, 720, 364, 153, 212, 868, 54, 943, 590, 348, 793, 485, 817, 774, 575, 575, 990, 969, 893, 921, 235, 54, 211, 470, 972, 844, 620, 593, 454, 141, 672, 35, 997, 47, 106, 488, 323, 426, 972]
[460, 489, 654, 436, 950]
[444, 883, 997, 576, 513, 484, 198, 278, 404, 534, 686, 286, 452, 170, 118, 654, 681, 306, 684, 706, 100, 618, 524, 596, 510, 129, 802, 493, 122, 814, 736, 555, 424, 704, 970, 653, 687, 362, 198, 534, 496, 74, 318, 553, 183, 692, 601, 861, 476, 538, 742, 549, 852, 581, 226, 310, 109, 856, 101, 1000, 222, 907, 898, 207, 384, 874, 723, 75, 334, 75, 712, 793, 930, 554, 47, 31, 114, 92, 36]
[924, 409, 621, 547, 398, 706, 363, 659, 147, 884, 759, 3, 892, 643, 936, 512, 665, 743, 828, 401, 562, 842, 931, 134, 187, 821, 358, 708, 358, 481, 367, 469, 887, 758, 1, 733, 334, 364, 424, 732, 173, 956, 972, 380, 444, 562, 989, 48, 855, 114, 404, 676, 912, 239, 927, 833, 6, 821, 82, 207, 496, 375, 959, 362, 441, 1, 106, 980, 9, 274, 500, 55]
[574, 572, 863, 990, 310, 279, 495, 562, 817, 65, 89, 496, 449, 305, 195, 885, 942, 455, 24, 135, 165, 625, 890, 99, 230, 541, 484, 823, 238, 642, 203, 207, 265, 331, 271, 64, 493, 305, 358, 850, 180, 187, 420, 592, 200, 500, 467, 785, 788, 645, 261, 711, 435, 37, 531, 407, 455, 722, 182, 494, 919, 744, 660, 795, 502, 612, 547, 485, 976, 484]
[924, 498, 829, 33, 545, 297, 118, 178, 81, 34, 518, 816, 755, 184, 387, 345, 635, 484, 183, 876, 179, 959, 82, 741, 81, 453, 261, 659, 819, 683, 683, 73, 550, 350, 403, 375, 279, 881, 788, 171, 596, 566, 800, 30, 786, 59, 406, 876, 619, 899, 800, 961, 824, 648, 329, 616, 780, 541, 502, 186, 149, 427, 914, 865, 431, 778, 717, 437, 516, 741, 540, 95, 976, 183, 68, 587, 988, 631, 498, 949, 743, 256, 666, 780, 268, 979, 187, 834, 671, 950, 226, 572, 352]
[797, 785, 132, 102, 635, 187, 748, 865, 192, 185, 771, 994, 403, 139, 766, 246, 160, 979, 355, 194, 380, 546, 924, 19, 473, 695, 492, 62, 419, 594, 647, 64, 569, 1000, 617, 368, 467, 723, 232, 600, 858, 604, 175, 534, 338, 158, 850, 81, 317, 593, 41, 777, 632, 293, 794, 710, 230, 352, 129, 375, 173, 385, 267, 890, 70, 365, 151, 702, 384, 601, 616, 841, 695, 818, 48, 965, 346, 485, 179, 408, 618, 58, 933, 220, 652, 585, 141, 607, 404, 612, 270, 909, 788, 511, 40, 856, 935, 791]
[567, 503, 2, 702, 140, 733, 772, 798, 351, 277, 409, 498, 353, 142, 576, 976, 917, 257, 228, 179, 598, 253, 623, 165, 392]
[922, 485, 952]
[736, 553, 813, 131, 499, 754, 314, 198, 384, 123, 481, 249, 943, 523, 849, 545, 414, 762, 598, 446, 293, 240, 716, 280, 673, 626, 928, 770, 961, 609, 484, 400, 252, 459, 134, 703, 265, 178, 116, 211, 896, 855]
[512, 204, 400, 338, 64, 380, 276, 458, 685, 397, 450, 156, 714, 902, 732, 301, 358, 350, 233]
[108, 525, 652, 112, 966, 534, 760, 65, 270, 120, 668, 347, 297, 215, 828, 180, 336, 485, 201, 541, 643, 833, 653, 240, 429, 948, 111, 836, 659, 512, 545, 407, 460, 365, 711, 188, 671, 181]
[255, 659, 809, 374, 930, 819, 449, 603, 144, 403, 253, 160, 388, 632, 749, 879, 906, 755, 701, 787, 390, 445, 193, 590, 672, 276, 774, 661, 276, 386, 234, 167, 313, 539, 671, 493, 791, 647, 82, 350, 780, 782, 975, 830, 122, 921, 766, 972, 909, 841, 663, 136, 73, 140, 130, 189, 147, 806, 954, 510, 34, 807, 93, 157, 485, 668, 247, 870, 764, 768, 257]
[503, 343, 288, 754, 982, 357, 952, 109, 786, 119, 736, 550, 578, 209, 246, 696, 343, 714, 707, 276, 912, 181, 274, 525, 600, 390, 293, 15, 233, 921, 845, 660, 402, 122, 416, 514, 563, 211, 828, 401, 308, 894, 1, 694, 376, 139, 638, 295, 197, 325, 937, 325, 195, 353, 867, 133, 101, 205, 424, 907, 657, 784, 265, 482, 618, 466, 122, 821, 553, 558, 487, 376, 366, 320, 793, 639, 110, 817, 966, 994, 289, 377, 344, 108, 248, 519, 154, 362]
[666, 460, 537, 869, 323, 856, 570, 734, 841, 159, 828, 755, 178, 972, 380, 671, 67, 39, 529, 200, 91, 246, 462, 629, 49, 718, 801, 49, 564, 794, 113, 998, 503, 446, 606, 273, 232, 359, 50, 963, 612, 46, 660, 410, 539, 472, 596, 660, 155, 49, 903, 317, 680, 172, 167, 377, 18, 577, 504, 979, 247, 501, 350, 277]
[873, 557, 510, 55, 307, 291, 350, 310, 787, 705, 867, 766, 24, 34, 601, 924, 504, 944, 839, 161, 487, 216, 815, 36, 378, 183, 329, 754, 293, 68, 234, 607, 541, 934, 539, 283, 412, 129, 399, 299, 889, 31, 794, 822, 13, 488, 521, 318, 977, 122, 392, 761, 911, 73, 450, 609, 59, 574, 789, 339, 614, 970, 327, 146, 581, 442, 932, 312, 103, 595, 967]
[92, 150, 28, 587, 997, 766, 659, 620, 676, 485, 288, 991, 554, 220, 973, 270, 35, 802, 419, 443, 951, 187, 69, 162, 151, 449, 381, 81, 644, 318, 186, 261, 798, 330, 426, 705, 529, 409, 855, 343, 353, 98, 296, 240, 678, 67, 528, 366, 842, 796, 589, 676, 684, 919, 890, 441, 352, 67, 440, 480, 256, 752, 663, 158, 699, 541, 152, 556, 808, 87, 448, 443, 558, 288, 146, 411, 715, 695, 800, 738, 374, 782, 351, 325, 328, 171, 757, 748, 429, 698, 704, 786, 442, 76, 397]
[387, 197, 464, 104, 882, 877, 777, 236, 266, 187, 553, 373, 494, 844, 59, 386, 168]
[88, 561, 277, 891, 759, 613, 337, 469, 127, 899, 441, 484, 835, 182, 409, 479, 364, 97, 852, 326, 269, 297, 845, 542, 875, 479, 787, 943, 833, 141, 159, 698, 322, 417, 342, 865, 797, 880]
[519, 904, 552, 927, 792, 388, 282, 771, 294, 833, 143, 986, 952, 934, 147, 927, 750, 121, 162, 800, 66, 817, 180, 375, 530, 819, 602, 849, 39, 920, 912, 372, 707, 306, 623, 764, 788, 994, 668, 946, 450, 530, 829, 185, 170, 912, 438]
[126, 665]
[223, 704, 786, 735, 545, 120, 735, 526, 825, 669, 317, 204, 340, 931, 82, 757, 85, 67, 75, 780, 826, 252, 647, 890, 235, 266, 485, 219, 769, 895, 248, 56, 789, 64, 328, 80, 717, 887, 208, 76, 376]
[595, 452, 15, 213, 600]
[708, 252, 299, 18, 195, 245, 707, 103, 638, 426, 597, 108, 984]
[147, 784, 263, 56, 359, 619, 524, 10, 850, 861, 842, 954, 272, 45, 920, 61, 777, 906, 210, 91, 896, 950, 693, 124, 774, 370, 169, 560, 849, 552, 636, 632, 501, 482, 386, 936, 988, 55, 408, 954, 522, 580, 726, 244, 494, 872, 254]
[958, 641, 556, 420, 23, 658, 990, 313, 323, 447, 781, 53, 518, 473, 346, 652, 846, 67, 580, 922, 684, 678, 335, 345, 6, 536]
[545, 278, 239, 294, 491, 707, 587, 449, 83, 701, 244, 783, 444, 554, 405, 83, 111, 870, 986, 393, 481, 281, 137, 793, 650, 670, 879, 815, 979, 397, 15, 172, 920, 172, 901]
[944, 201, 389, 782, 418, 11, 966, 739, 546, 332, 883, 886, 970, 377, 580, 938, 904, 904, 445, 263, 772, 982, 72, 620, 685, 624, 761, 953, 802, 518, 401, 851, 349, 774, 828, 591, 653, 429, 877, 204, 877, 421, 626, 675, 768, 350, 494, 121, 617, 665, 920, 974, 272, 759, 256, 486, 851, 586, 647, 900, 327, 221, 732, 217, 284, 336, 39, 584, 326, 526, 972, 915, 879, 193, 137, 294, 65, 59, 680, 598, 617, 803, 307, 661, 28, 806, 375, 915]
[834, 927, 683, 254, 537, 994, 84, 193, 216, 874, 789, 78, 767, 721, 305, 22, 840, 749, 720, 1000, 288, 609, 969, 863, 516, 831, 86, 571, 266, 256, 697, 776, 901, 962, 711, 456, 199, 226, 144, 436, 610, 778, 775, 171, 67, 145, 914, 503, 533, 5, 787, 528, 810, 166, 491, 302, 15]
[6, 63, 831, 975, 828, 997, 853, 244, 348, 283, 141, 325, 407, 856]
[17, 126, 254, 318, 599, 73, 583, 568, 32, 174, 483, 518, 102, 539, 168, 380, 499, 308, 513, 936, 775, 857, 889, 611, 606, 196, 410, 474, 365, 912, 367, 135, 914, 413, 323, 993, 119, 694, 225, 865, 735, 666, 829, 501, 769, 670, 695, 940, 778, 166, 844, 285, 56]
[359, 407, 891, 387, 445, 813, 313, 134, 409, 573, 914, 111, 138, 600, 154, 770, 940, 457, 238, 227, 584, 316, 98, 33, 752, 412, 924, 770, 122, 769, 75, 962, 734, 941, 798, 471, 325, 734, 267, 8, 72, 216, 343, 799, 405, 747, 281, 516, 507, 752, 686, 441, 471, 505]
[909, 388, 941, 524, 911, 340, 633, 640]
[31, 190, 491, 284, 471, 273, 150, 568, 212, 51, 752, 986, 206, 315, 799, 22, 522, 832, 146, 801, 986, 14, 963, 371, 81, 437, 381, 426, 925, 846, 723, 64, 567, 435, 777, 179, 223, 794, 799, 884, 439, 428, 11, 281, 183, 670, 393, 562, 912, 116, 284, 861, 475, 367, 489, 777, 493, 215, 494, 475, 163]
[734, 537, 714, 479, 6, 471, 833, 2, 599, 694, 93, 670, 728, 284, 454, 795, 887, 714, 136, 984, 783, 936, 49, 216, 887, 278, 250, 56, 599, 514, 768, 615, 123, 864, 356, 822, 777, 147, 107, 112, 31, 29, 758, 946, 50, 215, 422, 563, 109, 73, 828, 598, 100, 98, 119, 779, 383, 59, 54, 452, 635, 811, 235, 314, 200, 730, 418, 518, 533, 4]
[336, 511, 913, 8, 734]
[442, 581, 235, 661, 111, 891, 598, 494, 707, 276, 453, 733, 568, 629, 144, 38, 239, 129, 460, 279, 711, 461, 853, 101, 578, 685, 177, 605, 975, 432, 981, 679, 738, 314, 408, 812, 877, 656, 942, 636, 940, 523, 994, 743, 223]
[946, 267, 272, 875, 682, 900, 918, 117, 11, 599, 813, 607, 248, 148, 487, 969, 997, 545, 185, 166, 68, 90, 94, 232, 457, 347, 149, 627, 508, 936, 483, 78, 979, 827, 41, 946, 586]
[720, 860, 529, 635, 583, 122, 651, 96, 837, 669, 381, 914, 145, 813, 256, 601, 464, 242, 456, 838, 649, 227, 862, 791, 915, 464, 312, 273, 926, 854, 704, 813, 821, 845, 62, 993, 539, 24, 50, 778, 652, 635, 334, 248, 42, 901, 813, 430, 809, 295, 422, 47, 37, 945, 390, 723, 813, 968, 906, 962, 502, 134, 213, 661, 153, 769, 185, 373, 251, 49, 992, 271, 630, 885, 13, 116, 662, 789, 314, 435, 187, 637, 725, 572, 520, 775, 756, 4, 592, 378, 559, 951]
[29, 10, 597, 248, 339, 382, 414, 329, 25, 870, 579, 884, 106, 43, 868, 168, 67, 628, 469, 203, 309, 113, 62, 854, 402, 547, 26, 301, 927, 79, 203, 267, 793, 1, 301, 8, 386, 784, 10, 412, 436, 977, 220, 134, 859, 940, 251, 497]
[196, 812, 26, 23, 901]
[877, 213, 164, 718, 335, 349, 785, 299, 748, 168, 516, 755, 279, 925, 85, 673, 447, 703, 352, 241, 41, 169, 790, 609, 417, 109, 705, 92, 896, 405, 593, 392, 269, 235, 655, 948, 927, 38, 326, 646, 200, 579, 176, 608, 848, 588, 390, 31, 382, 273, 611, 500, 462, 925, 422, 648, 720, 832, 255, 615, 203, 227, 51, 23, 185, 892, 851, 385, 184, 102, 348, 772, 869]
[587, 802, 976, 996, 306, 725, 111, 225, 418, 684, 522, 424, 920, 715, 391, 774, 526, 267, 314, 487, 458, 803, 237, 878, 48, 892, 137, 821, 574, 90, 208, 1000, 943, 797, 102, 808, 782, 182, 777, 254, 377, 696, 604, 476, 189, 408, 688, 700, 352, 725, 848, 186, 803, 560, 182, 98, 3, 215, 396, 379, 567, 850, 826, 337, 996, 591, 738, 673, 852, 351, 680, 437, 997, 86, 602, 234, 823, 930, 447]
*/