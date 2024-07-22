const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.getResume = functions.https.onRequest(async (req, res) => {
    const id = req.query.id;
    if (!id) {
        res.status(400).send('Please provide an id');
        return;
    }

    try {
        const doc = await db.collection('Resumes').doc(id).get();
        if (!doc.exists) {
            res.status(404).send('Resume not found');
        } else {
            res.status(200).json(doc.data());
        }
    } catch (error) {
        res.status(500).send(error.toString());
    }
});
