// Rock, Paper, Scissors
import { Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { User } from './User';

@Entity()
export class RPSGame {
  @PrimaryColumn()
  gameId: string;

  @Column({ nullable: true })
  winnerName: string;

  @Column({ nullable: true })
  winnerChoice: RPSOptions;

  @Column({ default: 0 })
  winnerStreak: number;

  @Column({ nullable: true })
  loserName: string;

  @Column({ nullable: true })
  loserChoice: RPSOptions;

  @Column({ default: false })
  gameOver: boolean;

  @OneToMany(() => User, (user) => user.rpsInfo, { cascade: ['insert', 'update'] })
  players: Relation<User>[];
}
