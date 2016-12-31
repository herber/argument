const minimist = require('minimist');
const clean = require('cleanr');
const Table = require('cli-table');

class Argument {
  constructor() {
    this.config = {
      options: [],
      commands: [],
      extra: []
    }
  }

  option(name, description, val, short) {
    let opt = {};

    if (short != undefined && short.lenght > '1') {
      console.log('err');
    }

    opt.name = name || 'Aurgument';
    opt.description = description;
    opt.default = val;
    opt.short = short;

    opt = clean(opt);

    this.config.options.push(opt);

    return this;
  }

  command(name, description) {
    let cmd = {};

    cmd.name = name;
    cmd.description = description;

    cmd = clean(cmd);

    this.config.commands.push(cmd);

    return this;
  }

  parse(argv, options) {
    let opts = clean(options);
    let args = minimist(argv);

    this.config.extra = args._;

    let rv = {};
    let help = true;

    for (var part in args) {
      for (var key in this.config.options) {
        if (this.config.options[key].name == part) {
          rv[part] = args[part];
          help = false;
        }
      }
    }

    for (var part in args._) {
      for (var key in this.config.commands) {
        if (this.config.commands[key].name == args._[part]) {
          rv[this.config.commands[key].name] = true;
          help = false;
        }
      }
    }

    if (help) {
      let name, description;

      if (opts) {
        name = opts.name;
        description = opts.description;
      }

      this.help(name, description);
    }

    return rv;
  }

  help (name, description) {
    if (name) {
      console.log('\n' + name);
    }

    if (description) {
      console.log(description);
    }

    console.log('\n');
    console.log('Options: \n');

    const optsTable = new Table({
      chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
             , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
             , 'left': ' ' , 'left-mid': ' ' , 'mid': '' , 'mid-mid': ''
             , 'right': '' , 'right-mid': '' , 'middle': '  ' }
    });

    for (var key in this.config.options) {
      if (this.config.options[key].short) {
        optsTable.push(['--' + this.config.options[key].name + ' [-' + this.config.options[key].short + ']', this.config.options[key].description]);
      } else {
        optsTable.push(['--' + this.config.options[key].name, this.config.options[key].description]);
      }
    }

    console.log(optsTable.toString());

    console.log('Commands: \n');

    const cmdTable = new Table({
      chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
             , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
             , 'left': ' ' , 'left-mid': ' ' , 'mid': '' , 'mid-mid': ''
             , 'right': '' , 'right-mid': '' , 'middle': '  ' }
    });

    for (var key in this.config.commands) {
      cmdTable.push([this.config.commands[key].name, this.config.commands[key].description]);
    }

    console.log(cmdTable.toString());

    console.log('\n');
  }
}

module.exports = new Argument;
