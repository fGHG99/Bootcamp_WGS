import Pool from 'pg-pool';

export const pool = new Pool({
    user:'postgres',
    password:'root',
    database:'bootcamp-geeksfarm',
    host: 'localhost',
    port: '3000'
})

