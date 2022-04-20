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

  tdm.searchDoneWord = (query) => {
    const db = new IndexedDb(
      { namespace: dbName },
      function () {
        // Add a collection to the database
        db.addCollection("tasks", function () {
          db.tasks.findOne({ text: { $regex: query } }, {}, function (res) {
            console.log("TASK SEARCH: " + res);
            return res;
          });
        });
      },
      function () {
        alert("some error!");
      }
    );
  };

  tdm.searchDoneDate = (query) => {
    console.log(typeof query);
    const db = new IndexedDb(
      { namespace: dbName },
      function () {
        // Add a collection to the database
        db.addCollection("tasks", function () {
          db.tasks.findOne({ date: query }, {}, function (res) {
            console.log("DATE SEARCH: " + res);
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
