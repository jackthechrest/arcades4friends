import { AppDataSource } from '../dataSource';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

async function addUser(username: string, email: string, passwordHash: string): Promise<User> {
  // Create the new user object
  let newUser = new User();
  newUser.username = username;
  newUser.email = email;
  newUser.passwordHash = passwordHash;
  // Then save it to the database
  // NOTES: We reassign to `newUser` so we can access
  // NOTES: the fields the database autogenerates (the id & default columns)
  newUser = await userRepository.save(newUser);

  return newUser;
}

async function allUserData(): Promise<User[]> {
  return userRepository.find();
}

async function getUserByEmail(email: string): Promise<User | null> {
  return userRepository.findOne({
    where: { email },
  });
}

async function getUserById(userId: string): Promise<User | null> {
  const user = await userRepository.findOne({
    where: { userId },
    relations: ['following', 'followers'],
  });
  return user;
}

async function getUserByUsername(username: string): Promise<User | null> {
  const user = await userRepository.findOne({
    where: { username },
    relations: ['following', 'followers'],
  });
  return user;
}

async function updateEmailVerification(userId: string, verificationStatus: boolean): Promise<void> {
  await userRepository
    .createQueryBuilder()
    .update(User)
    .set({ verifiedEmail: verificationStatus })
    .where({ userId })
    .execute();
}

async function updateEmailAddress(userId: string, newEmail: string): Promise<void> {
  await userRepository
    .createQueryBuilder()
    .update(User)
    .set({ email: newEmail })
    .where({ userId })
    .execute();
}

async function awardXp(userId: string, xpAwarded: number): Promise<User> {
  let user = await getUserById(userId);
  const xpNeededToLevelUp = user.level * 100;
  const newExperience = user.experiencePoints + xpAwarded;

  await userRepository
    .createQueryBuilder()
    .update(User)
    .set({ experiencePoints: newExperience })
    .where({ userId })
    .execute();

  // check if user is able to level up
  if (xpNeededToLevelUp <= newExperience) {
    await userRepository
      .createQueryBuilder()
      .update(User)
      .set({ level: user.level + 1 })
      .where({ userId })
      .execute();

    await userRepository
      .createQueryBuilder()
      .update(User)
      .set({ experiencePoints: newExperience % xpNeededToLevelUp })
      .where({ userId })
      .execute();
  }

  user = await getUserById(userId);

  return user;
}

async function deleteUserById(userId: string): Promise<void> {
  await userRepository
    .createQueryBuilder('user')
    .delete()
    .where('userId = :userId', { userId })
    .execute();
}

async function deleteAllUsers(): Promise<void> {
  await userRepository.createQueryBuilder('user').delete().execute();
}

export {
  addUser,
  allUserData,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  updateEmailVerification,
  updateEmailAddress,
  awardXp,
  deleteUserById,
  deleteAllUsers,
};
