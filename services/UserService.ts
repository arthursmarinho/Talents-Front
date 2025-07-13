// import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// type CreateUserDto = {
//   email: string;
//   password: string;
// };

// type UpdatePasswordDto = {
//   email: string;
//   oldPassword: string;
//   newPassword: string;
// };

// export const UserService = {
//   async createUser(data: CreateUserDto) {
//     const response = await axios.post(`${API_URL}/user/register`, data);
//     return response.data;
//   },

//   async updatePassword(data: UpdatePasswordDto) {
//     const response = await axios.post(`${API_URL}/user/update-password`, data);
//     return response.data;
//   },
// };
