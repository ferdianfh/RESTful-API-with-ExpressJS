// const userModels = require("../model/users");
// const standardResponse = require("../helper/responseHandle");
// // redis
// const client = require("../config/redis");

// const hitChacheProfileId = async (req, res, next) => {
//   const email = req.email;
//   const [account] = await userModels.searchAccount(email);
//   const userId = account.id;

//   const profile = await client.get(`profile/${userId}`);
//   const convertedProfile = JSON.parse(profile);
//   if (profile !== null) {
//     standardResponse.responses(
//       res,
//       convertedProfile,
//       200,
//       `Profile with email: ${email} successfully requested from Redis!`
//     );
//   } else {
//     return next();
//   }
// };

// const clearProfileInRedis = async (req, res, next) => {
//   const email = req.email;
//   const [account] = await userModels.searchAccount(email);
//   const userId = account.id;

//   await client.del(`profile/${userId}`);

//   next();
// };

// module.exports = { hitChacheProfileId, clearProfileInRedis };
