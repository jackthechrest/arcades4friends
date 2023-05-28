import { Entity, PrimaryGeneratedColumn, Column, Relation, OneToMany, ManyToOne } from 'typeorm';
import { DiscussionPost } from './DiscussionPost';
import { Follow } from './Follow';
import { Reply } from './Reply';
import { RPSGame } from './RPSGame';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  passwordHash: string;

  @Column({ default: false })
  verifiedEmail: boolean;

  @Column({ default: false })
  isOperator: boolean;

  @Column({ default: 1 })
  level: number;

  @Column({ default: 0 })
  experiencePoints: number;

  @Column({ default: 1000 })
  experienceForDay: number;

  // Discussion
  @OneToMany(() => DiscussionPost, (discussionPost) => discussionPost.author, {
    cascade: ['insert', 'update'],
  })
  posts: Relation<DiscussionPost>[];

  @OneToMany(() => Reply, (reply) => reply.author, { cascade: ['insert', 'update'] })
  replies: Relation<Reply>[];

  // Games:
  // Little Buddy
  @Column({ default: 1 })
  buddyLevel: number;

  @Column({ default: 0 })
  buddyExperiencePoints: number;

  @Column({ default: 2000 })
  buddyExperienceForDay: number;

  @Column({ default: 100 })
  fuel: number;

  @Column({ default: 100 })
  happiness: number;

  @Column()
  lastFueled: Date;

  @Column()
  lastEntertained: Date;

  // Rock Paper Scissors
  @ManyToOne(() => RPSGame, (rps) => rps.players, { cascade: ['insert', 'update'] })
  rpsInfo: Relation<RPSGame>;

  @Column({ default: 'Rock' })
  currentPlay: RPSOptions;

  @Column({ default: 0 })
  currentRPSStreak: number;

  @Column({ default: 0 })
  highestRPSStreak: number;

  // WIP Brawl

  // Follow
  @OneToMany(() => Follow, (follow) => follow.requestingUser, { cascade: ['insert', 'update'] })
  following: Relation<Follow>[];

  @OneToMany(() => Follow, (follow) => follow.targetedUser, { cascade: ['insert', 'update'] })
  followers: Relation<Follow>[];
}

/*
Little Buddy Level Upgrades:
Level 1: None (Starting Point)
Level 2: 500 XP added to User's Daily XP Cap (1000 -> 1500)
Level 3: ~6 More Hours Added From Max Fuel to 0 Fuel (~12 -> ~18)
Level 4: ~3 More Hours Added From Max Happiness to 0 Happiness (~12 -> ~15)
Level 5: 500 XP added to Pet's Daily XP Cap (2000 -> 2500)
Level 6: 500 XP added to User's Daily XP Cap (1500 -> 2000)
Level 7: ~6 More Hours Added From Max Fuel to 0 Fuel (~18 -> ~24)
Level 8: ~3 More Hours Added From Max Happiness to 0 Happiness (~15 -> ~18)
Level 9: 500 XP added to Pet's Daily XP Cap (2500 -> 3000)
Level 10: User XP Collection Rate Doubled (Max Level)
*/
