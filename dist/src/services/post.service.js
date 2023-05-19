"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.deletePost = exports.addPost = exports.getPost = exports.getPosts = exports.getRssFeed = exports.PostRepository = void 0;
const html_to_text_1 = require("html-to-text");
const node_cron_1 = __importDefault(require("node-cron"));
const rss_parser_1 = __importDefault(require("rss-parser"));
const typeorm_1 = require("typeorm");
const data_source_1 = require("../data-source");
const post_1 = require("../entity/post");
const parser = new rss_parser_1.default();
exports.PostRepository = data_source_1.AppDataSource.getRepository(post_1.Post);
node_cron_1.default.schedule('* * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    yield getRssFeed();
}));
function getRssFeed() {
    return __awaiter(this, void 0, void 0, function* () {
        const feed = yield parser.parseURL(process.env.FEED_URL);
        try {
            const newPosts = feed.items.map((post) => {
                const imgUrl = (0, html_to_text_1.convert)(post.content, {
                    selectors: [
                        { selector: 'a', format: 'skip' },
                        { selector: 'p', format: 'skip' }
                    ], wordwrap: 130
                }).slice(1, -1);
                const description = (0, html_to_text_1.convert)(post.content, {
                    selectors: [
                        { selector: 'a', format: 'skip' },
                        { selector: 'img', format: 'skip' }
                    ], wordwrap: 130
                });
                return {
                    author: post.creator, title: post.title, description: description,
                    authorId: post.guid, pubDate: post.isoDate,
                    categories: [...post.categories], link: post.link, imageUrl: imgUrl
                };
            });
            yield exports.PostRepository.upsert(newPosts, ['link']);
            return 'success';
        }
        catch (error) {
            return 'failed';
        }
    });
}
exports.getRssFeed = getRssFeed;
function getPosts(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { search, itemsPerPage, page, order } = data;
        const take = itemsPerPage || 10;
        const skip = (page - 1) * itemsPerPage || 0;
        const [result, total] = yield exports.PostRepository.findAndCount({
            where: { title: (0, typeorm_1.ILike)(`%${search}%`) },
            order: { pubDate: order },
            take: take,
            skip: skip,
        });
        return { data: result, total: total };
    });
}
exports.getPosts = getPosts;
function getPost(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.PostRepository.findBy({ id: data.id });
    });
}
exports.getPost = getPost;
function addPost(req) {
    return __awaiter(this, void 0, void 0, function* () {
        req.body.pubDate = new Date();
        req.body.authorId = req.user[0].id;
        yield exports.PostRepository.save(req.body);
    });
}
exports.addPost = addPost;
function deletePost(data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.PostRepository.delete({ id: data.id });
    });
}
exports.deletePost = deletePost;
function updatePost(data) {
    return __awaiter(this, void 0, void 0, function* () {
        data.body.pubDate = new Date();
        data.body.authorId = data.user.id;
        const id = data.query.id;
        yield exports.PostRepository.save(Object.assign({ id }, data.body));
    });
}
exports.updatePost = updatePost;
//# sourceMappingURL=post.service.js.map