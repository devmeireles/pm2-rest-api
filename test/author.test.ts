import app from '../src/app';
import supertest from 'supertest';

const request = supertest(app);

describe(`Testing the author endpoints`, () => {
  describe(`GET /`, () => {
    it(`should return a list of articles according to the author id`, async () => {
      const res = await request.get(`/author/1`);
      const { body } = res;

      expect(res.status).toBe(200);
      expect(body).toHaveProperty(`success`);
      expect(body).toHaveProperty(`data`);
      expect(body).not.toHaveProperty(`message`);
    });

    it(`shouldn't return a list of articles by author id because the author doesn't exist`, async () => {
      const res = await request.get(`/author/9999`);
      const { body } = res;

      expect(res.status).toBe(404);
      expect(body).not.toHaveProperty(`data`);
      expect(body).toHaveProperty(`message`);
    });
  });
});
