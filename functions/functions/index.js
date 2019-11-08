functions = require('firebase-functions');
var admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

exports.calculateAssitancePercentage = functions.firestore.document('/{semester}/{courseName}/attendance/{date}/students/{studentId}')
.onCreate((snap, context) => {
    admin.firestore().collection('/' + context.params.semester + '/' + context.params.courseName + '/attendance').get().then(res => {
        
            totalAssistance = res.size;
            console.log('totalAssistance '+totalAssistance);

            admin.firestore().collection('/' + context.params.semester + '/' + context.params.courseName + '/students').doc(context.params.studentId).get().then(doc => {
                if (!doc.exists) {
                  console.log('No such document!');
                } else {
                  assistanceCount = doc.data().numAssistance + 1;
                  console.log('AssCount '+assistanceCount);
                  percentage = assistanceCount/totalAssistance;
                  console.log('% '+percentage);
        
                  admin.firestore().collection('/' + context.params.semester + '/' + context.params.courseName + '/students').doc(context.params.studentId)
                  .update({assistancePercentage: percentage, numAssistance: assistanceCount} ).then( response => {
                    console.log('funciono el cálculo del porcentaje');
                  }).catch( error => {
                    console.log('no funciono el cálculo del porcentaje' + error.error);
                  })                  
                }
              })
              .catch(err => {
                console.log('Error getting document', err);
              });              
    });    
});