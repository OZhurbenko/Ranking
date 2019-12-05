
const dataServiceConfig = require('../../../config/config');
const DataService = require('../data/DataService');
const rankingUseCases = require('../data/rankingSettings');


class RankingService {
  constructor(userDetails) {
    this.currentUser = userDetails;

    this.dataService = new DataService(dataServiceConfig);
  }

  // main class function
  getTopSuggestions() {
    const { currentUser } = this;

    return new Promise((resolve, reject) => {
      this.dataService.getAllUsers()
      .then((users) => {
        const suggestedConnections = filterSuggestions(users, currentUser);
        return resolve(suggestedConnections);
      })
      .catch((err) => {
        return reject(err);
      });
    })
  }
}

// filter function that expects an array of users fetched from DB
// retrieves score for each user relative to the current user
// and returns top 3 matches for the current user
function filterSuggestions(users, currentUser) {

  // an array of objects to keep users together with their score
  const filteredUsers = [];
  users.filter(user => {
    // getting the score for the current user
    const score = getScore(user, currentUser);

    if(filteredUsers[score]) {
      return filteredUsers[score].users.push(user);
    } 
    filteredUsers[score] = {
      score: score,
      users: [],
    };
    return filteredUsers[score].users.push(user);
  });

  // getting the keys
  let keys = Object.keys(filteredUsers);
  // sort keys by the highest score, result should be ['100','90','80'..] etc
  // alternatively we could say (a,b) => Number(b) - Number(a), then we don't need to keep score in the object
  keys.sort((a,b) => filteredUsers[b].score - filteredUsers[a].score);

  // populating the final result with top 3 highest ranked connections
  const finalSuggestions = [];
  for (let i = 0; i < keys.length, finalSuggestions.length < 3; i += 1) {
    const { users } = filteredUsers[keys[i]];
    for(let j = 0; j < users.length, finalSuggestions.length < 3; j += 1) {
      finalSuggestions.push(users[j]);
    }
  }
  return finalSuggestions;
}

// helper function, iterates through the ranking use cases and returns the score for a user
function getScore(suggestedUser, currentUser) {
  // deactivated users get score 0
  if (suggestedUser.deactivated) {
    return 0;
  }

  const score = 0;

  for (let i = 0; i < rankingUseCases.length; i += 1) {
    const { match: fields } = rankingUseCases[i];
    // matching fields between suggested and current users and update the score if it's ranked higher
    if (matchFields(fields, suggestedUser, currentUser) && rankingUseCases[i].score > score) {
      score = rankingUseCases[i].score;
    }
  }

  return score;
}

// helper function, compares fields between the current user and a suggested connection
// returns true or false
function matchFields(fields, suggestedUser, currentUser) {
  for(let j = 0; j < fields.length; j ++) {
    if (suggestedUser[fields[j]] !== currentUser[fields[j]]) {
      return false;
    }
  }

  return true;
}

module.exports = RankingService;
