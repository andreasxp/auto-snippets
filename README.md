# Auto Snippets
Insert text or run a command when a file of a particular type is created, or an empty file is opened. Insert template classes, `#pragma once` statements or include guards, copyright comments, etc.

## Installation
Open the Command Palette (Ctrl+P), then type in the following command:
```
ext install andreasxp.auto-snippets
```
Alternatively, install the extension directly from is [marketplace page](https://marketplace.visualstudio.com/items?itemName=andreasxp.auto-snippets).

## Why not [`gruntfuggly.auto-snippet`](https://github.com/Gruntfuggly/auto-snippet)?
This extension is a clone of `gruntfuggly.auto-snippet` in almost every way. The differences are:
- This extension loads in ~14ms, while gruntfuggly's takes ~140ms;
- This extension runs inserts all snippets matched by a file, not just the first one. This allows for complex chains of snippets.

## Configuration
`auto-snippets.snippets` is an array of objects, each describing what should be inserted and for which files. These objects are:
- `pattern`: A shell glob pattern that should match the file path, supporting `*`, `**` for nested directories, and `{x,y}` for sets of possible values;
- `regex`: A regex pattern that should match the file path;
- `language`: A VS Code languange id (such as `typescript`) that the file should match;
- `snippet`: which snippet should be inserted;
- `commands`: which VS Code commands should run.  
  *Note: The commands are not executed synchronously. If no snippet is configured, the commands are still run.*

Example:
```json
"auto-snippets.snippets": [
    { "pattern": "**/ut-*.cpp", "snippet": "ut-template" },
    { "pattern": "**/*.h",      "snippet": "header-template" },
    { "pattern": "**/*.cpp",    "snippet": "body-template" },
    { "language": "javascript", "snippet": "template", "commands": ["editor.action.commentLine"] }
]
```
The patterns are matched in order of definition. All matched patterns will be run, not just the first one.

Auto Snippets takes snippets from your user snippets. You can add new snippets by visiting *File > Preferences > Configure User Snippets*. [More information on VS Code snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets).

## Credits
This extension borrows almost all of the code from [Gruntfuggly's "Auto Snippet"](https://github.com/Gruntfuggly/auto-snippet).

Icon made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/), and modified by the author.

## License
This project is licensed under the GNU General Public License v3.0. See the [license file](/LICENSE.txt) for more information.
