# MongoDB Introduction
Date: [February 12th, 2015](http://www.meetup.com/gainesvillejs/events/220139151/)<br />
Presentor: [Dennis Pelton](https://github.com/dpelton)


## How to Use
Place [mongorc.js](mongorc.js) in your user folder:

> **Windows** <br />
> C:\Users\{YOURUSERNAME}\

> **Mac** <br />
> /Users/{YOURUSERNAME}

## What it Does
Displays message if mongorc.js file loaded. If you don't see this then [mongorc.js](mongorc.js) has not been placed in your user folder.
```javascript
print(" ")
print("mongorc.js loaded. Lets rock and roll!")
print(" ")
```
<br />
Changes the MongoDB prompt to last used DB if exists otherwise it changes prompt to current time.
```javascript
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
```

<br />
This function displays the top three users with the most points.
```javascript
function top() {
	return db.users.aggregate({$sort:{"points":-1}},{$limit:3});
};
```

<br />
Prevents accidental drop of Database, Collections, or Indexes. Also prevents accidental server shutdown. A warning message is shown indicating that the operation has been disabled.
```javascript
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
```

<br />
This shows how you can create a function to fill collections with arbitrary data for quick testing.
```javascript
function makeData(dbName, colName, num) {
	var col = db.getSiblingDB(dbName).getCollection(colName);
  		for (i = 0; i < num; i++) {
    			col.insert({foo:i,bar:num-i});
  		}
  	print(col.count());
}
```
