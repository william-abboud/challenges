module.exports = {
  async up(db, client) {
    await db.collection("users").updateMany({}, {
      $set: {
        passwordHash: ""
      }
    });
  },

  async down(db, client) {
    await db.collection("users").updateMany({}, {
      $unset: {
        passwordHash: null
      }
    });
  }
};