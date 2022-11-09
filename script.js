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
let monsterSelects = document.querySelector(".monster-selects"); // Add Monster Selectbox DIV
let inputAddButton= document.querySelector("#sub-btn"); // Add Monster Selectbox DIV

let editFeatureTypeSelect = document.querySelector("#edit-ft-select"); // Add Edit-section Feature Type Selectbox
let editFeatureName = document.querySelector("#edit-ft-name"); // Feature Name input field
let editFeatureSubmit = document.querySelector("#edit-btn3"); // Add new feature submit button
let editColorCode = document.querySelector("#edit-ft-ccode"); // Add new feature Color Code

// Dessa används främst i LoadSelectBoxes() funktionen till olika selectboxar
let select = []; // Deklarera en select array i GLOBAL SCOPE
let option = []; // Deklarera en option array i GLOBAL SCOPE
let label = []; // Deklarera en label array i GLOBAL SCOPE
let img = document.querySelector("#monster-image"); // Add new monster image url (in nput field)

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
            type: 'Mid',
        },
        {
            name: 'Crawler',
            color: 'Green',
            type: 'Small',
        },
        {
            name: 'Orb',
            color: 'Brown',
            type: 'Mid',
        },
       /*  editMonsterapperance: function() {
        }, */
    ],
    filteredMonsters: [{}],

 /* --------Funktion för att lägga till monster samt kolla så inte användaren lägger till dubletter------- */
    addMonster: function(newName, select, img) {
        
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

      
        if(duplicate!==-1) { alert('Monstret finns redan! Välj ett annat namn!'); }
        else if(newName.length === 0) {
            alert('Monstret måste ha ett namn!');

        }
         else {


            let feature;
            let newMonster;
            newMonster = { name: newName } // Lägg in det nya monstrets namn

            // Loopa igenom monsterFeatureType för att hämta alla selectade FeatureType värden
            for(let i=0; i<monsterObject.monsterFeatureType.length; i++) {
                feature = this.monsterFeatureType[i].toLowerCase(); // FeatureType konvertering från VERSALER till gemener
                newMonster[feature] = select[i].value; // Lägg in de VALUES som selectats    
            }

            newMonster['img'] = img; // the image src (url or local filepath) 

       // Pusha det nya monsterObjektet till monsterObject.monster Arrayen.
       this.monster.push(newMonster);
        // Nollställ monster-name inför nästa inlägg
        document.querySelector("#monster-name").value = "";

    

        showMonsterColors();
        showMonsterTypes();

            console.log(monsterObject.monster);

        }

    },
    // Method to remove monster feature
    removeFeature: function(id) {
       this.monsterFeatures[id] = []; // Reset feature to zero/undefined

    }, 
    // Method to add monster feature
    addFeature: function(feature, ftid, colorcode) {
    
        let featureArr = [];
        featureArr[0] = Number(ftid); // Feature Type ID converted to number
        featureArr[1] = feature; // Feature Name
        featureArr[2] = colorcode; // Feature Color Code

        this.monsterFeatures.push(featureArr); // Push new feature to monsterFeatures Array
        
     },    

    monsterFeatures: [],
    monsterFeatureType: ['Color','Type', 'Weapon'],

}

// Diverse DEFAULT-VÄRDEN till monsterFeatures och MonsterFeatureTypes.
// Color features type of feature as id (linked to item in monsterFeatureType Array)
// 0 = Feature Id. 1 = Feature Name. 2 = color code.
monsterObject.monsterFeatures[0] = [];
monsterObject.monsterFeatures[1] = [];
monsterObject.monsterFeatures[2] = [];
monsterObject.monsterFeatures[3] = [];
monsterObject.monsterFeatures[4] = [];
monsterObject.monsterFeatures[5] = [];
monsterObject.monsterFeatures[6] = [];
monsterObject.monsterFeatures[7] = [];
monsterObject.monsterFeatures[8] = []; // ny temporär
monsterObject.monsterFeatures[9] = []; // ny temporär
monsterObject.monsterFeatures[10] = []; // ny temporär
monsterObject.monsterFeatures[11] = []; // XXL

// Feature-Typ nycklar (0 = Color, 1 = Typ osv)
monsterObject.monsterFeatures[0][0] = 0; // Yellow
monsterObject.monsterFeatures[1][0] = 0; // Pink
monsterObject.monsterFeatures[2][0] = 0; // Brown
monsterObject.monsterFeatures[3][0] = 0; // Black
monsterObject.monsterFeatures[4][0] = 0; // Green

monsterObject.monsterFeatures[5][0] = 1; // Small
monsterObject.monsterFeatures[6][0] = 1; // Mid
monsterObject.monsterFeatures[7][0] = 1; // Large
monsterObject.monsterFeatures[11][0] = 1; // XXL

monsterObject.monsterFeatures[8][0] = 2; // Railrun
monsterObject.monsterFeatures[9][0] = 2; // Shotgun
monsterObject.monsterFeatures[10][0] = 2; // Rocket Launcher

// Feature namn
monsterObject.monsterFeatures[0][1] = 'Yellow';
monsterObject.monsterFeatures[1][1] = 'Pink';
monsterObject.monsterFeatures[2][1] = 'Brown';
monsterObject.monsterFeatures[3][1] = 'Black';
monsterObject.monsterFeatures[4][1] = 'Green';

monsterObject.monsterFeatures[5][1] = 'Small';
monsterObject.monsterFeatures[6][1] = 'Mid';
monsterObject.monsterFeatures[7][1] = 'Large';
monsterObject.monsterFeatures[11][1] = 'XXL';

monsterObject.monsterFeatures[8][1] = 'Railgun'; // ny temporär
monsterObject.monsterFeatures[9][1] = 'Shotgun';  // ny temporär
monsterObject.monsterFeatures[10][1] = 'Rocket Launcher'; // ny temporär

// Färger (vit för icke-färg features)
monsterObject.monsterFeatures[0][2] = '#ffff00';
monsterObject.monsterFeatures[1][2] = '#ff00ff';
monsterObject.monsterFeatures[2][2] = '#800000';
monsterObject.monsterFeatures[3][2] = '#000000';
monsterObject.monsterFeatures[4][2] = '#00ff00';
monsterObject.monsterFeatures[5][2] = '#ffffff';
monsterObject.monsterFeatures[6][2] = '#ffffff';
monsterObject.monsterFeatures[7][2] = '#ffffff';
monsterObject.monsterFeatures[8][2] = '#ffffff'; // ny temporär 'Railgun
monsterObject.monsterFeatures[9][2] = '#ffffff'; // ny temporär Shotgun
monsterObject.monsterFeatures[10][2] = '#ffffff'; // ny temporär Rocket Launcher
monsterObject.monsterFeatures[11][2] = '#ffffff'; // XXL



function LoadSelectBoxes() {

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
           


        }


        monsterSelects.appendChild(label[i]); // xxx
        monsterSelects.appendChild(select[i]); // xxx

    }


    function loadFeatureTypeSelectBox() {

        // Ta fram <option> element baserat på vilka olika Features som finns i objektets array monsterFeatureTypes
        // Använd map() för att skapa en array där <option> läggs till tillsammans med FeatureType namn.
       
        // Med Arrow-Function och bara value: let option = monsterObject.monsterFeatureType.map(n => `<option value="${n}">${n}</option>`);

        let option = monsterObject.monsterFeatureType.map(function(value, index) {
            return `<option value=${index}>${value}</option>`;
        });


        let html = option.join(''); // Slå ihop arrayens olika element till en ensam sträng

        // Lägg in den färdiga strängen html mellan <select> och </select>
        editFeatureTypeSelect.innerHTML = html;

    }

    loadFeatureTypeSelectBox();

    /*

    // DYNAMISK CREATE AV DE 2 SUBMIT-KNAPPARNA för ett gammalt scenario

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

    inputAddButton.addEventListener("click", function(e) {

        let newName = document.querySelector("#monster-name").value;


        monsterObject.addMonster(newName, select);
        removeAllChildNodes(main);
        monsterCards('monster'); // Ladda in monsterCards igen
        e.preventDefault();

      });

      addMonsterForm.appendChild(inputAddButton); // xxx
      addMonsterForm.appendChild(inputEditButton); // xxx

      */


        // Listener för att Adda-monster
        inputAddButton.addEventListener("click", function(e) {
            

            let newName = document.querySelector("#monster-name").value;

            monsterObject.addMonster(newName, select, img.value);

            removeAllChildNodes(main);
            monsterCards('monster'); // Ladda in monsterCards igen

                       // Stoppa default event
                       e.preventDefault();

                       // Detta löser bugg med 2+ onödiga alert-popups. Vetefan hur. LOL.
                       e.stopImmediatePropagation();
       

        });

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
                    
                    // Töm monsterSelects Divven
                    removeAllChildNodes(monsterSelects);

                    // Ladda in alla Select Boxes i add-monster-form igen så att ändringarna syns
                    LoadSelectBoxes();

                })
            })(i)

        }
        
    }

}

// Ladda in alla monsterFeatures i Edit-funktionen
monsterFeatures();






// Funktion för att ta bort samtliga barn-noder i valfritt container-element
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}





// Listener för att växla till Edit-monster sektionen
editbtn.addEventListener("click", function(e) {

    addMonster.style.display = "none";
    editMonsters.style.display = "flex";
    e.preventDefault();

  });


  
// Listener för att lägg till new Feature med monsterObject.addFeature metoden
editFeatureSubmit.addEventListener("click", function(e) {

     // Stoppa default event
     e.preventDefault();

     e.stopImmediatePropagation();

   let ftid = editFeatureTypeSelect.value; // Id på vald Feature Typ (selectbox)
   let feature = editFeatureName.value; // Namn-input-fältet
   let colorcode = editColorCode.value; // Color code input-fältet.

   // IF SATS med indexOf() funktionen, för att:
   // 1. ta reda på om det redan finns en Feature vid valt namn och om så är fallet stoppa inlägget.
   // 2. ta reda på om input-fältet är tomt, och isåfall stoppa inlägget.
   let duplicate = monsterObject.monsterFeatures.indexOf(feature);

   if(duplicate!==-1) { alert('En Feature med det namnet finns redan. Välj ett annat namn!');
   } else if(feature.length === 0) {

            alert('Du har inte angivit något namn på Featuren!');

    } else {

        monsterObject.addFeature(feature, ftid, colorcode); 
    
        // Töm monster-selects SelectBox Div
        removeAllChildNodes(monsterSelects);

        // Ladda in alla Select Boxes i Add monster pånytt
        LoadSelectBoxes();  

        // Ladda in alla monsterFeatures i Edit-funktionen pånytt
        monsterFeatures();

        // Töm Feature Name fält
        editFeatureName.value = "";

    }

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

    
    for (let i = 0; i < monsterObject[monsterList].length; i++) {

        let article = document.createElement("article");
        article.className="monsterInfoArticle";
        let h4 = document.createElement("h4");
        h4.className="monsterInfoTitle";
        let ul = document.createElement("ul");
        ul.className = "monsterInfo";
        let li;

        // Loopar igenom varje enskilt key-value par med Object.keys och .forEach
        // T ex monsterObject.monster[0]   color: 'Yellow'
        /* forEach betyder helt enkelt bara att vi förVarje inlägg/rad vi passerar  
        (t ex color: 'Yellow' följt av nästa rad med type: 'Small') kör viss kod,
        i vårat fall samlar vi varje rads innehåll i <li> och appendar sen dem till ett <ul> element */
        Object.keys(monsterObject[monsterList][i]).forEach(key => {
        
            // Hämta inte namn-raden som <li>
            if (key!=='name' && key!=='img') {
                li = document.createElement("li");
                li.innerHTML = `${key}: ${getFeatureColor(monsterObject[monsterList][i][key])}`;
                ul.appendChild(li);
            }
        });

        // Object.keys returnerar en Array med samtliga nycklar i objektet. I detta fall t ex color, type osv.
        // Med color, type osv så kan vi accessa innehållet i dessa nycklar med: monsterObject.monster[i][key]
        // Ett exempel vorre att monsterObject.monster[0][key] motsvarar Basilisk eller Pink eller Small.
        // Nämner vi bara key så motsvarar det nyckeln... t ex color eller type.
        // Att skriva monsterObject.monster[i][key] kan t ex i en monster-rad [i] motsvara att skriva monsterObject.monster[1]['color']
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

        // Lägg namnet på monstret i en H4 rubrik
        h4.innerText = monsterObject[monsterList][i]['name'];

        

        main.appendChild(article); // Lägg in <article> i <main>
        article.appendChild(h4); // Lägg in <h4> i <article>
        article.appendChild(ul); // Lägg in <ul> i <article> efter <h4>

    }

    return true;

}

// Färger lagras i monsterObject.monsterFeatures[index][2]
// Hämta färg med hjälp av Feature-namnet ( t ex Pink) och formatera med HTML <span> 
// Value kan i detta fall vara t ex Pink eller Yellow
// Med hjälp av en for loop letar vi upp det ställe valuen förekommer på, och plockar färg [2] därifrån.
function getFeatureColor(value) {  
    let feature;
    let key;  
    let color;
    for (let i=0; i<monsterObject.monsterFeatures.length;i++) {
        feature = monsterObject.monsterFeatures[i][1];
        if (value==feature) { color = monsterObject.monsterFeatures[i][2]; }
    }
    return `<span style="color: ${color};">${value}</span>`;
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
                filterMonsters('color', value);filterMonsters
                
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

        (function(index) {
            li.addEventListener("click", function() {
                filterMonsters('type', value);
               })
       })(index)

        mtypes.append(li);
	});
}

showMonsterTypes();
showMonsterColors();











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
        monsterObject.filteredMonsters = filterMonstersByType(feature);
    } else if (key=="color") {
    monsterObject.filteredMonsters = filterMonstersByColor(feature);
    }

    // Kör monsterCards funktionen med hämtning från monsterObject.filteredMonsters 
    // istället för monsterObject.monster
    monsterCards('filteredMonsters');

}









