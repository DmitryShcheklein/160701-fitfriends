export const ResponseMessage = {
  LoggedSuccess: 'User has been successfully logged.',
  LoggedError: 'Password or Login is wrong.',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created.',
  RecoveryEmailSuccess: 'Recovery email sent successfully',
  PasswordChangeSuccess: 'Password changed successfully',
  OldPasswordNotCorrect: 'Old password is not correct',
  NewJWTTokensSuccess: 'Get a new access/refresh tokens',
} as const;
