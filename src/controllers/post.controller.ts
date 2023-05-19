import express from 'express';
import * as postService from "../services/post.service";

const router = express.Router();


router.get('/getRss', async (req, res, next) => {
    try{
        res.json(await postService.getRssFeed())
    } catch (err) {
        console.error("Error while parse Rss feed", err)
        next(err);
    }
})


router.get('/getAll', async (req: any, res, next) => {
    try{
        res.json(await postService.getPosts(req.query))
    } catch (err) {
        console.error("Error with getting posts", err)
        next(err);
    }

})


router.get('/one-post', async (req: any, res, next) => {
    try{
        res.json(... await postService.getPost(req.query))
    } catch (err) {
        console.error("Error with getting post", err)
        next(err);
    }
})


router.post('/add', async (req: any, res, next) => {
    try{
        await postService.addPost(req)
        res.json('successfully added')
    } catch (err) {
        console.error("Error with adding post", err)
        next(err);
    }
})

router.delete('/delete', async (req: any, res, next) => {
    try{
        await postService.deletePost(req.query)
        res.json('successfully deleted')
    } catch (err) {
        console.error("Error with deleting post", err)
        next(err);
    }
})

router.put('/update', async (req: any, res, next) => {
    try{
        await postService.updatePost(req)
        res.json('successfully updated')
    } catch (err) {
        console.error("Error with updating post", err)
        next(err);
    }

})

export default router;