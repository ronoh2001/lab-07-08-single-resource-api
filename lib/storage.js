'use strict';

const fs = require('fs');
const del = require('del');
const Storage = module.exports = function(dataDir){
  this.dataDir = dataDir;
};

Storage.prototype.setItem = function(schema, item){
  return new Promise((resolve, reject) =>{
    fs.writeFile(`${this.dataDir}/${schema}/${item.id}`, JSON.stringify(item), function(err){
      if (err) return reject(err);
      resolve(item);
    });
  });
};
Storage.prototype.fetchItem = function(schema, id){
  return new Promise((resolve, reject) =>{
    fs.readFile(`${this.dataDir}/${schema}/${id}`, function(err,item){
      if (err) return reject(err);
      try{
        item = JSON.parse(item);
        resolve(item);
      } catch(err){
        reject(err);
      }
    });
  });
};
Storage.prototype.deleteItem = function(schema, id){
  return new Promise((resolve, reject) =>{
    fs.unlink(`${this.dataDir}/${schema}/${id}`, function(schema,id){
      // if (err) return reject(err);
      try{
        del(`${this.dataDir}/${schema}/${id}`, ()=>{
          console.log('Deleted file: ', `${this.dataDir}/${schema}/${id}`);
        });
      } catch(err){
        reject(err);
      }

    });
  });
};
