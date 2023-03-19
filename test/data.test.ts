import app from '../src/app';
import supertest from 'supertest';

const request = supertest(app);

describe(`Testing the data endpoints`, () => {
  describe(`GET /`, () => {
    it(`should return a list of articles from an external dataset`, async () => {
      const res = await request.get(`/data/external`);
      const { body } = res;

      expect(res.status).toBe(200);
      expect(body).toHaveProperty(`success`);
      expect(body).toHaveProperty(`data`);
      expect(body).not.toHaveProperty(`message`);
    });

    it(`should fetch and save a list of articles from an external dataset`, async () => {
      const res = await request.get(`/data/fetch`);
      const { body } = res;

      expect(res.status).toBe(200);
      expect(body).toHaveProperty(`success`);
      expect(body).not.toHaveProperty(`message`);
    });
  });
});
