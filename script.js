'use strict';

// MONSTER-SHOWCASE AUDIO
var audioMonster = new Audio('monster.wav');
function displayMinfo() {
    audioMonster.play();
}

let editbtn2 = document.querySelector('#edit-btn2');

let headertext =  document.querySelector("#header-text");

let main =  document.querySelector(".monster-showcase");
let addMonster = document.querySelector(".add-monster");
let editMonsters = document.querySelector(".edit-monsters");
let mcolors = document.querySelector("#monster-color-list");
let mtypes = document.querySelector("#monster-type-list");

let monsterFeaturesDiv = document.querySelector(".monster-features");


// Använder en querySelectorAll för att hämta samtliga items med mfeatures-checkboxes class på sig
let mfeaturesCheckboxes = document.querySelectorAll(".mfeatures-checkboxes");

let addMonsterForm = document.querySelector(".add-monster-form"); // Add Monster Form sektionen

// MonsterObjekt med en array som innehåller monster , samt en addMonster metod
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
    addMonster: function(newName, select) {

        /*
        let newName = document.querySelector("#monster-name").value;
        let newColor = document.querySelector("#color-select").value;
        let newType = document.querySelector("#monster-type").value;
        */

        const duplicate = this.monster.map(e => e.name).indexOf(newName);
        
        // The map() method creates a new array populated with the results of calling 
        // a provided function on every element in the calling array.
        // Returns: A new array with each element being the result of the callback function.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        if(duplicate!==-1) { alert('Monstret finns redan! Välj ett annat namn!');
        } else {

            let feature;
            let newMonster; 
            newMonster = { name: newName } // Lägg in det nya monstrets namn

            // Loopa igenom monsterFeatureType för att hämta alla selectade FeatureType värden
            for(let i=0; i<monsterObject.monsterFeatureType.length; i++) {     
                feature = this.monsterFeatureType[i].toLowerCase(); // FeatureType konvertering från VERSALER till gemener
                newMonster[feature] = select[i].value; // Lägg in de VALUES som selectats    
            }
           
       // Pusha det nya monsterObjektet till monsterObject.monster Arrayen.    
       this.monster.push(newMonster); 
       
        // Nollställ monster-name inför nästa inlägg
        document.querySelector("#monster-name").value = "";

        /* // Ej nollställda i dagsläget
        document.querySelector("#color-select").value = "";
        document.querySelector("#monster-type").value = "";
            */

        showMonsterColors();
        showMonsterTypes();
      
        }

    }, 
    // Method to remove monster feature
    removeFeature: function(id) {
    
       this.monsterFeatures[id] = []; // Reset feature to zero/undefined
   
    }, 

    monsterFeatures: [],
    monsterFeatureType: ['Color','Type'],

}

// Diverse DEFAULT-VÄRDEN till monsterFeatures och MonsterFeatureTypes.
// Color features type of feature as id (linked to item in monsterFeatureType Array)
monsterObject.monsterFeatures[0] = [];
monsterObject.monsterFeatures[1] = [];
monsterObject.monsterFeatures[2] = [];
monsterObject.monsterFeatures[3] = [];
monsterObject.monsterFeatures[4] = [];
monsterObject.monsterFeatures[5] = [];
monsterObject.monsterFeatures[6] = [];
monsterObject.monsterFeatures[7] = [];

monsterObject.monsterFeatures[0][0] = 0;
monsterObject.monsterFeatures[1][0] = 0;
monsterObject.monsterFeatures[2][0] = 0;
monsterObject.monsterFeatures[3][0] = 0;
monsterObject.monsterFeatures[4][0] = 0;
monsterObject.monsterFeatures[0][1] = 'Yellow';
monsterObject.monsterFeatures[1][1] = 'Pink';
monsterObject.monsterFeatures[2][1] = 'Brown';
monsterObject.monsterFeatures[3][1] = 'Black';
monsterObject.monsterFeatures[4][1] = 'Green';

monsterObject.monsterFeatures[5][0] = 1;
monsterObject.monsterFeatures[6][0] = 1;
monsterObject.monsterFeatures[7][0] = 1;
monsterObject.monsterFeatures[5][1] = 'Small';
monsterObject.monsterFeatures[6][1] = 'Mid';
monsterObject.monsterFeatures[7][1] = 'Large';

monsterObject.monsterFeatures[0][2] = '#ffff00';
monsterObject.monsterFeatures[1][2] = '#ff00ff';
monsterObject.monsterFeatures[2][2] = '#800000';
monsterObject.monsterFeatures[3][2] = '#000000';
monsterObject.monsterFeatures[4][2] = '#00ff00';

monsterObject.monsterFeatures[5][2] = '#ffffff';
monsterObject.monsterFeatures[6][2] = '#ffffff';
monsterObject.monsterFeatures[7][2] = '#ffffff';



function LoadSelectBoxes() {

    let select = []; // Deklarera en select array
    let option = []; // Deklarera en option array
    let label = []; // Deklarera en label array
    let monsterFeatureType;
    let monsterFeature;
    let typid;

    // Ta fram SELECT-boxar baserat på vilka olika Feature Typer som finns i objektets array monsterFeatureType.
    // Default är Color och Type. Ta även fram tillhörande Labels.
    for(let i=0; i<monsterObject.monsterFeatureType.length; i++) {

        // T ex Color, eller Type
        monsterFeatureType = monsterObject.monsterFeatureType[i]; // Sätt typ av Monster Feature

        label[i] = document.createElement("label");
        label[i].setAttribute("class", "input-label");   
        label[i].innerText = monsterFeatureType + ":"; // T ex Color: eller Type:     

        select[i] = document.createElement("select");
        select[i].setAttribute("id", `${monsterFeatureType}-select`);

        option[i] = []; // Deklarera att option med indexet i också är en array

        // Ta fram <option> element baserat på vilka olika Features som finns i objektets array monsterFeatures
        for (let j=0;j<monsterObject.monsterFeatures.length; j++) {

            // Populera respektive SELECT med rätt FeatureTyp med hjälp av ett IF statement
            // i [0] i monsterFeatures ligger nyckeln till associerad FeatureType. T ex Green till Color. Small till Type, osv.
            if (monsterObject.monsterFeatures[j][0]==i) {
                monsterFeature = monsterObject.monsterFeatures[j][1]; // [1] = Namn på featuren
                typid = monsterObject.monsterFeatures[i][0]; // [0] = featurens TypID i monsterFeatureType arrayen. T ex 0 för Color
                option[i][j] = document.createElement("option");
                option[i][j].setAttribute("value", monsterFeature);
                option[i][j].innerText = monsterFeature;
                select[i].appendChild(option[i][j]); // Lägg den genererade optionen i select-elementet
            }     
            //console.log(option[i][j]);

        }




        
        addMonsterForm.appendChild(label[i]); // xxx
        addMonsterForm.appendChild(select[i]); // xxx

    }

    let inputAddButton = document.createElement("input");
    inputAddButton.setAttribute("id", "sub-btn");
    inputAddButton.setAttribute("class", "sub-btn");
    inputAddButton.setAttribute("type", "submit");
    inputAddButton.setAttribute("value", "Add monster"); 

    let inputEditButton = document.createElement("input");
    inputEditButton.setAttribute("id", "edit-btn");
    inputEditButton.setAttribute("class", "sub-btn");
    inputEditButton.setAttribute("type", "submit");
    inputEditButton.setAttribute("value", "Edit monster"); 

    inputAddButton.addEventListener("click", function(e){

        
        let newName = document.querySelector("#monster-name").value;

        /*
        let newColor = document.querySelector("#color-select").value;
        let newType = document.querySelector("#monster-type").value;
        */    

        monsterObject.addMonster(newName, select);
        removeAllChildNodes(main);
        monsterCards('monster'); // Ladda in monsterCards igen
        e.preventDefault();

      });

      addMonsterForm.appendChild(inputAddButton); // xxx
      addMonsterForm.appendChild(inputEditButton); // xxx  
  
}




// Ladda in alla Select Boxes i Add monster
LoadSelectBoxes();

let btn = document.querySelector('#sub-btn');
let editbtn = document.querySelector('#edit-btn');

function monsterFeatures() {

    removeAllChildNodes(monsterFeaturesDiv);

    let monsterFeature;
    let id;
    let monsterFeatureType;
    let checkbox = [];
    let label = [];
    let br = [];
    let div = [];

    for (let i=0; i<monsterObject.monsterFeatures.length; i++) {

        // Ladda enbart in Features som inte är tomma/borttagna
        // Element av typen undefined ignoreras       
        if (typeof monsterObject.monsterFeatures[i][0] !== "undefined") {
            
            monsterFeature = monsterObject.monsterFeatures[i][1];
            id = monsterObject.monsterFeatures[i][0];
            monsterFeatureType = monsterObject.monsterFeatureType[id];

            div[i] = document.createElement("div");
            div[i].setAttribute("class", "mfeatures-subdiv");

            checkbox[i] = document.createElement("input");
            checkbox[i].setAttribute("type", "checkbox");
            checkbox[i].setAttribute("class", "mfeatures-checkboxes");
            checkbox[i].setAttribute("value", i);
            checkbox[i].setAttribute("id", (monsterFeature + i));

            label[i] = document.createElement("label");
            label[i].innerHTML = `${monsterFeatureType}: <span style="color: ${monsterObject.monsterFeatures[i][2]}">${monsterFeature}</span>`;
            label[i].setAttribute("class", "mlabel");
            label[i].setAttribute("for", (monsterFeature + i));

            div[i].appendChild(checkbox[i]);
            div[i].appendChild(label[i]);

            monsterFeaturesDiv.appendChild(div[i]);

            (function(index) {           
                checkbox[i].addEventListener("click", function() {
                    // Remove feature if clicked/checked
                    monsterObject.removeFeature(i);
                    monsterFeatures(); // Run monsterFeatures function again to re-create the list
                })
            })(i)

        }
        
    }

}

// Ladda in alla monsterFeatures i Edit-funktionen
monsterFeatures();





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
/* // Kod numera inflyttad i LoadSelectBoxes för dynamisk generering
btn.addEventListener("click", function(e){

    monsterObject.addMonster();
    removeAllChildNodes(main);
    monsterCards('monster'); // Ladda in monsterCards igen
    e.preventDefault();
  });
  */

  // Listener för att växla till Edit-monster sektionen
editbtn.addEventListener("click", function(e) {

    addMonster.style.display = "none";
    editMonsters.style.display = "flex";
    e.preventDefault();

  });



  

    // Växla till Add-monster sektionen
editbtn2.addEventListener("click", function(e) {

    editMonsters.style.display = "none";  
    addMonster.style.display = "flex";

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
        li.className="monsterColorLi";

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
        li.className="monsterTypeLi";

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









