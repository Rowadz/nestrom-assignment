const { MongoClient } = require('mongodb');
const assert = require('assert');

module.exports = class MigrationComposer extends MongoClient {
  constructor() {
    super('mongodb://localhost:27017/nestrom', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.actorKeys = [
      ...Array.from({ length: 3 }).map((_, i) => `actor_${++i}_name`),
      ...Array.from({ length: 3 }).map((_, i) => `actor_${++i}_facebook_likes`),
    ];
    this.directorKeys = ['director_name', 'director_facebook_likes'];
  }

  async _con(calback) {
    this.connect(async (err, client) => {
      console.log('Connected successfully to server');
      client.db('nestrom');
      if (calback) {
        await calback();
      }
      client.close();
    });
  }

  /**
   * @param {*} data
   * @param {string} collection
   * @param {callable} cb
   */
  async insert(data, collection, cb) {
    const col = this._myDB.collection(collection);
    for (const d of data) {
      if (cb) {
        cb(await col.insertOne(d));
      } else {
        await col.insertOne(d);
      }
    }
  }

  /**
   *
   * @param {*} data
   */
  async mapActors(csvData = []) {
    const actors = [];
    const directors = [];
    const movies = [];
    const filter = act => {
      if (weHave.has(act.name)) {
        return false;
      } else {
        weHave.add(act.name);
      }
      return true;
    };
    const weHave = new Set();
    let moviesKeys;
    for (const obj of csvData) {
      if (!moviesKeys) {
        moviesKeys = Object.keys(obj).filter(
          k => !this.actorKeys.includes(k) && this.directorKeys.includes(k),
        );
      }
      const manyActors = this._mapActorsObj(
        this._buildObjByKeys({ ...obj }, this.actorKeys),
      );
      actors.push(...manyActors.filter(filter));

      const manyDirectors = this._mapActorsObj(
        this._buildObjByKeys({ ...obj }, this.directorKeys),
        false,
      );

      directors.push(...manyDirectors.filter(filter));

      movies.push(
        ...this._mapActorsObj(
          this._buildObjByKeys({ ...obj }, moviesKeys, (obj, key) => {
            if (key === 'genres' || key === 'plot_keywords') {
              return obj[key].split('|');
            }
          }),
        ),
      );
    }
    console.log(directors);

    await this._con(async () =>
      this.insert(actors, 'actors').catch(console.error),
    );
    await this._con(async () =>
      this.insert(directors, 'directors').catch(console.error),
    );
    // await this._con(async () =>
    //   this.insert(movies, 'movies').catch(console.error),
    // );
    this.client.close();
  }

  _buildObjByKeys(obj, keys, cb) {
    const newObj = {};
    keys.forEach(key => (newObj[key] = cb ? cb(obj, obj[key]) : obj[key]));
    return newObj;
  }

  _mapActorsObj(objOfActors, isAct = true) {
    const holder = {};
    Object.keys(objOfActors).forEach((key, i) => {
      if (objOfActors[isAct ? `actor_${i + 1}_name` : 'director_name']) {
        holder[i] = {
          name: objOfActors[isAct ? `actor_${++i}_name` : 'director_name'],
          facebook_likes:
            objOfActors[
              isAct ? `actor_${++i}_facebook_likes` : 'director_facebook_likes'
            ],
        };
      }
    });
    return Object.values(holder);
  }
};
