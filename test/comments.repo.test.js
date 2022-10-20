const { User, Post, Comment } = require('../models');
const CommentsRepository = require('../repositories/comments.repository');
const commentsRepository = new CommentsRepository();

const post = {
  postId: 1,
  userId: 6,
  title: '게시글 수정하기!!!',
  content: 'asdfasga',
  likesCount: 0,
  createdAt: '2022-10-20T06:17:49.000Z',
  updatedAt: '2022-10-20T06:18:29.000Z',
};

const comment = {
  commentId: 3,
  postId: 1,
  userId: 6,
  comment: '덧글덧글',
  createdAt: '2022-10-20T06:17:49.000Z',
  updatedAt: '2022-10-20T06:18:29.000Z',
};

Post.findByPk = jest.fn((postId) => {
  if (postId === post.postId) return post;
  else return;
});

Comment.findByPk = jest.fn((commentId) => {
  if (commentId === comment.commentId) return comment;
  else return;
});

test('findThePost 메소드에 존재하는 postId를 전달하면 그 postId를 가지는 post가 리턴된다', async () => {
  let postId = 1;
  const result = await commentsRepository.findPostById(postId);
  expect(Post.findByPk).toBeCalledWith(postId);
  expect(result).toEqual(post);
});

test('findThePost 메소드에 존재하지 않는 postId를 전달하면 undefined가 리턴된다', async () => {
  let postId = 2;
  const result = await commentsRepository.findPostById(postId);
  expect(Post.findByPk).toBeCalledWith(postId);
  expect(result).toBeUndefined();
});

test('findTheComment 메소드에 존재하는 commentId를 전달하면 그 commentId를 가지는 comment가 리턴된다', async () => {
  let commentId = 3;
  const result = await commentsRepository.findComment(commentId);
  expect(Comment.findByPk).toBeCalledWith(commentId);
  expect(result).toEqual(comment);
});

test('CommentsRepository 의 findThePost 메소드에 존재하지 않는 commentId를 전달하면 undefined가 리턴된다', async () => {
  let commentId = 1;
  const result = await commentsRepository.findComment(commentId);
  expect(Comment.findByPk).toBeCalledWith(commentId);
  expect(result).toBeUndefined();
});
