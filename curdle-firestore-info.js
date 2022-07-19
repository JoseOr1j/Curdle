/* useful firestore info for our curdle game */

// how to store a score or really anything in firestore
firebase.firestore().collection(`users/${userId}`).add({
  score: `${scoreYouWantToSet}`
})
// where score for the is # of tries taken / total games, and the lower the better
// all 0 is factored out 

// for unlimited wordle, total wins per day with highest guess percentage 
// score is the same
firebase.firestore().collection(`users/${userId}`).add({
    score: `${scoreYouWantToSet}`,
    guessPercentage: `${guessPercentageToSet}`
  })

// TO GET DATA (for example, to get "score")
async function getScore() {
  const snapshot = await firebase.firestore().collection('score').get()
  return snapshot.docs.map(doc => doc.data());
}

// or another way we can store is
async function getScore() {
  const score = [];
  await firebase.firestore().collection('score').get()
    .then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
      markers.push(doc.data());
    });
  });
  return score;
}


