const BC = require('../models/bc');

exports.bcInq = function (req, res) {
    BC.find({},{_id:0,odnumpe:1,odaubur:1,odaucom:1},function (err, doc) {
        if (err) return console.log(err);
        console.log("Clientes encontrados...");
        console.log(doc);
        res.send(doc);
    }).sort({odnumpe:1});
};
exports.bcAdd = (req, res) => {
    Buro = new  BC({
        odnumpe: req.body.odnumpe,
        odaubur: req.body.odaubur,
        odaucom: req.body.odaucom
    });
    console.log(Buro);
    Buro.save(function (err, Buro) {
        if (err) return console.error(err);
        // console.log(tour.tourName + " insertado en la coleccion tours...");
        res.send(Buro.odnumpe + " insertado en la coleccion ...");
    });
}