import http from 'node:https';
import fs from 'fs';
import path from 'path';

class DataService {
  public async readFromExternal(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const request = http.get(`https://my.api.mockaroo.com/article_database.json?key=69f9a560`, (res) => {
        const body = new Array<Buffer | string>();

        res.on(`data`, (chunk) => body.push(chunk));

        res.on(`end`, () => resolve(body.join(``)));
      });

      request.on(`error`, (err) => reject(err));

      request.end();
    });
  }

  public async fetchFromExternal(): Promise<void> {
    const data = await this.readFromExternal();

    fs.writeFileSync(path.join(__dirname, `../../data/database.json`), data);
  }
}

export default new DataService();
