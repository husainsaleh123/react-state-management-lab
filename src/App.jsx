import { useState } from 'react';
import './App.css'

function App() {

  const [team, setTeam] = useState([]) //setting the useState of the team to 0
  const [money, setMoney] = useState(100) //setting the useState of money to 100
  const [zombieFighters, setZombieFighters] = useState([
  {
    id: 1,
    name: 'Survivor',
    price: 12,
    strength: 6,
    agility: 4,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/0c2d6b.png',
  },
  {
    id: 2,
    name: 'Scavenger',
    price: 10,
    strength: 5,
    agility: 5,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/033a16.png',
  },
  {
    id: 3,
    name: 'Shadow',
    price: 18,
    strength: 7,
    agility: 8,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/262c36.png',
  },
  {
    id: 4,
    name: 'Tracker',
    price: 14,
    strength: 7,
    agility: 6,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/3c1e70.png',
  },
  {
    id: 5,
    name: 'Sharpshooter',
    price: 20,
    strength: 6,
    agility: 8,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/4b2900.png',
  },
  {
    id: 6,
    name: 'Medic',
    price: 15,
    strength: 5,
    agility: 7,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5a1e02.png',
  },
  {
    id: 7,
    name: 'Engineer',
    price: 16,
    strength: 6,
    agility: 5,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5e103e.png',
  },
  {
    id: 8,
    name: 'Brawler',
    price: 11,
    strength: 8,
    agility: 3,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/67060c.png',
  },
  {
    id: 9,
    name: 'Infiltrator',
    price: 17,
    strength: 5,
    agility: 9,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/ac3220.png',
  },
  {
    id: 10,
    name: 'Leader',
    price: 22,
    strength: 7,
    agility: 6,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/e41f26.png',
  },
])


  //Function to add a fighter
  function handleAddFighter(fighter){
    if (money < fighter.price) {
      console.log("Not enough money"); 
      return;
    }

    // Add the fighter to the team array (keeps old fighters and adds the new ones)
    setTeam((prev) => [...prev, fighter]);
    
    // Remove the fighter from the zombieFighters list (available fighters to choose from)
    // This keeps all fighters except the one that was just added to the team
    setZombieFighters((prev) => prev.filter((f) => f.id !== fighter.id));

     // Deduct the fighter's price from the player's money
    setMoney((prev) => prev - fighter.price);
  }


  //Function to handle removing a fighter
  function handleRemoveFighter(fighter) {

    // Remove the fighter from the team (keep all except the one matching the ID)
    setTeam((prev) => prev.filter((f) => f.id !== fighter.id));

    // Add the fighter back into the zombieFighters list
    // Spread old zombie fighters plus the removed fighter, then sort them by ID (basically adds the removed fighter to old fighters)
    setZombieFighters((prev) => [...prev, fighter].sort((a, b) => a.id - b.id));

     // Refund the fighter's price to the player's money
    setMoney((prev) => prev + fighter.price);
  }

  // Calculate the total strength of all fighters currently in the team
  // 'reduce' starts with sum = 0, then adds each fighter's strength
  const totalStrength = team.reduce((sum, f) => sum + f.strength, 0);

  // Calculate the total agility of all fighters in the team
  const totalAgility  = team.reduce((sum, f) => sum + f.agility, 0);

  return (
    <>
      
      <div>
        <header>
            <h1>Zombie Fighters</h1>
            <h2> Money: <strong>{money}</strong></h2>
            <h2> Team Strength: <strong>{totalStrength}</strong></h2>
            <h2> Team Agility: <strong>{totalAgility}</strong></h2>
        </header>

        <section>
         <h2>Team</h2>
          {team.length === 0 ? (
            <p>Pick some team members!</p>
          ) : (
            <ul>
              {team.map((fighter) => (
                <li key={fighter.id}>
                  <img src={fighter.img} alt={fighter.name} />
                  <div>
                    <h3>{fighter.name}</h3>
                    <p>Price: ${fighter.price}</p>
                    <p>Strength: {fighter.strength}</p>
                    <p>Agility: {fighter.agility}</p>
                  </div>
                  <button onClick={() => handleRemoveFighter(fighter)}>
                      Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>


        <section>
          <h2>Fighters</h2>
        <ul>
          {zombieFighters.map((fighter) => (
            <li key={fighter.id}>
              <img src={fighter.img} alt={fighter.name} />
              <div>
                <h3>{fighter.name}</h3>
                <p>Price: ${fighter.price}</p>
                <p>Strength: {fighter.strength}</p>
                <p>Agility: {fighter.agility}</p>
              </div>
              <button onClick={() => handleAddFighter(fighter)} disabled={money < fighter.price}>Add</button>
            </li>
          ))}
        </ul>

        </section>

        </div>
      </>
  );
}

export default App
