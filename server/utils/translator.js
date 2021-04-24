process.env.GOOGLE_APPLICATION_CREDENTIALS = '/home/daniel/workspace/fullstack/lets-chat-backend/creds/lets-chat-translator-9c0eec1a3726.json';
const {Translate} = require('@google-cloud/translate').v2;

const translate = new Translate();

async function translateMsg(msg, target) {
  try {
    const [translation] = await translate.translate(msg, target);
    return translation;

  } catch (err) {
    console.log(err);
    return 'Something Went Wrong!';
  }
}

async function listLang() {
  const [languages] = await translate.getLanguages();
  var langList = [];
  languages.forEach(language => {
    langList.push(language);
  });
  return langList;
}

// You are allowed to export more than one module with module.exports = {}
module.exports = { translateMsg, listLang }