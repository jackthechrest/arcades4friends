/* eslint-disable @typescript-eslint/no-unused-vars */
type NewUserRequest = {
  username: string;
  email: string;
  password: string;
};

type UserIdParam = {
  targetUserId: string;
};

type AuthRequest = {
  email: string;
  password: string;
};
