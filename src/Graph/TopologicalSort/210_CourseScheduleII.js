/*
There are a total of n courses you have to take labelled from 0 to n - 1.

Some courses may have prerequisites, for example, if prerequisites[i] = [ai, bi] this means you must take the course bi before the course ai.

Given the total number of courses numCourses and a list of the prerequisite pairs, return the ordering of courses you should take to finish all courses.

If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.



Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
Example 2:

Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3]
Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
Example 3:

Input: numCourses = 1, prerequisites = []
Output: [0]
*/

// Topological Sort

var findOrder = function (numCourses, prerequisites) {
  const adjList = new Array(numCourses).fill(null).map(() => []);
  const numPrereqs = new Array(numCourses).fill(0);
  const output = [];

  for (let [course, prereq] of prerequisites) {
    adjList[prereq].push(course);
    numPrereqs[course] += 1;
  }

  const queue = [];
  for (let i = 0; i < numPrereqs.length; i += 1) {
    if (numPrereqs[i] === 0) {
      queue.push(i);
    }
  }

  while (queue.length) {
    const curr = queue.shift();
    output.push(curr);
    for (let course of adjList[curr]) {
      numPrereqs[course] -= 1;
      if (!numPrereqs[course]) queue.push(course);
    }
  }

  return output.length === numCourses ? output : [];
};

// DFS (faster)

var findOrder = function (numCourses, prerequisites) {
  let adjList = Array(numCourses).fill(null).map(() => Array(0));
  let visited = {};
  let schedule = [];

  for (let prereq of prerequisites) {
    adjList[prereq[0]].push(prereq[1]);
  }

  for (let val in adjList) {
    if (visited[val] === undefined) {
      if (!helper(val, adjList, visited, schedule)) return [];
    }
  }

  return schedule;
}

var helper = (val, adjList, visited, schedule) => {
  if (visited[val]) return false;
  if (visited[val] === false) return true;

  visited[val] = true;

  for (let dependency of adjList[val]) {
    if (!helper(dependency, adjList, visited, schedule)) return false;
  }

  visited[val] = false;
  schedule.push(+val);

  return true;
}