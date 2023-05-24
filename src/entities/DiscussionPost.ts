import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { User } from './User';
import { Reply } from './Reply';

@Entity()
export class DiscussionPost {
  @PrimaryColumn()
  postId: string;

  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.posts, { cascade: ['insert', 'update'] })
  author: Relation<User>;

  @OneToMany(() => Reply, (reply) => reply.post, { cascade: ['insert', 'update'] })
  replies: Relation<User>;
}
