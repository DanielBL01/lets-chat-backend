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

module.exports = { translateMsg, listLang }