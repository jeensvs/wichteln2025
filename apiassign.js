export default function handler(req, res){
  const participants = ["Jens", "Susanne", "Claus", "Inga", "Ole", "Caroline", "Henrik", "Annbritt"];

  const fixedGiver = "Jens";
  const fixedReceiver = "Susanne";

  // Rest der Teilnehmer
  let others = participants.filter(p => p !== fixedGiver && p !== fixedReceiver);

  // Funktion: Derangement ohne Gegenseitigkeiten
  function shuffleNoMutual(arr) {
    let shuffled;
    let attempts = 0;
    do {
      shuffled = arr.slice().sort(() => Math.random() - 0.5);
      let valid = true;
      for(let i=0; i<shuffled.length; i++){
        const giver = arr[i];
        const receiver = shuffled[i];
        // Keine Selbstzuweisung
        if(giver === receiver) valid = false;
        // Keine gegenseitige Zuweisung
        if(i > 0 && shuffled[i-1] === arr[i]) valid = false;
      }
      attempts++;
      if(attempts > 1000) break; // Sicherheit, falls kein gültiges Shuffle gefunden wird
    } while(!shuffled.every((v,i)=>v!==arr[i])); 
    return shuffled;
  }

  const shuffled = shuffleNoMutual(others);

  const result = {};
  result[fixedGiver] = fixedReceiver;

  for(let i=0; i<others.length; i++){
    const giver = others[i];
    const receiver = shuffled[i];
    result[giver] = receiver;
  }

  res.status(200).json(result);
}