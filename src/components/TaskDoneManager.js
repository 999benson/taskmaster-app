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

  /**
   * Query DB by keyword (can only match by exact string)
   * @param {string} query take argument string
   * @param {function} set method passed in to pass back result to searchRes array
   */
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
  };

  /**
   * Query DB by date
   * @param {string} query takes in date (user selects with date input)
   * @param {function} set method passed in to pass back result to searchRes array
   */
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
