class UserError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }

  getMessage() {
    return this.message;
  }

  getStatus() {Ｆ
    return this.status;
  }
}

module.exports = UserError;
