import app from '../src/app';
import supertest from 'supertest';

const request = supertest(app);

describe(`Testing the article endpoints`, () => {
  describe(`GET /`, () => {
    it(`should return a list of articles`, async () => {
      const res = await request.get(`/article`);
      const { body } = res;

      expect(res.status).toBe(200);
      expect(body).toHaveProperty(`success`);
      expect(body).toHaveProperty(`data`);
      expect(body).not.toHaveProperty(`message`);
    });

    it(`should return a list of articles from search`, async () => {
      const res = await request.get(`/article/search`).query({
        page: 1,
        limit: 10,
        title: `the`,
        date_from: `2023-01-01T10:53:29Z`,
        date_to: `2023-03-31T10:53:29Z`,
      });
      const { body } = res;

      expect(res.status).toBe(200);
      expect(body).toHaveProperty(`success`);
      expect(body).toHaveProperty(`data`);
      expect(body).not.toHaveProperty(`message`);
    });

    it(`should return an article by id`, async () => {
      const res = await request.get(`/article/1`);
      const { body } = res;
      const { data } = body;

      expect(res.status).toBe(200);
      expect(body).toHaveProperty(`success`);
      expect(body).toHaveProperty(`data`);
      expect(body).not.toHaveProperty(`message`);
      expect(data).toHaveProperty(`author_id`);
      expect(data).toHaveProperty(`title`);
      expect(data).toHaveProperty(`intro`);
      expect(data).toHaveProperty(`content`);
      expect(data).toHaveProperty(`created_at`);
    });

    it(`shouldn't return an article by id because the item doesn't exist`, async () => {
      const res = await request.get(`/article/9999`);
      const { body } = res;

      expect(res.status).toBe(404);
      expect(body).not.toHaveProperty(`data`);
      expect(body).toHaveProperty(`message`);
    });
  });

  describe(`POST /`, () => {
    it(`should create an article`, async () => {
      const article = {
        author_id: 25,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a finibus turpis, sit amet eleifend massa. Mauris quis neque justo. Vestibulum mattis venenatis tellus vel varius. Etiam in facilisis tortor, commodo scelerisque nisi. Nullam auctor, nunc ac molestie cursus, tortor mauris fringilla augue, ac pulvinar orci nunc nec orci. Aenean eget quam arcu. Morbi tristique libero ante, non rutrum nisl egestas ac. Suspendisse condimentum dictum metus, nec cursus quam venenatis eu.`,
        intro: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a finibus turpis, sit amet eleifend massa. Mauris quis neque justo. Vestibulum mattis venenatis tellus vel varius.`,
        title: `New item`,
      };

      const res = await request.post(`/article`).send(article);
      const { body } = res;
      const { data } = body;

      expect(res.status).toBe(201);
      expect(body).toHaveProperty(`success`);
      expect(body).toHaveProperty(`data`);
      expect(body).not.toHaveProperty(`message`);
      expect(data).toHaveProperty(`author_id`);
      expect(data).toHaveProperty(`title`);
      expect(data).toHaveProperty(`intro`);
      expect(data).toHaveProperty(`content`);
      expect(data).toHaveProperty(`created_at`);
    });

    it(`shouldn't create an article due a wrong body`, async () => {
      const article = {
        title: `New item`,
      };

      const res = await request.post(`/article`).send(article);
      const { body } = res;

      expect(res.status).toBe(400);
      expect(body).not.toHaveProperty(`data`);
      expect(body).toHaveProperty(`message`);
    });
  });

  describe(`PUT /`, () => {
    it(`should update an article by id`, async () => {
      const article = {
        intro: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a finibus turpis, sit amet eleifend massa. Mauris quis neque justo. Vestibulum mattis venenatis tellus vel varius.`,
        title: `New item`,
      };

      const res = await request.put(`/article/1`).send(article);
      const { body } = res;
      const { data } = body;

      expect(res.status).toBe(200);
      expect(body).toHaveProperty(`success`);
      expect(body).toHaveProperty(`data`);
      expect(body).not.toHaveProperty(`message`);
      expect(data).toHaveProperty(`author_id`);
      expect(data).toHaveProperty(`title`);
      expect(data).toHaveProperty(`intro`);
      expect(data).toHaveProperty(`content`);
      expect(data).toHaveProperty(`created_at`);
    });

    it(`shouldn't create an article due a wrong body`, async () => {
      const article = {
        author_id: 10,
      };

      const res = await request.put(`/article/1`).send(article);
      const { body } = res;

      expect(res.status).toBe(400);
      expect(body).not.toHaveProperty(`data`);
      expect(body).toHaveProperty(`message`);
    });

    it(`shouldn't update an article by id because the item doesn't exist`, async () => {
      const article = {
        intro: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a finibus turpis, sit amet eleifend massa. Mauris quis neque justo. Vestibulum mattis venenatis tellus vel varius.`,
        title: `New item`,
      };

      const res = await request.put(`/article/9999`).send(article);
      const { body } = res;

      expect(res.status).toBe(404);
      expect(body).not.toHaveProperty(`data`);
      expect(body).toHaveProperty(`message`);
    });
  });
});
