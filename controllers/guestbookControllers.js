const guestbookDAO = require('../models/guestbookModel');
const db = new guestbookDAO();

db.init();

exports.entries_list = function(req, res) {
    res.send('<h1>Not yet implemented: show a list of guest book entries.</h1>');
    db.getAllEntries();
}
/*
exports.landing_page = function(req, res) {
    res.render("entries", {
        'title': 'Guest Book',
        'entries': [ {
        'subject' : 'Good day out',
        'contents' :'We had a really good time visiting the museum.',
        'author': 'Fred' ,
        'published': '10th June' 
        },
        {
        'subject' : 'Good place to be on a rainy day.',
        'contents' : 'Nice paintings too.',
        'author': 'David' ,
        'published': '1st August'
        },
        {
        'subject' : 'Yummy',
        'contents': 'Good food :-).',
        'author': 'Ollie' ,
        'published': '3rd August'
        }
        ]
        }); 
}
*/
exports.landing_page = function(req, res) {
    db.getAllEntries()
        .then((list) => {
            res.render('entries', {
                'title': 'Guest Book',
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}
exports.new_entry = function(req, res) {
    res.send('<h1>Not yet implemented: show a new entry page.</h1>');
}
exports.peters_entries = function(req, res) {
    res.send('<h1>Processing Peter\'s Entries, see terminal</h1>');
    db.getPetersEntries();
}