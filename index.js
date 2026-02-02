const dbUser = process.env.MONGO_USER;
const dbPass = process.env.MONGO_PASS;
const uri = `mongodb+srv://${dbUser}:${dbPass}@clustero.mongodb.net/showtime`;
