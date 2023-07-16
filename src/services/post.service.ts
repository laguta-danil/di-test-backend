import { convert } from 'html-to-text';
import cron from 'node-cron';
import Parser from 'rss-parser';
import { ILike } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Post } from '../entity/post';

const parser = new Parser();

export const PostRepository = AppDataSource.getRepository(Post);

cron.schedule('* * * * *', async () => {
  await getRssFeed();
});
export async function getRssFeed() {
  const feed = await parser.parseURL(process.env.FEED_URL as string);

  try {
    const newPosts = feed.items.map((post: any) => {
      const imgUrl = convert(post.content, {
        selectors: [
          { selector: 'a', format: 'skip' },
          { selector: 'p', format: 'skip' },
        ],
        wordwrap: 130,
      }).slice(1, -1);

      const description = convert(post.content, {
        selectors: [
          { selector: 'a', format: 'skip' },
          { selector: 'img', format: 'skip' },
        ],
        wordwrap: 130,
      });

      return {
        author: post.creator,
        title: post.title,
        description: description,
        authorId: post.guid,
        pubDate: post.isoDate,
        categories: [...post.categories],
        link: post.link,
        imageUrl: imgUrl,
      };
    });

    await PostRepository.upsert(newPosts, ['link']);

    return 'success';
  } catch (error) {
    return 'failed';
  }
}

export async function getPosts(data: any) {
  const { search, itemsPerPage, page, order } = data;
  const take = itemsPerPage || 10;
  const skip = (page - 1) * itemsPerPage || 0;

  const [result, total] = await PostRepository.findAndCount({
    where: { title: ILike(`%${search}%`) },
    order: { pubDate: order },
    take: take,
    skip: skip,
  });

  return { data: result, total: total };
}

export async function getPost(data: any) {
  return await PostRepository.findBy({ id: data.id });
}

export async function addPost(req: any) {
  req.body.pubDate = new Date();
  req.body.authorId = req.user[0].id;
  await PostRepository.save(req.body);
}

export async function deletePost(data: any) {
  await PostRepository.delete({ id: data.id });
}

export async function updatePost(data: any) {
  data.body.pubDate = new Date();
  data.body.authorId = data.user.id;
  const id = data.query.id;
  await PostRepository.save({ id, ...data.body });
}
