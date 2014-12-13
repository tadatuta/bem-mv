bem-mv
======

Renames BEM blocks with some intelligence.

The package provides two commands: `bemcp` and `bemmv`. The only difference is that `bemmv` removes source block.

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
