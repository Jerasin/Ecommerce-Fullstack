import { UserProps, Role } from "../src/entities";

export const admin: UserProps = {
  firstName: "admin",
  lastName: "tester1",
  email: "admin@gmail.com",
  password: "123456",
  role: Role.Admin,
};
