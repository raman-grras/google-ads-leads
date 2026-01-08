const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   "products",      
//   "root",         
//   "mysql@123",       
//   {
//     host: "127.0.0.1",   
//     port: 3306,          
//     dialect: "mysql",
//     logging: false,
//   }
// );

const sequelize = new Sequelize(
  "sql12813695",      
  "sql12813695",         
  "MBSUN3PyQT",       
  {
    host: "sql12.freesqldatabase.com",   
    port: 3306,          
    dialect: "mysql",
    logging: false,
  }
);


async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("database succesfully connected ");
  } catch (error) {
    console.error(
      "Sequelize connection error:",
      error.original || error.message
    );
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
