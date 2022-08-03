import * as vscode from 'vscode';
import * as micromatch from 'micromatch';

type SnippetMapping = {
	language: string;
	pattern: string;
	regex: string;
	snippet: string;
	commands: Array<string>;
};

var isEmpty = (document: vscode.TextDocument) => {
	return document.lineCount === 1 && document.getText(new vscode.Range(0, 0, 0, 1)).length === 0;
}

export function activate(context: vscode.ExtensionContext) {
	const mappings: Array<SnippetMapping> = vscode.workspace.getConfiguration('autoSnippet').get('snippets', []);
	console.log(mappings);

	let processSnippets = vscode.workspace.onDidOpenTextDocument(document => {
		if (document?.uri?.scheme !== 'file' || !isEmpty(document)) {
			return;
		}

		const mappings: Array<SnippetMapping> = vscode.workspace.getConfiguration('autoSnippet').get('snippets', []);
		const filename = document.fileName;
		console.log("Opened empty file " + filename);

		console.log(mappings);
		mappings.forEach((mapping: SnippetMapping) => {
			console.log(mapping);

			var languageMatch = mapping.language && mapping.language === document.languageId;
			var nameMatch = mapping.pattern && micromatch.isMatch(filename, mapping.pattern);
			var regexMatch = false;

			if (mapping.regex) {
				var regex = new RegExp(mapping.regex);
				regexMatch = !!filename.match(regex);
			}

			if (languageMatch) console.log(" Matched language " + document.languageId);
			if (nameMatch) console.log(" Matched pattern " + mapping.pattern);
			if (regexMatch) console.log(" Matched regex " + mapping.regex);

			if (!languageMatch && !nameMatch && !regexMatch) {
				return;
			}

			vscode.window.showTextDocument(document, 0, false);
			vscode.commands.executeCommand('editor.action.selectAll').then(() => {
				if (mapping.snippet) {
					console.log(" Inserting snippet " + mapping.snippet);

					var insertedTimeout = setTimeout(() => {
						vscode.window.showErrorMessage("Missing, empty or invalid snippet: " + mapping.snippet);
					}, 1000);

					vscode.commands.executeCommand('editor.action.insertSnippet', {name: mapping.snippet}).then(() => {
						var editor = vscode.window.activeTextEditor;
						if (editor && editor.document && editor.document.getText() === "") {
							vscode.window.showErrorMessage("Missing, empty or invalid snippet: " + mapping.snippet);
							console.log("  Nothing inserted. Does snippet exist?");
						} else {
							console.log("  Inserted");
						}

						clearTimeout(insertedTimeout);
					});
				}

				if (mapping.commands) {
					mapping.commands.forEach(command => {
						console.log(" Running command: " + command);
						vscode.commands.executeCommand(command);
					});
				}
			});
		});
	});
	context.subscriptions.push(processSnippets);
}

export function deactivate() {}