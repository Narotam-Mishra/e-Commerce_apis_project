
// custom api errors handling

class CustomAPIError extends Error {
    constructor(message) {
      super(message)
    }
  }
  
  module.exports = CustomAPIError