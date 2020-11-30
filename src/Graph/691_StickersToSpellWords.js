/*
We are given N different types of stickers. Each sticker has a lowercase English word on it.

You would like to spell out the given target string by cutting individual letters from your collection of stickers and rearranging them.

You can use each sticker more than once if you want, and you have infinite quantities of each sticker.

What is the minimum number of stickers that you need to spell out the target? If the task is impossible, return -1.

Example 1:

Input:

["with", "example", "science"], "thehat"
Output:

3
Explanation:

We can use 2 "with" stickers, and 1 "example" sticker.
After cutting and rearrange the letters of those stickers, we can form the target "thehat".
Also, this is the minimum number of stickers necessary to form the target string.
Example 2:

Input:

["notice", "possible"], "basicbasic"
Output:

-1
Explanation:

We can't form the target "basicbasic" from cutting letters from the given stickers.
Note:

stickers has length in the range [1, 50].
stickers consists of lowercase English words (without apostrophes).
target has length in the range [1, 15], and consists of lowercase English letters.
In all test cases, all words were chosen randomly from the 1000 most common US English words, and the target was chosen as a concatenation of two random words.
The time limit may be more challenging than usual. It is expected that a 50 sticker test case can be solved within 35ms on average.
*/

var minStickers = function (stickers, target) {
  const visited = new Set();
  const queue = [target.split('')]
  let numStickers = 0;
  while (queue.length) {
    for (let i = queue.length - 1; i >= 0; i -= 1) {
      const current = queue.shift();

      if (!current.length) return numStickers;

      let next = [...current];
      for (let sticker of stickers) {
        let isChanged = false;
        for (let letter of sticker) {
          const idx = next.indexOf(letter);
          if (idx >= 0) {
            isChanged = true;
            next.splice(idx, 1);
          }
        }

        if (isChanged) {
          const lookup = next.join('');
          if (!visited.has(lookup)) {
            visited.add(lookup);
            queue.push(next);
          }
          next = [...current];
        }
      }
    }

    numStickers += 1;
  }

  return -1;
};

// const words = ["be", "and", "of", "a", "in", "to", "have", "too", "it", "I", "that", "for", "you", "he", "with", "on", "do", "say", "this", "they", "at", "but", "we", "his", "from", "that", "not", "can’t", "won’t", "by", "she", "or", "as", "what", "go", "their", "can", "who", "get", "if", "would", "her", "all", "my", "make", "about", "know", "will", "as", "up", "one", "time", "there", "year", "so", "think", "when", "which", "them", "some", "me", "people", "take", "out", "into", "just", "see", "him", "your", "come", "could", "now", "than", "like", "other", "how", "then", "its", "our", "two", "more", "these", "want", "way", "look", "first", "also", "new", "because", "day", "more", "use", "no", "man", "find", "here", "thing", "give", "many", "well", "only", "those", "tell", "one", "very", "her", "even", "back", "any", "good", "woman", "through", "us", "life", "child", "there", "work", "down", "may", "after", "should", "call", "world", "over", "school", "still", "try", "in", "as", "last", "ask", "need", "too", "feel", "three", "when", "state", "never", "become", "between", "high", "really", "something", "most", "another", "much", "family", "own", "out", "leave", "put", "old", "while", "mean", "on", "keep", "student", "why", "let", "great", "same", "big", "group", "begin", "seem", "country", "help", "talk", "where", "turn", "problem", "every", "start", "hand", "might", "American", "show", "part", "about", "against", "place", "over", "such", "again", "few", "case", "most", "week", "company", "where", "system", "each", "right", "program", "hear", "so", "question", "during", "work", "play", "government", "run", "small", "number", "off", "always", "move", "like", "night", "live", "Mr.", "point", "believe", "hold", "today", "bring", "happen", "next", "without", "before", "large", "all", "million", "must", "home", "under", "water", "room", "write", "mother", "area", "national", "money", "story", "young", "fact", "month", "different", "lot", "right", "study", "book", "eye", "job", "word", "though", "business", "issue", "side", "kind", "four", "head", "far", "black", "long", "both", "little", "house", "yes", "after", "since", "long", "provide", "service", "around", "friend", "important", "father", "sit", "away", "until", "power", "hour", "game", "often", "yet", "line", "political", "end", "among", "ever", "stand", "bad", "lose", "however", "member", "pay", "law", "meet", "car", "city", "almost", "include", "continue", "set", "later", "community", "much", "name", "five", "once", "white", "least", "president", "learn", "real", "change", "team", "minute", "best", "several", "idea", "kid", "body", "information", "nothing", "ago", "right", "lead", "social", "understand", "whether", "back", "watch", "together", "follow", "around", "parent", "only", "stop", "face", "anything", "create", "public", "already", "speak", "others", "read", "level", "allow", "add", "office", "spend", "door", "health", "person", "art", "sure", "such", "war", "history", "party", "within", "grow", "result", "open", "change", "morning", "walk", "reason", "low", "win", "research", "girl", "guy", "early", "food", "before", "moment", "himself", "air", "teacher", "force", "offer", "enough", "both", "education", "across", "although", "remember", "foot", "second", "boy", "maybe", "toward", "able", "age", "off", "policy", "everything", "love", "process", "music", "including", "consider", "appear", "actually", "buy", "probably", "human", "wait", "serve", "market", "die", "send", "expect", "home", "sense", "build", "stay", "fall", "oh", "nation", "plan", "cut", "college", "interest", "death", "course", "someone", "experience", "behind", "reach", "local", "kill", "six", "remain", "effect", "use", "yeah", "suggest", "class", "control", "raise", "care", "perhaps", "little", "late", "hard", "field", "else", "pass", "former", "sell", "major", "sometimes", "require", "along", "development", "themselves", "report", "role", "better", "economic", "effort", "up", "decide", "rate", "strong", "possible", "heart", "drug", "show", "leader", "light", "voice", "wife", "whole", "police", "mind", "finally", "pull", "return", "free", "military", "price", "report", "less", "according", "decision", "explain", "son", "hope", "even", "develop", "view", "relationship", "carry", "town", "road", "drive", "arm", "true", "federal", "break", "better", "difference", "thank", "receive", "value", "international", "building", "action", "full", "model", "join", "season", "society", "because", "tax", "director", "early", "position", "player", "agree", "especially", "record", "pick", "wear", "paper", "special", "space", "ground", "form", "support", "event", "official", "whose", "matter", "everyone", "center", "couple", "site", "end", "project", "hit", "base", "activity", "star", "table", "need", "court", "produce", "eat", "American", "teach", "oil", "half", "situation", "easy", "cost", "industry", "figure", "face", "street", "image", "itself", "phone", "either", "data", "cover", "quite", "picture", "clear", "practice", "piece", "land", "recent", "describe", "product", "doctor", "wall", "patient", "worker", "news", "test", "movie", "certain", "north", "love", "personal", "open", "support", "simply", "third", "technology", "catch", "step", "baby", "computer", "type", "attention", "draw", "film", "Republican", "tree", "source", "red", "nearly", "organization", "choose", "cause", "hair", "look", "point", "century", "evidence", "window", "difficult", "listen", "soon", "culture", "billion", "chance", "brother", "energy", "period", "course", "summer", "less", "realize", "hundred", "available", "plant", "likely", "opportunity", "term", "short", "letter", "condition", "choice", "place", "single", "rule", "daughter", "administration", "south", "husband", "Congress", "floor", "campaign", "material", "population", "well", "call", "economy", "medical", "hospital", "church ", "close", "thousand", "risk", "current", "fire", "future", "wrong", "involve", "defense", "anyone", "increase", "security", "bank", "myself", "certainly", "west", "sport", "board", "seek", "per", "subject", "officer", "private", "rest", "behavior", "deal", "performance", "fight", "throw", "top", "quickly", "past", "goal", "second", "bed", "order", "author", "fill", "represent", "focus", "foreign", "drop", "plan", "blood", "upon", "agency", "push", "nature", "color", "no", "recently", "store", "reduce", "sound", "note", "fine", "before", "near", "movement", "page", "enter", "share", "than", "common", "poor", "other", "natural", "race", "concern", "series", "significant", "similar", "hot", "language", "each", "usually", "response", "dead", "rise", "animal", "factor", "decade", "article", "shoot", "east", "save", "seven", "artist", "away", "scene", "stock", "career", "despite", "central", "eight", "thus", "treatment", "beyond", "happy", "exactly", "protect", "approach", "lie", "size", "dog", "fund", "serious", "occur", "media", "ready", "sign", "thought", "list", "individual", "simple", "quality", "pressure", "accept", "answer", "hard", "resource", "identify", "left", "meeting", "determine", "prepare", "disease", "whatever", "success", "argue", "cup", "particularly", "amount", "ability", "staff", "recognize", "indicate", "character", "growth", "loss", "degree", "wonder", "attack", "herself", "region", "television", "box", "TV", "training", "pretty", "trade", "deal", "election", "everybody", "physical", "lay", "general", "feeling", "standard", "bill", "message", "fail", "outside", "arrive", "analysis", "benefit", "name", "sex", "forward", "lawyer", "present", "section", "environmental", "glass", "answer", "skill", "sister", "PM", "professor", "operation", "financial", "crime", "stage", "ok", "compare", "authority", "miss", "design", "sort", "one", "act", "ten", "knowledge", "gun", "station", "blue", "state", "strategy", "little", "clearly", "discuss", "indeed", "force", "truth", "song", "example", "democratic", "check", "environment", "leg", "dark", "public", "various", "rather", "laugh", "guess", "executive", "set", "study", "prove", "hang", "entire", "rock", "design", "enough", "forget", "since", "claim", "note", "remove", "manager", "help", "close", "sound", "enjoy", "network", "legal", "religious", "cold", "form", "final", "main", "science", "green", "memory", "card", "above", "seat", "cell", "establish", "nice", "trial", "expert", "that", "spring", "firm", "Democrat", "radio", "visit", "management", "care", "avoid", "imagine", "tonight", "huge", "ball", "no", "close", "finish", "yourself", "talk", "theory", "impact", "respond", "statement", "maintain", "charge", "popular", "traditional", "onto", "reveal", "direction", "weapon", "employee", "cultural", "contain", "peace", "head", "control", "base", "pain", "apply", "play", "measure", "wide", "shake", "fly", "interview", "manage", "chair", "fish", "particular", "camera", "structure", "politics", "perform", "bit", "weight", "suddenly", "discover", "candidate", "top", "production", "treat", "trip", "evening", "affect", "inside", "conference", "unit", "best", "style", "adult", "worry", "range", "mention", "rather", "far", "deep", "front", "edge", "individual", "specific", "writer", "trouble", "necessary", "throughout", "challenge", "fear", "shoulder", "institution", "middle", "sea", "dream", "bar", "beautiful", "property", "instead", "improve", "stuff", "claim"];
// for (let i = 0; i < 30; i += 1) {
//   const targetPart1 = Math.floor(Math.random() * words.length);
//   const targetPart2 = Math.floor(Math.random() * words.length);
//   const target = words[targetPart1] + words[targetPart2];

//   const numWords = Math.floor(Math.random() * 50) + 1;
//   const taken = new Set();
//   const wordList = [];
//   for(let j = 0; j < numWords; j += 1) {
//     let word = Math.floor(Math.random() * words.length);
//     while(word === targetPart1 || word === targetPart2 || taken.has(word)) {
//       word = Math.floor(Math.random() * words.length);
//     }
//     taken.add(word);
//     wordList.push(words[word]);
//   }

//   logOutList(`[${printRow(wordList)} ${target}]`);
// }

const tests = [
  [["with", "example", "science"], "thehat"],
  [["notice", "possible"], "basicbasic"],
  [["fight", "recent", "age", "more", "change", "anything", "oil", "mind", "skill", "off", "worker", "close", "home", "month", "experience"], "allissue"],
  [["maybe", "her", "religious", "military", "near", "long", "really", "analysis", "specific", "sport", "time", "one", "off", "fail", "among", "several", "right", "show", "artist", "plan", "large", "certain", "great", "both", "move", "design", "issue", "security", "century", "least", "last", "bring", "teach", "send", "success", "die", "yes", "college", "boy", "either", "keep", "other", "individual", "legal", "around", "market", "within", "rule", "force", "bad"], "teacherfive"],
  [["movie", "ready", "author", "bank", "up", "little", "picture", "fill", "simple", "poor", "since", "other", "thus", "mention", "dream", "board", "type", "little", "top", "environment", "if", "national", "start", "special", "analysis", "happen", "visit", "no", "save", "player", "much", "miss", "boy", "American", "process", "office", "level", "market", "compare", "test", "how", "bit", "me", "with", "company"], "identifytheory"],
  [["improve", "chair", "environmental", "late"], "valuefly"],
  [["miss", "keep", "even", "we", "page", "dog", "fall", "public", "note", "around", "clear", "accept", "pretty", "oh", "eight"], "legalglass"],
  [["today", "than", "after", "administration", "her", "turn", "theory", "her", "where", "deal", "add", "necessary", "report", "would", "place", "huge", "probably", "open", "father", "start", "study", "possible", "exactly", "film", "billion", "charge", "difficult", "land", "know", "prepare", "sometimes", "picture", "position", "experience", "people", "future", "upon", "specific", "support", "who", "network", "send", "impact", "tax", "because", "report", "physical", "employee", "control"], "bothfeeling"],
  [["die", "identify", "campaign", "clearly", "challenge", "position", "into", "on", "several", "in", "only", "contain", "enter", "son", "put"], "hearremove"],
  [["computer"], "Republicangame"],
  [["his", "base", "open", "control", "movement", "now", "page", "fear", "TV", "final", "example", "difficult", "together", "source", "through", "level", "wrong"], "truthcourse"],
  [["scene", "light", "suddenly", "fish", "black", "special", "woman", "laugh", "read", "director", "away", "won’t", "give", "and", "public", "once", "face", "phone", "child", "chair", "industry", "production", "car", "back", "life", "technology", "ten", "himself", "store", "hear", "mention", "set", "seat", "true", "down", "poor", "test", "it"], "staffaround"],
  [["save", "crime", "with", "science", "model", "star", "how", "stage", "fear", "show", "message", "across", "history"], "itssimilar"],
  [["bad", "Mr.", "service", "move", "activity", "of", "cold", "south", "little", "already", "figure", "reach", "such", "employee", "only", "thing", "home", "public", "value", "produce", "every", "this", "always", "since", "talk", "later", "support", "enter", "community", "back", "evening", "best", "price", "let"], "increasepush"],
  [["thus", "help", "trip", "who", "begin", "stock", "phone", "up", "teacher", "simple", "fish", "care", "remove", "institution", "name", "something", "its", "meeting", "friend", "including", "fail", "that", "plant", "main", "attention", "half", "doctor", "trade", "behind", "laugh", "kid", "seat", "particularly", "American", "dark", "more"], "seasonothers"],
  [["oh", "natural", "all", "television", "job", "talk", "pass", "language", "because", "than", "arm", "compare", "teacher", "call", "less", "view", "allow", "store", "energy", "letter", "there", "other", "her", "weapon", "after", "century", "of", "conference", "shoulder", "quickly", "peace", "draw", "south", "high", "girl", "executive", "ground"], "designfocus"],
  [["give", "before", "ask"], "beyondtraining"],
  [["wide", "open"], "teachspace"],
  [["in", "include", "subject", "or", "mean", "call", "box", "little", "American", "Republican", "rather", "every", "figure", "employee", "possible", "well", "various", "cut", "show", "system", "language", "enjoy", "become", "particular", "century", "of", "black", "contain"], "reachresult"],
  [["public", "avoid", "wait", "come", "camera", "physical", "factor", "opportunity", "need", "than", "environment", "however", "part", "on", "evidence", "order"], "littleside"],
  [["and", "even", "fine", "center", "great", "sound", "seem", "three", "dog", "goal", "doctor", "friend", "factor", "what", "hundred", "life", "power", "remember", "send", "around", "add", "unit", "wonder", "term", "anyone", "dark", "lose", "wife", "issue", "city", "movie"], "makeaccept"],
  [["list", "first", "open", "become", "final", "late", "short", "change", "clear", "after", "table", "action", "can’t", "no", "work", "available", "evidence", "easy", "opportunity", "film", "today", "about", "live", "measure", "seven", "off", "above", "cause", "age", "chair", "after", "grow", "character", "already", "art", "fall"], "yeseconomy"],
  [["action", "reduce", "condition", "once", "do", "head", "form", "teach", "yes", "into", "player", "foot", "door", "yeah", "why", "message"], "caseface"],
  [["ability", "type", "love", "cause", "red", "before", "daughter", "live", "table", "Republican", "listen", "to", "character", "much", "building", "like", "require", "base", "individual", "everyone", "manager", "behind", "technology", "develop", "determine", "produce", "avoid", "really", "picture", "other", "prove", "money", "fund"], "leaderover"],
  [["child", "article", "discover", "thought", "thing", "change", "order", "minute", "letter", "sit", "follow", "including", "movement", "loss", "respond", "quickly", "strategy", "cover", "course", "their"], "anybody"],
  [["also", "talk", "financial", "air", "check", "open", "wide", "another", "plan", "man", "some", "finally", "town", "other", "before", "one", "fine", "expert", "able", "beautiful", "at", "social", "early", "tonight", "response", "various", "accept", "fact", "conference", "fail", "close", "large", "bar", "read", "region", "resource", "certainly"], "opportunityoften"],
  [["second", "dream", "hard", "defense", "these", "deal", "step", "control", "whether", "she", "hang", "disease", "should", "fly", "song", "music", "that", "hospital", "point", "story", "watch", "number", "action", "night", "student", "case", "study", "money", "not", "treat", "same", "it", "economic", "day", "star", "bank", "since", "record", "seek", "movie", "because", "health", "player", "character", "development", "happy", "often", "recently", "who"], "leaderdead"],
  [["almost", "pass", "system", "better"], "effortrole"],
  [["easy", "change", "individual", "hard", "join"], "wholeface"],
  [["learn", "American", "class", "rise", "forward", "of", "yourself", "change", "environmental", "open", "structure", "hair", "evening", "remember", "pass", "here", "former", "win", "game", "example", "bit", "actually", "run", "issue", "along", "everyone", "probably", "that", "which", "you", "interview", "movement", "current", "Democrat", "a", "less", "provide", "prove", "lead", "week", "before", "seat", "year", "away", "hand", "keep", "recent", "white"], "townresearch"],
  [["heart", "ago", "husband", "consider", "medical", "prepare", "one", "occur", "enjoy", "listen", "often", "before"], "inleg"],
  [["series", "end", "fear", "him", "great", "network", "here", "hope", "memory", "no", "institution", "so", "still", "health", "into", "ever", "call", "technology", "force", "new", "charge", "evidence", "everyone", "other", "present", "night", "executive", "certain", "offer", "build", "foot", "enter"], "outcost"],
];

for (let test of tests) {
  logOutList(minStickers(...test));
}

/*
["with", "example", "science"]
"thehat"
["notice", "possible"]
"basicbasic"
["fight", "recent", "age", "more", "change", "anything", "oil", "mind", "skill", "off", "worker", "close", "home", "month", "experience"]
"allissue"
["maybe", "her", "religious", "military", "near", "long", "really", "analysis", "specific", "sport", "time", "one", "off", "fail", "among", "several", "right", "show", "artist", "plan", "large", "certain", "great", "both", "move", "design", "issue", "security", "century", "least", "last", "bring", "teach", "send", "success", "die", "yes", "college", "boy", "either", "keep", "other", "individual", "legal", "around", "market", "within", "rule", "force", "bad"]
"teacherfive"
["movie", "ready", "author", "bank", "up", "little", "picture", "fill", "simple", "poor", "since", "other", "thus", "mention", "dream", "board", "type", "little", "top", "environment", "if", "national", "start", "special", "analysis", "happen", "visit", "no", "save", "player", "much", "miss", "boy", "American", "process", "office", "level", "market", "compare", "test", "how", "bit", "me", "with", "company"]
"identifytheory"
["improve", "chair", "environmental", "late"]
"valuefly"
["miss", "keep", "even", "we", "page", "dog", "fall", "public", "note", "around", "clear", "accept", "pretty", "oh", "eight"]
"legalglass"
["today", "than", "after", "administration", "her", "turn", "theory", "her", "where", "deal", "add", "necessary", "report", "would", "place", "huge", "probably", "open", "father", "start", "study", "possible", "exactly", "film", "billion", "charge", "difficult", "land", "know", "prepare", "sometimes", "picture", "position", "experience", "people", "future", "upon", "specific", "support", "who", "network", "send", "impact", "tax", "because", "report", "physical", "employee", "control"]
"bothfeeling"
["die", "identify", "campaign", "clearly", "challenge", "position", "into", "on", "several", "in", "only", "contain", "enter", "son", "put"]
"hearremove"
["computer"]
"Republicangame"
["his", "base", "open", "control", "movement", "now", "page", "fear", "TV", "final", "example", "difficult", "together", "source", "through", "level", "wrong"]
"truthcourse"
["scene", "light", "suddenly", "fish", "black", "special", "woman", "laugh", "read", "director", "away", "won’t", "give", "and", "public", "once", "face", "phone", "child", "chair", "industry", "production", "car", "back", "life", "technology", "ten", "himself", "store", "hear", "mention", "set", "seat", "true", "down", "poor", "test", "it"]
"staffaround"
["save", "crime", "with", "science", "model", "star", "how", "stage", "fear", "show", "message", "across", "history"]
"itssimilar"
["bad", "Mr.", "service", "move", "activity", "of", "cold", "south", "little", "already", "figure", "reach", "such", "employee", "only", "thing", "home", "public", "value", "produce", "every", "this", "always", "since", "talk", "later", "support", "enter", "community", "back", "evening", "best", "price", "let"]
"increasepush"
["thus", "help", "trip", "who", "begin", "stock", "phone", "up", "teacher", "simple", "fish", "care", "remove", "institution", "name", "something", "its", "meeting", "friend", "including", "fail", "that", "plant", "main", "attention", "half", "doctor", "trade", "behind", "laugh", "kid", "seat", "particularly", "American", "dark", "more"]
"seasonothers"
["oh", "natural", "all", "television", "job", "talk", "pass", "language", "because", "than", "arm", "compare", "teacher", "call", "less", "view", "allow", "store", "energy", "letter", "there", "other", "her", "weapon", "after", "century", "of", "conference", "shoulder", "quickly", "peace", "draw", "south", "high", "girl", "executive", "ground"]
"designfocus"
["give", "before", "ask"]
"beyondtraining"
["wide", "open"]
"teachspace"
["in", "include", "subject", "or", "mean", "call", "box", "little", "American", "Republican", "rather", "every", "figure", "employee", "possible", "well", "various", "cut", "show", "system", "language", "enjoy", "become", "particular", "century", "of", "black", "contain"]
"reachresult"
["public", "avoid", "wait", "come", "camera", "physical", "factor", "opportunity", "need", "than", "environment", "however", "part", "on", "evidence", "order"]
"littleside"
["and", "even", "fine", "center", "great", "sound", "seem", "three", "dog", "goal", "doctor", "friend", "factor", "what", "hundred", "life", "power", "remember", "send", "around", "add", "unit", "wonder", "term", "anyone", "dark", "lose", "wife", "issue", "city", "movie"]
"makeaccept"
["list", "first", "open", "become", "final", "late", "short", "change", "clear", "after", "table", "action", "can’t", "no", "work", "available", "evidence", "easy", "opportunity", "film", "today", "about", "live", "measure", "seven", "off", "above", "cause", "age", "chair", "after", "grow", "character", "already", "art", "fall"]
"yeseconomy"
["action", "reduce", "condition", "once", "do", "head", "form", "teach", "yes", "into", "player", "foot", "door", "yeah", "why", "message"]
"caseface"
["ability", "type", "love", "cause", "red", "before", "daughter", "live", "table", "Republican", "listen", "to", "character", "much", "building", "like", "require", "base", "individual", "everyone", "manager", "behind", "technology", "develop", "determine", "produce", "avoid", "really", "picture", "other", "prove", "money", "fund"]
"leaderover"
["child", "article", "discover", "thought", "thing", "change", "order", "minute", "letter", "sit", "follow", "including", "movement", "loss", "respond", "quickly", "strategy", "cover", "course", "their"]
"anybody"
["also", "talk", "financial", "air", "check", "open", "wide", "another", "plan", "man", "some", "finally", "town", "other", "before", "one", "fine", "expert", "able", "beautiful", "at", "social", "early", "tonight", "response", "various", "accept", "fact", "conference", "fail", "close", "large", "bar", "read", "region", "resource", "certainly"]
"opportunityoften"
["second", "dream", "hard", "defense", "these", "deal", "step", "control", "whether", "she", "hang", "disease", "should", "fly", "song", "music", "that", "hospital", "point", "story", "watch", "number", "action", "night", "student", "case", "study", "money", "not", "treat", "same", "it", "economic", "day", "star", "bank", "since", "record", "seek", "movie", "because", "health", "player", "character", "development", "happy", "often", "recently", "who"]
"leaderdead"
["almost", "pass", "system", "better"]
"effortrole"
["easy", "change", "individual", "hard", "join"]
"wholeface"
["learn", "American", "class", "rise", "forward", "of", "yourself", "change", "environmental", "open", "structure", "hair", "evening", "remember", "pass", "here", "former", "win", "game", "example", "bit", "actually", "run", "issue", "along", "everyone", "probably", "that", "which", "you", "interview", "movement", "current", "Democrat", "a", "less", "provide", "prove", "lead", "week", "before", "seat", "year", "away", "hand", "keep", "recent", "white"]
"townresearch"
["heart", "ago", "husband", "consider", "medical", "prepare", "one", "occur", "enjoy", "listen", "often", "before"]
"inleg"
["series", "end", "fear", "him", "great", "network", "here", "hope", "memory", "no", "institution", "so", "still", "health", "into", "ever", "call", "technology", "force", "new", "charge", "evidence", "everyone", "other", "present", "night", "executive", "certain", "offer", "build", "foot", "enter"]
"outcost"
*/