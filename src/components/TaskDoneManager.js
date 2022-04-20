import minimongo from "minimongo";

const IndexedDb = minimongo.IndexedDb;

//default parameter "TaskDoneDB"
function TaskDoneManager(_dbName = "TaskDoneDB") {
  const tdm = {};

  const dbName = _dbName;

  /**
   * Inserts task object that is completed into database
   * @param {object} takes the task object
   * @returns a promise
   */
  tdm.saveDoneList = (doneTask) => {
    return new Promise((resolve, reject) => {
      // Create IndexedDb
      const db = new IndexedDb(
        { namespace: dbName },
        function () {
          // Add a collection to the database
          db.addCollection(
            "tasks",
            function () {
              db.tasks.upsert(doneTask, resolve, reject);
            },
            reject
          );
        },
        reject
      );
    });
  };

  // tdm.searchDoneWord = (query) => {
  //   return new Promise((resolve, reject) => {
  //     //do something, fetch something....
  //     //you guessed it, mongo queries go here.

  //     let dataReturned = db.collection('tasks').find({text:{ $regex: query }}, {}).asArray();

  //     console.log('tasks');
  //     let somethingWentWrong = (dataReturned == null);
  //     (somethingWentWrong)
  //       ? reject('cannot find task')
  //       : resolve(dataReturned);
  // })
  // };

  tdm.searchDoneWord = (query, set) => {
    const db = new IndexedDb(
      { namespace: dbName },
      function () {
        // Add a collection to the database
        db.addCollection("tasks", function () {
          db.tasks.findOne({ text: { $regex: query } }, {}, function (res) {
            set([res]);
          });
        });
      },
      function () {
        alert("some error!");
      }
    );
    // console.log("DATA[0]", data[0]);
    // return data[0];
  };

  tdm.searchDoneDate = (query, set) => {
    const db = new IndexedDb(
      { namespace: dbName },
      function () {
        // Add a collection to the database
        db.addCollection("tasks", function () {
          db.tasks.findOne({ date: query }, {}, function (res) {
            set([res]);
          });
        });
      },
      function () {
        alert("some error!");
      }
    );
  };
  return tdm;
}

export default TaskDoneManager;
