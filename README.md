# Auto Snippets
This extension automatically inserts a predefined snippet when a file is created, or an empty file is opened.

This allows you to insert template classes, `#pragma once` statements or include guards, copyright comments, etc.

## Why not `gruntfuggly.auto-snippet`?
This extension is a clone of `gruntfuggly.auto-snippet` in almost every way. The differences are:
* This extension loads in about 17ms, while gruntfuggly's takes ~140ms;
* This extension runs inserts all snippets matched by a file, not just the first one.

## Configuration
`auto-snippets.snippets` is an array of objects, each describing what should be inserted and for which files. These objects are:
- `pattern`: A shell glob pattern that should match the file path, supporting `*`, `**` for nested directories, and `{x,y}` for sets of possible values;
- `regex`: A regex pattern that should match the file path;
- `language`: A VS Code languange id (such as `typescript`) that the file should match;
- `snippet`: which snippet should be inserted;
- `commands`: which commands should be run. *Note: The commands are not executed synchronously. If no snippet is configured, the commands are still run*

Example:

```javascript
autoSnippet.snippets: [
    { "pattern": "**/ut-*.cpp", "snippet": "ut-template" },
    { "pattern": "**/*.h",      "snippet": "header-template" },
    { "pattern": "**/*.cpp",    "snippet": "body-template" },
    { "language": "javascript", "snippet": "template", "commands": ["editor.action.commentLine"] }
]
```

The patterns are matched in order of definition. All matched patterns will be run, not just the first one.

Use **Preferences: Configure User Snippets** to configure your snippets. For more information on configuration snippets, see [here](https://code.visualstudio.com/docs/editor/userdefinedsnippets).

## Installing
You can install the latest version of the extension via the Visual Studio Marketplace [here](https://marketplace.visualstudio.com/items?itemName=andreasxp.auto-snippet).

### Source Code
The source code is available on GitHub [here](https://github.com/andreasxp/auto-snippet).

## Credits
This extension borrows almost all of the code from [Gruntfuggly's "Auto Snippet"](https://github.com/Gruntfuggly/auto-snippet).
Icon made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/), and transformed by the author.
