const parser = require('minimist');
const clean = require('cleanr');

class Argument {
  constructor() {
    this.config = {
      options: [],
      commands: [],
      help: true,
      version: null,
      name: null,
      text: null
    }
  }

  option(name, description, val, short) {
    let opt = {};

    if (short !== undefined && short.lenght !== 1) {
      throw new Error('Shortform can only be 1 character');
    }

    opt.name = name;
    opt.description = description;
    opt.default = val;
    opt.short = short;

    opt = clean(opt);

    this.config.options.push(opt);

    return this;
  }

  command(aliases, description) {
    let cmd = {};

    cmd.name = aliases;
    cmd.description = description;

    cmd = clean(cmd);

    this.config.commands.push(cmd);

    return this;
  }
}

export default new Argument;
