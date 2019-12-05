const RankingService = require('../services/ranking/rankingService');

// api endpoint
const getSuggestions = async (req, res) => {
  // assuming we receive all the user details in the request
  const { userDetails } = req.body;

  const rankingService = new RankingService(userDetails);
  const suggestedConnections = rankingService.getTopSuggestions() | [];

  return res.status(200).json(suggestedConnections);
}

module.exports = getSuggestions;
