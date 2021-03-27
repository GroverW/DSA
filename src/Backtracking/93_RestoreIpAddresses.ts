/*
Given a string s containing only digits, return all possible valid IP addresses that can be obtained from s. You can return them in any order.

A valid IP address consists of exactly four integers, each integer is between 0 and 255, separated by single dots and cannot have leading zeros. For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses and "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses. 

 

Example 1:

Input: s = "25525511135"
Output: ["255.255.11.135","255.255.111.35"]
Example 2:

Input: s = "0000"
Output: ["0.0.0.0"]
Example 3:

Input: s = "1111"
Output: ["1.1.1.1"]
Example 4:

Input: s = "010010"
Output: ["0.10.0.10","0.100.1.0"]
Example 5:

Input: s = "101023"
Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
 

Constraints:

0 <= s.length <= 3000
s consists of digits only.
*/

// recursive
function restoreIpAddresses(s: string): string[] {
  if (s.length > 12 || s.length < 4) return [];
  
  const visited = new Set();
  const ipAddresses: string[] = [];
  
  const findIps = (start: number, parts: string[]) => {
    if(parts.length === 4) {
      if (start !== s.length) return;
      const ipAddress = parts.join('.');
      if (!visited.has(ipAddress)) ipAddresses.push(ipAddress);
      return;
    }
    
    parts.push('');
    for (let i = start; i < start + 3; i += 1) {
      parts[parts.length - 1] += s[i];
      
      const current = parts[parts.length - 1];
      
      if ((current.length > 1 && current[0] === '0') || +current > 255) {
        break;
      }
      
      findIps(i + 1, parts);
    }
    
    parts.pop();
  }
  
  findIps(0, []);
  return ipAddresses;
};

// iterative
var restoreIpAddresses = function(s: string): string[] {
  if (s.length > 12 || s.length < 4) return [];
  
  const ipAddresses = [];
  
  const isInvalid = (part) => (
    (part[0] === '0' && part.length > 1)
    || +part > 255
  );
  
  for(let i = 0; i < 3; i += 1) {
    const first = s.slice(0,i+1);
    if(isInvalid(first)) break;
    for(let j = i+1; j <= i + 3; j += 1) {
      const second = s.slice(i+1, j+1);
      if(isInvalid(second)) break;
      for(let k = j + 1; k <= j+3; k += 1) {
        const third = s.slice(j+1, k+1);
        if(isInvalid(third)) break;
        
        const fourth = s.slice(k+1);
        if(!fourth || isInvalid(fourth)) continue;
        
        ipAddresses.push(`${first}.${second}.${third}.${fourth}`);
      }
    }
  }
  
  return ipAddresses;
};