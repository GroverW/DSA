/*
Given a string s of '(' , ')' and lowercase English characters. 

Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.

Formally, a parentheses string is valid if and only if:

It is the empty string, contains only lowercase characters, or
It can be written as AB (A concatenated with B), where A and B are valid strings, or
It can be written as (A), where A is a valid string.
 

Example 1:

Input: s = "lee(t(c)o)de)"
Output: "lee(t(c)o)de"
Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.
Example 2:

Input: s = "a)b(c)d"
Output: "ab(c)d"
Example 3:

Input: s = "))(("
Output: ""
Explanation: An empty string is also valid.
Example 4:

Input: s = "(a(b(c)d)"
Output: "a(b(c)d)"
 

Constraints:

1 <= s.length <= 10^5
s[i] is one of  '(' , ')' and lowercase English letters.
*/

var minRemoveToMakeValid = function(s) {
  const removeLeft = [];
  let balance = 0;
  
  for (let i = s.length - 1; i >= 0; i -= 1) {
    if (s[i] === '(' && !balance) continue;
    
    balance -= (s[i] ==='(');
    balance += (s[i] === ')')
    
    removeLeft.push(s[i]);
  }
  
  balance = 0;
  let validString = '';
  
  for (let i = removeLeft.length - 1; i >= 0; i -= 1) {
    if (removeLeft[i] === ')' && !balance) continue;
    
    balance -= (removeLeft[i] ===')');
    balance += (removeLeft[i] === '(')
    
    validString += removeLeft[i];
  }

  return validString;
};

/*

*/

// const maxLen = 50;

// for (let i = 0; i < 50; i += 1) {
//   const len = numberBetween(1, maxLen);

//   const parenString = new Array(len).fill('')
//     .map(() => randomLetter({ limit: 5, additional: '((())))' }))
//     .join('');


//   logOutList('"' + parenString + '",')
// // logOutList(printRow([commands, actions]) + ',')
// //   // logOutList(printRow(nums) + ',');
// //   // logOutList(n);
// //   // logOutList(printRow(actions) + '],')
// }

const tests = [
  "d)()b))(eea)))bbc)b(b))())a(((eb",
  "(e(d)))d)abb()b)(eb((()()e)))cdb)",
  "d(aec))a(()(e)e)b)b))d())c)))))abda(d()c()(",
  "d",
  "((a)c)aca)a(()))(",
  "b)(e((cbad)(",
  "cb)",
  ")d))()))b)((()e",
  ")cd)cdcde(eb()dd)))eedd)e",
  "a))(a(b()(c)()())d(())(",
  ")c))ad",
  "))((dd)baac((e)()b)()ad)b)(c())b)(dbb)",
  "(b))))(ea)dcdaaeda)((())())dcc((e",
  "(a(((()(c)(e(()d((bc)(c()bc((d(",
  "e(ce))((db)ee)ea))e)(bee()(()())ad(c)dd(b(())))b",
  ")eb()d()(c)d",
  ")",
  "a)e()a)c)()c)(((d((c)())())a)a)bdc((b)))))a(",
  "(()((()))()eb(ce)))dd()))))b)())c()b)))",
  "))d))bb)d()ad)(ce(aa)de((ad)a)ccd())c",
  "(aa)acc((e(d(())))daba(b))(ee))e)c)a)a(b)a",
  "ead(c))e(a(ea))a)e()a()bcba(d((bea()()(()b)a",
  "((d(b)ccea((((()(bc)adea(dddb)daeb(cea",
  "e())(a)b)ba()a)",
  ")e)ace((()a",
  "cbbc()d(ca(dc)((a(b)be()(",
  "d)()c))((b))((((d)dacdc",
  "())(c(cbc((a(e)d(ba)a(a))))(d))d)e)(a",
  "b))))c((((b)d)aca(b(ea))c)(b()(d))ce))c((cbcd))",
  "cd)a)e)(",
  "bea((()(ec)(ea)c(b((()ebc(b)((e",
  "a))((c()()(a)ad)(b()d(c())()dcb(ee()(deeece())",
  "dba)c())(ab(ea))))(bb)())eaba))b))",
  "c((",
  "()((a)d))a)ddb(b)e(eb)c)aeccc)",
  "eb)(e((c)(",
  ")(ae(((b()eb)()eee((ea(()de)b)b))a",
  ")()bc)()()cbeb(dc)ebc))((b(ea(e((c))(daa)(",
  ")((a(dc))c)e(b)a())(da(((c)())a)(bd",
  ")(e(a)))(c)ed)(b)ecc",
  ")))))a(bd)()a)bbaebb(()b)(ebb)e)()",
  "c()))abecd(((ee",
  "eeced()a",
  "))())a))dbb)(dadd)(bb)())e()(())cecbdb()",
  "a))c)b(",
  "e)()(adddd)(d(e()ae)a)()))(c(b)a)b)d)(b)d))())",
  "b))e(()c)))))((d)bc()dc)aa))(bacb)ca",
  "dbca)))ab)aa()))(((()abba))(c)(c()(d(e((ddec)c(b",
  "()(cee))(c)dca(((ebe))a)(d)aec))a))aed)(())",
  "))c()()(c)a)",
];

let i = 0;
for (let test of tests) {
  console.time(i);
    logOutList(minRemoveToMakeValid(test));
  console.timeEnd(i);
  i += 1;
}

/*
"d)()b))(eea)))bbc)b(b))())a(((eb"
"(e(d)))d)abb()b)(eb((()()e)))cdb)"
"d(aec))a(()(e)e)b)b))d())c)))))abda(d()c()("
"d"
"((a)c)aca)a(()))("
"b)(e((cbad)("
"cb)"
")d))()))b)((()e"
")cd)cdcde(eb()dd)))eedd)e"
"a))(a(b()(c)()())d(())("
")c))ad"
"))((dd)baac((e)()b)()ad)b)(c())b)(dbb)"
"(b))))(ea)dcdaaeda)((())())dcc((e"
"(a(((()(c)(e(()d((bc)(c()bc((d("
"e(ce))((db)ee)ea))e)(bee()(()())ad(c)dd(b(())))b"
")eb()d()(c)d"
")"
"a)e()a)c)()c)(((d((c)())())a)a)bdc((b)))))a("
"(()((()))()eb(ce)))dd()))))b)())c()b)))"
"))d))bb)d()ad)(ce(aa)de((ad)a)ccd())c"
"(aa)acc((e(d(())))daba(b))(ee))e)c)a)a(b)a"
"ead(c))e(a(ea))a)e()a()bcba(d((bea()()(()b)a"
"((d(b)ccea((((()(bc)adea(dddb)daeb(cea"
"e())(a)b)ba()a)"
")e)ace((()a"
"cbbc()d(ca(dc)((a(b)be()("
"d)()c))((b))((((d)dacdc"
"())(c(cbc((a(e)d(ba)a(a))))(d))d)e)(a"
"b))))c((((b)d)aca(b(ea))c)(b()(d))ce))c((cbcd))"
"cd)a)e)("
"bea((()(ec)(ea)c(b((()ebc(b)((e"
"a))((c()()(a)ad)(b()d(c())()dcb(ee()(deeece())"
"dba)c())(ab(ea))))(bb)())eaba))b))"
"c(("
"()((a)d))a)ddb(b)e(eb)c)aeccc)"
"eb)(e((c)("
")(ae(((b()eb)()eee((ea(()de)b)b))a"
")()bc)()()cbeb(dc)ebc))((b(ea(e((c))(daa)("
")((a(dc))c)e(b)a())(da(((c)())a)(bd"
")(e(a)))(c)ed)(b)ecc"
")))))a(bd)()a)bbaebb(()b)(ebb)e)()"
"c()))abecd(((ee"
"eeced()a"
"))())a))dbb)(dadd)(bb)())e()(())cecbdb()"
"a))c)b("
"e)()(adddd)(d(e()ae)a)()))(c(b)a)b)d)(b)d))())"
"b))e(()c)))))((d)bc()dc)aa))(bacb)ca"
"dbca)))ab)aa()))(((()abba))(c)(c()(d(e((ddec)c(b"
"()(cee))(c)dca(((ebe))a)(d)aec))a))aed)(())"
"))c()()(c)a)"
*/