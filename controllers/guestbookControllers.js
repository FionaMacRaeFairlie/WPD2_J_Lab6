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
exports.new_entries = function(req, res) {
    res.render('newEntry', {
    'title': 'Guest Book'
    })
}

exports.post_new_entry = function(req, res) {
    console.log('processing post-new_entry controller');
    if (!req.body.author) {
    	response.status(400).send("Entries must have an author.");
    	return;
    }
    db.addEntry(req.body.author, req.body.subject, req.body.contents);
    res.redirect('/');
}

exports.peters_entries = function(req, res) {
    res.send('<h1>Processing Peter\'s Entries, see terminal</h1>');
    db.getPetersEntries();
}

exports.show_user_entries = function(req, res) {
    console.log('filtering author name', req.params.author);
    let user = req.params.author;
    db.getEntriesByUser(user).then(
        (entries) => {
         res.render('entries', {
            'title': 'Guest Book',
             'entries': entries
    });
 }).catch((err) => {
    console.log('error handling author posts', err);
    });
}
