// .mongorc.js -- put this file into your user folder for mongo-y goodness.


// show that .mongorc.js was loaded
print(" ")
print("mongorc.js loaded. Lets rock and roll!")
print(" ")


// set prompt as current database
prompt = function() {
	// set prompt as time if no db
	if (typeof db == 'undefined') {
		return (new Date())+" > "; 
	}
	// set prompt as last DB used if exists
	try {
		db.runCommand({getLastError:1});
	}
	catch (e) {
	}
	return db+" > ";
};


// set 'top' to find top users
function top() {
	return db.users.aggregate({$sort:{"points":-1}},{$limit:3});
};


// setup drop protection
var no = function() {
	print(" ");
	print("This operator has been disabled.");
	print("Disable mongorc.js with --norc or use db.runCommand() to continue.");
	print(" ");
};
// database drop protection
db.dropDatabase = DB.prototype.dropDatabase = no;
// collection drop protection
DBCollection.prototype.drop = no;
// index drop protection
DBCollection.prototype.dropindex = no; 
// server shutdown protection
DB.prototype.shutdownServer = no;


// make more data
function makeData(dbName, colName, num) {
	var col = db.getSiblingDB(dbName).getCollection(colName);
  		for (i = 0; i < num; i++) {
    			col.insert({foo:i,bar:num-i});
  		}
  	print(col.count());
}
