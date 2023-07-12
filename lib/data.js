//dependencies
const fs = require("fs");
const path = require("path");

//module scaffolding
const lib = {};

//base directory of data folder
lib.basedir = path.join(__dirname, "../.data/");

//write data to file
lib.create = (dir, file, data, callback) => {
  //open file for write
  fs.open(`${lib.basedir + dir}/${file}.json`, "wx", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      //convert data to string
      const stringData = JSON.stringify(data);

      //write data file and then close it
      fs.writeFile(fileDescriptor, stringData, (err) => {
        if (!err) {
          fs.close(fileDescriptor, (error) => {
            if (!error) {
              callback(false);
            } else {
              callback("error closing the new file");
            }
          });
        } else {
          callback("error writing to new file");
        }
      });
    } else {
      callback(
        "There was an error so file could not be create. may file already exist"
      );
    }
  });
};

//Read data from file
lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.basedir + dir}/${file}.json`, "utf-8", (err, data) => {
    callback(err, data);
  });
};

//Update exsiting file
lib.update = (dir, file, data, callback) => {
  //file open for update or writing
  fs.open(`${lib.basedir + dir}/${file}.json`, "r+", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      //convert the to string
      const stringData = JSON.stringify(data);

      //truncate the file
      fs.ftruncate(fileDescriptor, (err) => {
        if (!err) {
          //write the file and close it
          fs.writeFile(fileDescriptor, stringData, (err) => {
            if (!err) {
              //close the file
              fs.close(fileDescriptor, (err) => {
                if (!err) {
                  callback(false);
                } else {
                  callback("Error closing file");
                }
              });
            } else {
              callback("Error writing to file");
            }
          });
        } else {
          callback("err to truncate");
        }
      });
    } else {
      callback("There is a error, file cannot be open");
    }
  });
};

//delete existing file
lib.delete = (dir, file, callback)=>{
    //unlink or delete the file
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err)=>{
        if(!err){
          callback(false)
        }else{
          callback('This file cannot be deleted');
        }

        // console.log('File deleted successfully');
    })
}


//list all the item in directory
lib.list = (dir, callback) => {
  fs.readdir(`${lib.basedir + dir}/`, (err, fileNames) => {
      if (!err && fileNames && fileNames.length > 0) {
          const trimmedFileNames = [];
          fileNames.forEach((fileName) => {
              trimmedFileNames.push(fileName.replace('.json', ''));
          });
          callback(false, trimmedFileNames);
      } else {
          callback('Error reading directory!');
      }
  });
};


module.exports = lib;
