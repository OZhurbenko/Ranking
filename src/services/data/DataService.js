
const USERS_STUB = [
  {
    interests: "Skiing",
    industry: "Financial Services",
    profession: "Software Engineer",
    city: "Toronto",
  },
  {
    interests: "Video Games",
    industry: "Healthcare",
    profession: "Nurse",
    city: "Ottawa",
  },
  {
    interests: "Snowboarding",
    industry: "Science",
    profession: "Professor",
    city: "Toronto",
  },
];

class DataService {
  constructor(config) {
    this.config = config;
  }

  getAllUsers() {
    return new Promise((resolve, reject) => {
      return resolve(USERS_STUB);
    })
  }
}

module.exports = DataService;
