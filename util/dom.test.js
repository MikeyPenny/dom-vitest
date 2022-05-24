import { it, expect, vi, beforeEach } from "vitest";
import { showError } from "./dom";

import fs from "fs";
import path from "path";
import { Window } from "happy-dom";

const htmlDocPath = path.join(process.cwd(), "index.html");
const htmlDocContent = fs.readFileSync(htmlDocPath).toString();
const window = new Window();

const document = window.document;

vi.stubGlobal("document", document);

beforeEach(() => {
	document.body.innerHTML = "";
	document.write(htmlDocContent);
});

it('should add an error paragraph to the id="errors" element', () => {
	showError("test");

	// hold the error element
	const errorsElement = document.getElementById("errors");
	const errorParagraph = errorsElement.firstElementChild;

	expect(errorParagraph).not.toBeNull();
});

it("should not contain a paragraph initially", () => {
	const errorsElement = document.getElementById("errors");
	const errorParagraph = errorsElement.firstElementChild;

	expect(errorParagraph).toBeNull();
});

it("should output the message in the error p element", () => {
	const testMessage = "test";
	showError(testMessage);
	const errorsElement = document.getElementById("errors");
	const errorParagraph = errorsElement.firstElementChild;

	expect(errorParagraph.textContent).toBe(testMessage);
});
