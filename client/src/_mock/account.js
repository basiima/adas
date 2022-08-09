import AuthService from "../services/auth.service";
const currentUser = AuthService.getCurrentUser();
const currentUserName = currentUser.username;
const currentUserEmail = currentUser.email;

const account = {
  displayName: currentUserName,
  email: currentUserEmail,
  photoURL: '/static/mock-images/avatars/avatar_default.jpg',
};

export default account;
