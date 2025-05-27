const formidable = require("formidable");

function parseForm(req) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
    uploadDir: "./public/uploads", // certifique-se de que essa pasta existe
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

const config = {
  api: {
    bodyParser: false, // necessário para formidable funcionar corretamente
  },
};

module.exports = {
  parseForm,
  config,
};
