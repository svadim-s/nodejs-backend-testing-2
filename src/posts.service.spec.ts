import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const result = postsService.findMany();

      expect(result.length).toBe(posts.length);
      expect(result.map((post) => post.text)).toEqual(posts.map((p) => p.text));
    });

    it('should return correct posts for skip and limit options', () => {
      const result = postsService.findMany({ skip: 1, limit: 2 });

      expect(result.length).toBe(2);
      expect(result[0].text).toBe('Post 2');
      expect(result[1].text).toBe('Post 3');
    });

    it('should return an empty array if skip is greater than the number of posts', () => {
      const result = postsService.findMany({ skip: 10 });

      expect(result.length).toBe(0);
    });

    it('should return posts correctly with only skip option', () => {
      const result = postsService.findMany({ skip: 2 });

      expect(result.length).toBe(2);
      expect(result[0].text).toBe('Post 3');
      expect(result[1].text).toBe('Post 4');
    });

    it('should return the first few posts with only limit option', () => {
      const result = postsService.findMany({ limit: 2 });

      expect(result.length).toBe(2);
      expect(result[0].text).toBe('Post 1');
      expect(result[1].text).toBe('Post 2');
    });
  });
});