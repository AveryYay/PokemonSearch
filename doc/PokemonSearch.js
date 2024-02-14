const pokeName = document.getElementById("pokemon-name");
const pokeId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const type = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const sp_attack = document.getElementById("special-attack");
const sp_defense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const pokeImg = document.getElementById("pokemon-sprite");
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchBtn.addEventListener("click", HandleSearch);

async function HandleSearch() {
    const inputValue = searchInput.value.toLowerCase();
	console.log(inputValue);
    if (!inputValue) {
      alert("Please fill out this field");
      return;
    }
  if (inputValue.includes("Red")) {
    alert("Pokémon not found");
    return;
  }
  let numPoke = 0;
  let target = {};
  try {
    const res = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
    const data = await res.json();
    numPoke = data.count;
    const inputId = Number(inputValue);
    if (!inputId) {
      if (inputId === 0) {
        alert("Pokémon not found");
        return;
      }
      target = data.results.find(pokemon => pokemon.name === inputValue);
    } else {
      if (inputId > numPoke){
        alert("Pokémon not found");
        return;
      }
      target = data.results[inputId-1];
    }
    pokeId.textContent = `#${target.id}`;
    pokeName.textContent = target.name;
    HandleSearchPoke(target);
  } catch (err) {
    console.log(err);
  }
}

async function HandleSearchPoke(poke) {
  try {
    const res = await fetch(`https${poke.url.slice(4)}`);
    const data = await res.json();
    height.textContent = `Height: ${data.height}`;
    weight.textContent = `Weight: ${data.weight}`;
    pokeImg.innerHTML = `<img src="${data.sprites.front_default}" id="pokemon-image">`;
    type.textContent = data.types[0].type.name.toUpperCase();
    hp.textContent = data.stats.find(s => s.stat.name==="hp").base_stat;
    attack.textContent = data.stats.find(s => s.stat.name==="attack").base_stat;
    defense.textContent = data.stats.find(s => s.stat.name==="defense").base_stat;
    sp_attack.textContent = data.stats.find(s => s.stat.name==="special-attack").base_stat;
    sp_defense.textContent = data.stats.find(s => s.stat.name==="special-defense").base_stat;
    speed.textContent = data.stats.find(s => s.stat.name==="speed").base_stat;
    types.style.display = "block";
  } catch (err) {
    console.log(err);
  }
  console.log("finished");
}



