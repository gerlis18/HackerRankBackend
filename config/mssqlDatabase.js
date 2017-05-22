const config = {
  server: 'localhost',
  userName: 'sa',
  password: '300ger1771Lis.'

  ,options: {
    instanceName: 'SQLEXPRESS',
    debug: {
      packet: false,
      data: false,
      payload: false,
      token: false,
      log: true
    },
    database: 'dbsuggestions',
    //encrypt: true // for Azure users
  }
  
};
module.exports = config;