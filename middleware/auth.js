// export const auth = async(req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         const isCustomAuth = token.length < 500;
//         let decodedData;
//         if(token && isCustomAuth) {
//             decodedData = jwt.verify(token, secret);
//             req.user_Id = decodedData?.Id;
//         } else {
//             decodedData = jwt.decode(token);
//             req.user_Id = decodedData?.sub;
//         }
//         next();
//     } catch (error) {
//         console.log(error)
//     }
// };

// export const isUser = (req, res, next) => {
//     const {_id} = req.params;
//     const userId = UserModel.find({_id})
//     if(userId != _id) {
//         return res.status(403).json({Error: "Access denied"});
//     }
//     req.userId = userId;
//     next();
// };

// export const isAdmin = (req, res, next) => {
//     if(req.user.role === 0) {
//         return res.status(403).json({Error: "Admin resourse!...."});
//     }
//     next();
// }