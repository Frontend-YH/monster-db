'use strict';

// MONSTER-SHOWCASE AUDIO
var audioMonster = new Audio('monster.wav');
function displayMinfo() {
    audioMonster.play();
}




let btn = document.querySelector('#sub-btn');
let headertext =  document.querySelector("#header-text");
let main =  document.querySelector(".monster-showcase");
let mcolors = document.querySelector("#monster-color-list");
let mtypes = document.querySelector("#monster-type-list");

// MonsterObjekt med en array som innehåller monster , samt en addMonster metod.
const monsterObject = {
    monster: [
        {
            name: 'Tentacel',
            color: 'Yellow',
            type: 'Mid',
        },
        {
            name: 'Basilisk',
            color: 'Green',
            type: 'Large',
        },
        {
            name: 'Beelzebub',
            color: 'Black',
            type: 'Small',
        },
        {
            name: 'Beatles',
            color: 'Black',
            type: 'Large',
        },
        {
            name: 'Automatons',
            color: 'Pink',
            type: 'Large',
        },
        {
            name: 'Husmonstret',
            color: 'Pink',
            type: 'Mid',
        },
        {
            name: 'Skabbjörnen',
            color: 'Green',
            type: 'XXL',
        },
       /*  editMonsterapperance: function() {
        }, */
    ],
    filteredMonsters: [{}],

 /* --------Funktion för att lägga till monster samt kolla så inte användaren lägger till dubletter------- */
    addMonster: function() {

        let newName = document.querySelector("#monster-name").value;
        let newColor = document.querySelector("#color-select").value;
        let newType = document.querySelector("#monster-type").value;

        const duplicate = this.monster.map(e => e.name).indexOf(newName);
        
        // The map() method creates a new array populated with the results of calling 
        // a provided function on every element in the calling array.
        // Returns: A new array with each element being the result of the callback function.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        if(duplicate!==-1) { alert('Monstret finns redan! Välj ett annat namn!');
        }else {

       this.monster.push({
            name: newName,
            color: newColor,
            type: newType,   });

        document.querySelector("#monster-name").value = "";
        document.querySelector("#color-select").value = "";
        document.querySelector("#monster-type").value = "";

        showMonsterColors();
        showMonsterTypes();
        console.log(this.monster);

        }

    }
}



// redigera monster och kunna lägga till antal tentakler, antal ögon, antal horn och antal armar

// hämtar alla monster och sorterar dom på färger
/*  function monsterByColor(monsterObject.monster.color) {

} */
// hämtar alla monster och sorterar dom efter typ
/* typeofMonster: function(monsterObject.monster.type) {
}
editmonster: function() {
} */

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


// Lägger man till ett till monster så läggs det till och uppdaterar main
btn.addEventListener("click", function(e){

    monsterObject.addMonster();
    removeAllChildNodes(main);
    monsterCards('monster'); // Ladda in monsterCards igen
    e.preventDefault();
  });

  // Klickar man på Monster DB Titeln i headern så reloadas objectMonster.monster
  headertext.addEventListener("click", function(e){

    removeAllChildNodes(main);
    monsterCards('monster'); // Ladda in monsterCards igen
    //displayMinfo(); 
    e.preventDefault();
  });

/*--------------------Funktion för att hämta alla monstren och visa dom på skärmen----------*/

function monsterCards(monsterList) {

    removeAllChildNodes(main);

    // Loopar igenom
    for (let i = 0; i < monsterObject[monsterList].length; i++) {
        let article = document.createElement("article");
        let h4 = document.createElement("h4");

        let ul = document.createElement("ul");
        let li1 = document.createElement("li");
        let li2 = document.createElement("li");

        // 2022-11-03 15:56 Lägger till class på UL för toggle historia
        ul.className = "monsterInfo";

        h4.innerText = monsterObject[monsterList][i]['name'];
        li1.innerHTML = `Color: ${monsterObject[monsterList][i]['color']}`;
        li2.innerHTML = `Type: ${monsterObject[monsterList][i]['type']}`;
        main.appendChild(article);
        article.appendChild(h4);
        article.appendChild(ul);
        ul.appendChild(li1);
        ul.appendChild(li2);

                /*
                (function(index){
                     h4.addEventListener("click", function() {
                        // Gör något
                })(i)
                */

      }
    return true;

}

monsterCards('monster');

// ####################################################################################
// Funktion som returnerar alla unika värden i t ex COLOR eller TYPE och skippar alla dubletter.
// Jobbar med parametrarna inputObject (dvs monsterObject.monster) och field där field
// anger vilken egenskap vi önskar samla ihop unika värden från, t ex från color eller type.
function getUniqueValues(inputObject, field) {
	const unique = Array.from(new Set(inputObject.map(item => item[field])));
	return unique;
}

function showMonsterColors() {
	// Samlar alla unika värden i Arrayen values. Värdena returneras med hjälp av funktionen 
	// getUniqueValues som vi låter jobba med våra monster i monsterObject, samt den egenskap
	// vi är intresserade av visa.
	let values = getUniqueValues(monsterObject.monster, 'color');

	// Sätter valueArray som Array;
	const valueArray = [];

	let amount; // Definierar en amount variabel att senare lägga Antal av en viss egenskap i.

	// Loopar igenom values Arrayen med en .forEach och samlar ihop egenskaper (values) och dess antal 
	// och lägger i en Array där egenskaper/values får index 0 och antal index 1.
    removeAllChildNodes(mcolors);

    values.forEach(function callback(value, index) {

	  // BLA BLA BLA FILTER
	  amount = monsterObject.monster.filter(({color}) => color === value).length;
        valueArray[index] = [];
        valueArray[index][0] = value;
        valueArray[index][1] = amount;
        let li = document.createElement("li");
        li.innerHTML = `${value}: ${amount}`;
        (function(index){
            li.addEventListener("click", function() {
                filterMonsters('color', value);
               })
       })(index)


        mcolors.append(li);


	});
}

function showMonsterTypes() {
	// Samlar alla unika värden i Arrayen values. Värdena returneras med hjälp av funktionen 
	// getUniqueValues som vi låter jobba med våra monster i monsterObject, samt den egenskap
	// vi är intresserade av visa.
	let values = getUniqueValues(monsterObject.monster, 'type');

	// Sätter valueArray som Array;
	const valueArray = [];

	let amount; // Definierar en amount variabel att senare lägga Antal av en viss egenskap i.

    removeAllChildNodes(mtypes); // Tar bort alla Monster Type child-nodes

	// Loopar igenom values Arrayen med en .forEach och samlar ihop egenskaper (values) och dess antal 
	// och lägger i en Array där egenskaper/values får index 0 och antal index 1.
    values.forEach(function callback(value, index) {

	  // BLA BLA BLA FILTER
	  amount = monsterObject.monster.filter(({type}) => type === value).length;
        valueArray[index] = [];
        valueArray[index][0] = value;
        valueArray[index][1] = amount;
        let li = document.createElement("li");
        li.innerHTML = `${value}: ${amount}`;

        (function(index){
            li.addEventListener("click", function() {
                filterMonsters('type', value);
               })
       })(index)

        mtypes.append(li);
	});
}


showMonsterTypes();
showMonsterColors();









// ################################ FILTER MONSTERS BY COLOR ########################################
/*
// Returnar antalet för en viss färg.
function filterMonstersByColor(feature) {
    let t = ({color}) => color === feature;
	let filtered = monsterObject.monster.filter(t);	
	return filtered;
}
monsterObject.filteredMonsters = filterMonstersByColor('Pink');

monsterCards('filteredMonsters');
*/
// ##################################################################################################








// Returnar antalet för en viss färg.
function filterMonstersByColor(feature) {
    let t = ({color}) => color === feature;
	let filtered = monsterObject.monster.filter(t);	
	return filtered;
}

// Returnar antalet för en viss typ
function filterMonstersByType(feature) {
    let t = ({type}) => type === feature;
    let filtered = monsterObject.monster.filter(t); 
    return filtered;
}

function filterMonsters(key, feature) {

    if (key=="type") {
        //alert(feature);
        monsterObject.filteredMonsters = filterMonstersByType(feature);
    } else if (key=="color") {
        //alert(feature);
    monsterObject.filteredMonsters = filterMonstersByColor(feature);
    }


    // Kör monsterCards funktionen med hämtning från monsterObject.filteredMonsters 
    // istället för monsterObject.monster
    monsterCards('filteredMonsters');

}









