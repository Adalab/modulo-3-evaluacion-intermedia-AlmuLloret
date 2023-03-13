// IMPORT 
import { useState, useEffect  } from 'react';
import '../styles/App.scss';


// COMPONENT
function App() {

//Variables de estado
const [quote, setQuote] = useState ("");
const [character, setCharacter] = useState (""); 
const [friends,setFriends] = useState ([]); 
const [newFriend, setNewFriend] = useState ({
  quote:"",
  character:"",
});

// Effect functions 

useEffect(  () => {
    fetch('https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json')
      .then(response => response.json())
      .then(data => {
        setFriends( data );
      });
} , [] );

// Handler functions

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const renderFriends = () =>{
    if (character!== 'Todos'){
    return friends
      .filter ((eachFriend) =>
        eachFriend.quote.toLocaleLowerCase().includes(quote.toLocaleLowerCase())
        &&
        eachFriend.character.toLocaleLowerCase().includes(character.toLocaleLowerCase())
      )
      .map((oneFriend,i) => (
        <li key={i}>
          <p>{oneFriend.quote}</p>
          <p>{oneFriend.character}</p>
        </li>
      ));
    } else {
      return friends
      .filter ((eachFriend) =>
        eachFriend.quote.toLocaleLowerCase().includes(quote.toLocaleLowerCase())
      )
      .map((oneFriend,i) => (
        <li key={i}>
          <p>{oneFriend.quote}</p>
          <p>{oneFriend.character}</p>
        </li>
      ));
    }
  }

  
  const handleChangeQuote = (event) =>{
    setQuote(event.target.value); 
  }

  const handleChangeCharacter = (event) =>{
    setCharacter(event.target.value);
  }

  const handleNewFriend = (event) => {
    setNewFriend({ ...newFriend, [event.target.id]: event.target.value });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    setFriends([...friends, newFriend]);
    setNewFriend({ quote: '', character: ''});
  };


// HTLML

  return(
  <div className="friends">
    <header>
      <h1>Frases de Friends</h1>
    </header>
    <main>
      {/* Render friends */}
      <section>
        {renderFriends()}
      </section>
      {/* Filter friends */}
      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="quote">Filtrar por frase
            <input
              onInput={handleChangeQuote}
              value={quote}
              type="text"
              name="quote"
              id="quote"
            />
          </label>
          <label htmlFor="character">Filtrar por personaje
            <select onChange={handleChangeCharacter} value={character} name="character" id="character">
                <option value="Todos" default>Todos</option>
                <option value="Ross">Ross</option>
                <option value="Monica">Monica</option>
                <option value="Joey">Joey</option>
                <option value="Phoebe">Phoebe</option>
                <option value="Chandler">Chandler</option>
                <option value="Rachel">Rachel</option>
              </select>
          </label>
        </form>
      </section>
      {/* Add friends */}
      <section>
        <h2>Add a new quote</h2>
        <form>
          <input
            type="text"
            name="quote"
            id="quote"
            placeholder="Type the new quote"
            value={newFriend.quote}
            onInput={handleNewFriend}
           />
          
           <input
            type="text"
            name="character"
            id="character"
            placeholder="Type character"
            value={newFriend.character}
            onInput={handleNewFriend}
          />
           <input
            type="submit"
            value="Add a new quote"
            onClick={handleClick}
          />


        </form>
      </section>
    </main>

  </div>
  ); 
}

export default App;
