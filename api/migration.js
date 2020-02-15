const fs = require('fs');
const { resolve } = require('path');
const csv = require('fast-csv');
const path = resolve(__dirname, 'data.csv');
const ora = require('ora');
const MigrationComposer = require('./migrationComposer');

const spinner = ora(`reading -> ${path}`).start();

const migrationComposer = new MigrationComposer();

const holder = [];

fs.createReadStream(path)
  .pipe(csv.parse({ headers: true }))
  .on('error', console.error)
  .on('data', holder.push.bind(holder))
  .on('end', rowCount => {
    spinner.color = 'green';
    spinner.text = 'DONE...';
    console.log(`\nParsed ${rowCount} rows END`);
    migrationComposer.mapActors(holder);
    setTimeout(spinner.stop.bind(spinner), 1000);
  });
