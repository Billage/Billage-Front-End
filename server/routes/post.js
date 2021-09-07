const express = require('express');
const multer = require('multer');
const path = require('path');
const Sequelize = require('sequelize');
const fs = require('fs');
const { User, Post, Image } = require('../models');
const { logged_in } = require('./status');
const router = express.Router();
const { like } = Sequelize.Op;
// 업로드 폴더 생성
try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더 생성');
    fs.mkdirSync('uploads');
}
// 게시판
router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['nick'],
            },
            // where: { board: '빌려줄게요'},
            // where: { board: '빌려주세요'},
            order: [['createdAt', 'DESC']],
        });
        // await res.send(posts); 
        await res.render('board', { posts });
    }catch (err) {
        console.error(err);
        next(err);
    }
});
// 멀터
const image_upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            console.log(ext);
            cb(null, path.basename(file.originalname, ext) + '_' + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
const post_upload = multer();
// 게시글 작성 뷰
router.get('/lend', logged_in, (req, res) => {
    res.render('lend');
});
router.get('/borrow', logged_in, (req, res) => {
    res.render('borrow');
});
// 게시글 작성
router.post('/write/lend', logged_in, async (req, res, next) => {
    try {
        await Post.create({
            title: req.body.title,
            body: req.body.body,
            price: req.body.price,
            start_date: req.body.startDate,
            end_date: req.body.endDate,
            board: '빌려줄게요',
            user_id: req.user.id,
        });
    res.redirect('/post');
    } catch (err) {
        console.error(err);
        return next(err);
    }
});
router.post('/write/borrow', logged_in, async (req, res, next) => {
    try {
        await Post.create({
            title: req.body.title,
            body: req.body.body,
            price: req.body.price,
            start_date: req.body.startDate,
            end_date: req.body.endDate,
            board: '빌려주세요',
            user_id: req.user.id,
        });
    res.redirect('/post');
    } catch (err) {
        console.error(err);
        return next(err);
    }
});
router.post('/comment')
// 이미지 업로드
router.post('/img', logged_in, image_upload.array('img', 5), async (req, res, next) => {
    for (let i = 0; i < req.files.length; i++) {
        await Image.create({
            name: req.files[i].filename,
            url: req.files[i].path
        });
    }
    res.redirect('/post');
});
// 게시글 조회
router.get('/:id', async (req, res, next) => {
    try {
        const post = await Post.findOne({ 
            where: { id: req.params.id },
            include: {
                model: User,
                attributes: ['nick', 'address'],
            },
        });
        await res.render('show', { post });
        // await res.send(post);
    } catch (err) {
        console.error(err);
        return next(err); 
    }
});
// 게시글 검색
router.get('/search/:searchWord', async(req, res) => {
    try{
        const result = await Post.findAll({
            where: { title: { [like]: '%' + req.params.searchWord + '%' }},
            include: {
                model: User,
                attributes: ['nick'],
            },
        })
        console.log(result);
        res.send(result);
    } catch (err) {
        console.error(err);
        return next(err); 
    }
})

module.exports = router;
