import fs from 'fs';
import path from 'path';

const FILE_DATABASE = `../data/database.json`;

const openFile = (): Buffer => {
  return fs.readFileSync(path.join(__dirname, FILE_DATABASE));
};

const getData = (): Record<string, any> => {
  const raw = openFile();
  const data = JSON.parse(raw.toString());
  return data;
};

const writeFile = (data: Record<string, any>): void => {
  fs.writeFileSync(path.join(__dirname, FILE_DATABASE), JSON.stringify(data));
};

const setData = (newData: Record<string, any>): void => {
  const data = getData();
  data.push(newData);
  writeFile(data);
};

const updateData = (id: number, newData: Record<string, any>): void => {
  const data = getData();

  const index = data.findIndex((item: { id: number }) => item.id === id);
  data[index] = newData;

  writeFile(data);
};

export default {
  openFile,
  getData,
  setData,
  updateData,
  writeFile,
};
