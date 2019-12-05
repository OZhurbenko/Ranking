const rankingUseCases = [
  {
    "match": [
      "profession",
      "interests",
      "industry",
      "city",
    ],
    "score": 100,
  },
  {
    "match": [
      "interests",
      "industry",
      "city",
    ],
    "score": 90,
  },
  {
    "match": [
      "profession",
      "interests",
      "city",
    ],
    "score": 80,
  },
  {
    "match": [
      "profession",
      "city",
    ],
    "score": 70,
  },
  {
    "match": [
      "industry",
      "city",
    ],
    "score": 60,
  },
];

module.exports = rankingUseCases;
