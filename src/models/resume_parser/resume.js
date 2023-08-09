const _ = require('underscore');

class Resume {
  constructor() {
    this.parts = {};
  }

  addKey(key, value) {
    value = value || '';
    value = value.trim();
    if (value) {
      if (this.parts.hasOwnProperty(key)) {
        value = this.parts[key] + value;
      }
      this.parts[key] = value;
    }
  }

  addObject(key, options) {
    if (!this.parts.hasOwnProperty(key)) {
      this.parts[key] = {};
    }

    for (const [optionName, optionVal] of Object.entries(options)) {
      if (optionVal) {
        this.parts[key][optionName] = optionVal;
      }
    }
  }

  jsoned() {
    return JSON.stringify(this.parts);
  }
}

module.exports = Resume;
