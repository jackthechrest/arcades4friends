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

  // Discussion
  @OneToMany(() => DiscussionPost, (discussionPost) => discussionPost.author, {
    cascade: ['insert', 'update'],
  })
  posts: Relation<DiscussionPost>[];

  @OneToMany(() => Reply, (reply) => reply.author, { cascade: ['insert', 'update'] })
  replies: Relation<Reply>[];

  // Games:
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
