const db = require("../models");
const ShortURL = db.shortlink;
const main_url = "http://localhost:8080/";
let short_url = '';

exports.create = async (req, res) => {
    const fullUrl = req.body.full_url;
    if (fullUrl) {
        console.log('URL requested: ', fullUrl);
        // insert and wait for the record to be inserted using the model
        const record = new ShortURL({
            full_url: fullUrl
        });
        await record.save();
        // res.json({ ok: 1 })
        // res.redirect('/', {shortUrl: record.short_url });
        short_url = record.short_url;
        res.redirect('/');
        // res.render('index', { shortURL:  main_url + record.short_url });   
    } else {
        return;
    }
};

// Find a single ShortURL with an id
exports.findURL = async (req, res) => {  
    ShortURL.findOneAndUpdate({ short_url: req.params.short_url }, {$inc: { clicks: 1 }} , { new: true, useFindAndModify: false })
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "URL not found " + main_url + req.params.short_url
            });            
        }
        res.redirect(data.full_url);
        // res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "URL not found" + main_url + req.params.short_url
            });                
        }
        return res.status(500).send({
            message: "Error retrieving URL" + main_url + req.params.short_url
        });
    });
};

exports.showURL = async (req, res) => {
	res.render('index', { shortURL:  short_url });
}

exports.deleteAll = (req, res) => {
    ShortURL.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Tutorials were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

