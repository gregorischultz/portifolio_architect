const { IncomingForm } = require("formidable");

function parseForm(req) {
  const form = new IncomingForm({
    multiples: true,
    keepExtensions: true,
    uploadDir: "./public/uploads",
    
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
