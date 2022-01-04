var dbConfig = {
    synchronize: true,
    migrations: ['migrations/*.js'],
    cli: {
      migrationsDir: 'migrations',
    },
  };
  
  switch (process.env.NODE_ENV) {
    case 'development':
      Object.assign(dbConfig, {
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        entities: ["dist/**/*.entity.js"],
        migrationsRun: false,
        // ssl: {
        //   rejectUnauthorized: false
        // }
      });
      break;
    case 'test':
      Object.assign(dbConfig, {
        type: 'sqlite',
        database: 'test.sqlite',
        entities: ["dist/**/*.entity.js"],
        migrationsRun: true,
      });
      break;
    case 'production':
      Object.assign(dbConfig, {
        type: 'postgres',
        database: process.env.DATABASE_URL,
        entities: ["dist/**/*.entity.js"],
        migrationsRun: true,
        ssl: {
          rejectUnauthorized: false
        }
      });
      break;
    default:
      throw new Error('unknown environment');
  }
  
  module.exports = dbConfig;
  