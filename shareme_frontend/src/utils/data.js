export const userQuery = (userId) => {
	const query = `*[_type ==  "user" && _id == '${userId}']`;

	return query;
};
// export const userQuery = (userId) => {
//   const query = `*[_type == "user" && _id == '${userId}']`;
//   return query;
// };
