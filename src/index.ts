import app from './app';
import { PORT } from "./config";
import DataSource from './db';

async function main() {

  try {
    await DataSource.initialize()
    app.listen(PORT)
    console.log('Sever runing', PORT)
  } catch (error) {
    console.log(error)
  }
}

main()