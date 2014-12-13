bem-mv
======

**Important!** The name of the package will be changed soon.

`bemls` lists all BEM entities on the given levels (`['*.blocks', '**/*.blocks']` by default).

`bemfind` lists all BEM entities filtered by class name. E.g. `bemfind input__control`.

`bemmv` and `bemcp` rename BEM blocks with some intelligence.
The only difference is that `bemmv` removes source block.

## Usage:

### Make a copy of b1 as b2 on `*.blocks` level:
```bash
bemcp b1 b2
```

### Replace b1 with b2 on `*.blocks` level:
```bash
bemmv b1 b2
```

### Replace b1 with b2 on particular list of levels:
```bash
bemmv b1 b2 common.blocks,desktop.blocks
```

### Replace `input` with `b-input` on all levels matched by mask:
```bash
bemmv input b-input 'libs/**/*.blocks'
```

### Add prefixes to all blocks on all levels in bem-components library:
```bash
bemmv '*' 'b-*' 'libs/bem-components/*.blocks'
```

**Important**: `'` is needed for any wildcards.
