## Installation
```bash
npm install [--save] argument.js
```

## Usage
```javascript
const argument = require('argument.js');
```

### Adding an option
An option is `--option_name <value>`
```javascript
argument.option('option_name', 'description', 'default(if the user only enters --name)', 'short_form');
```

### Adding a command
A command is `command-name`
```javascript
argument.command('command-name', 'description');
```
> You can add as many commands / options as you want.

### Parsing argv
```javascript
const args = argument.parse(process.argv.slice(2));

if (args.option_name){
  console.log(args.option_name);
}

if (args.option_name){
  console.log(args.option_name);
}
```

### Accessing additional parameters
Additional parameters can be accessed at `args._`.
```javascript
console.log(args._);
```

### License
MIT
