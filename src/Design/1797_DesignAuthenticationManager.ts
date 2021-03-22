/*

*/
import { logOutList } from '../logging';


class AuthenticationManager {
  timeToLive: number;
  tokens: { [tokenId: string]: number };
  expirations: number[];
  nextToExpire: number;
  renewed: number;

  constructor(timeToLive: number) {
    this.timeToLive = timeToLive;
    this.tokens = {};
    this.expirations = [];
    this.nextToExpire = 0;
    this.renewed = 0;
  }

  generate(tokenId: string, currentTime: number): void {
    this.tokens[tokenId] = this.expirations.length;
    this.expirations.push(currentTime + this.timeToLive);
  }

  renew(tokenId: string, currentTime: number): void {
    if (
      !(tokenId in this.tokens)
      || this.expirations[this.tokens[tokenId]] <= currentTime
    ) {
      return;
    }
    this.expirations[this.tokens[tokenId]] = -1;
    this.renewed += 1;
    this.generate(tokenId, currentTime);
  }

  countUnexpiredTokens(currentTime: number): number {
    if (!this.expirations.length) {
      return 0;
    }

    while (
      this.nextToExpire < this.expirations.length
      && this.expirations[this.nextToExpire] <= currentTime
    ) {
      if (this.expirations[this.nextToExpire] < 0) {
        this.renewed -= 1;
      }
      this.nextToExpire += 1;
    }

    return this.expirations.length - this.nextToExpire - this.renewed;
  }
}

/*

*/


const tests: any[] = [
  [
    ["AuthenticationManager", "renew", "countUnexpiredTokens", "countUnexpiredTokens", "generate", "generate", "renew", "generate", "generate", "countUnexpiredTokens", "countUnexpiredTokens", "countUnexpiredTokens", "renew", "countUnexpiredTokens", "countUnexpiredTokens", "countUnexpiredTokens", "generate", "countUnexpiredTokens", "renew"],
    [[13], ["ajvy", 1], [3], [4], ["fuzxq", 5], ["izmry", 7], ["puv", 12], ["ybiqb", 13], ["gm", 14], [15], [18], [19], ["ybiqb", 21], [23], [25], [26], ["aqdm", 28], [29], ["puv", 30]],
  ]
];



let i: number = 0;
for (let test of tests) {
  const authenticationManager: AuthenticationManager = new AuthenticationManager(test[1][0][0]);
  console.time(i.toString());
  for (let i = 1; i < test[0].length; i += 1) {
    const command: string = test[0][i];
    const action: [string, number] | [number] = test[1][i];
    let tokenId: string = '';
    let currentTime: number = 0;
    if(action.length === 2) {
      [tokenId, currentTime] = action;
    } else {
      [currentTime] = action;
    }
    switch (command) {
      case 'renew':
        authenticationManager.renew(tokenId, currentTime);
        break;
      case 'generate':
        authenticationManager.generate(tokenId, currentTime);
        break;
      case 'countUnexpiredTokens':
        logOutList(authenticationManager.countUnexpiredTokens(currentTime));
        break;
      default:
        break;
    }
  }
  console.timeEnd(i.toString());
  i += 1;
}

/*

*/