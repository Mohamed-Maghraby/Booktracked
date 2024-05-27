const { readFile, writeFile } = require('fs').promises;
const { join } = require('path');
const errors = require('./errors');

class File {
  static async txtToHTML(
    filePath,
    nameNewHtml,
    options = { minLetters: 4, minParagraphs: 2 },
  ) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content, options);
    if (validation.valid) {
      await File.putTextIntoHtml(content, nameNewHtml);
    } else {
      throw new Error(validation.error);
    }
  }

  static async getFileContent(filePath) {
    // const fileName = join(__dirname, `../${filePath}`);
    // const result = (await readFile(fileName)).toString('utf8');
    const result = (await readFile(filePath)).toString('utf8');
    return result;
  }

  static isValid(text, options) {
    const minLettersLength = options.minLetters;
    const minParagraphsLength = options.minParagraphs;
    const validation = { valid: true, error: null };
    function verifyError(verify, error) {
      if (!verify) {
        validation.valid = false;
        validation.error =
          validation.error !== null ? validation.error + ',' + error : error;
      }
    }
    const textWithoutSpace = text.replace(/\s/g, '').replace(/\n/g, '');
    const isWithCorrectLenght = textWithoutSpace.length >= minLettersLength;
    const isWithCorrectParagraphs =
      text.split('\n').length >= minParagraphsLength;
    verifyError(isWithCorrectLenght, errors.FILE_TEXT_LENGTH);
    verifyError(isWithCorrectParagraphs, errors.FILE_PARAGRAPHS_LENGTH);
    return validation;
  }

  static async putTextIntoHtml(content, nameNewHtml) {
    // Split the content into paragraphs based on new lines and trim whitespace
    const paragraphs = content.split(/\n\s*?\n/);

    // No need to filter out empty paragraphs as split won't create them here
    const wrappedParagraphs = paragraphs.map(paragraph => `<p>${paragraph}</p>`);

    // Join all paragraphs
    const newContent = wrappedParagraphs.join('\n');

    // Path to the template HTML file
    const exampleHtmlPath = join(__dirname, '..', 'views', 'template.html');
    // Read the template HTML file
    const exampleHtml = (await readFile(exampleHtmlPath)).toString('utf8');
    // Replace the placeholder with the new content
    const newHtmlContent = exampleHtml.replace('{ext}', newContent);

    // Path for the new HTML file
    const newHtmlPath = join(__dirname, '..', 'views', `${nameNewHtml}.html`);
    // Write the new content to the new HTML file
    await writeFile(newHtmlPath, newHtmlContent);

  }
}

/*You can use File.txtToHtml() to take a txt file content and put in a HTML,
 the program will search for {ext} and replace the it using the content of TXT file, 
 you also can change the options, as default you need to have a txt with at least 4 letters and 
 2 paragraphs, but you can change it passing as third param to File.txtToHtml() an object 
 like that: {maxParagraphs: <value>, maxLetters: <value> }*/

//Examples of invalids Files:
// File.txtToHTML('../mocks/invalid_letters_paragraphs.txt', 'new');
// File.txtToHTML('./mocks/invalid_letters.txt', 'new');
// File.txtToHTML('../mocks/invalid_paragraphs.txt', 'new');

//Examples of valid File:

//File.txtToHTML('./mocks/valid.txt', 'new')

module.exports = File;
