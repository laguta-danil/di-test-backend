import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('text', { array: true })
  categories: string[];

  @Column()
  pubDate: string;

  @Column()
  authorId: number;

  @Column({ unique: true })
  link: string;

  @Column()
  imageUrl: string;
}
