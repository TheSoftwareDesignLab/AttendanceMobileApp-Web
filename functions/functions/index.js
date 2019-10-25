functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.calculateAssitancePercentage = functions.firestore.document('/{semester}/{courseName}/attendance/{date}/students/{studentId}')
.onCreate((snap, context) => {
    data = snap.data();
    data.assistanceCount = data.assistanceCount + 1;
    data.assitancePercentage =  data.assitancePercentage;

    return functions.firestore.document('/' + context.params.semester + '/' + context.params.courseName + '/students/'+ context.params.studentId)
    .set(data, {merge: true} ).then( response => {
        console.log('funciono el cálculo del porcentaje');
	}).catch( error => {
        console.log('no funciono el cálculo del porcentaje' + error.error);
    });
});