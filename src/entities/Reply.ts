import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import { User } from './User';
import { DiscussionPost } from './DiscussionPost';

@Entity()
export class Reply {
  @PrimaryColumn()
  postId: string;

  @Column()
  body: string;

  @Column()
  userBeingRepliedTo: string;

  @ManyToOne(() => User, (user) => user.replies, { cascade: ['insert', 'update'] })
  author: Relation<User>;

  @ManyToOne(() => DiscussionPost, (discussionPost) => discussionPost.replies, {
    cascade: ['insert', 'update'],
  })
  post: Relation<DiscussionPost>;
}
