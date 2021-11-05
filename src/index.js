import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, push} from 'firebase/database';

import { getFirebaseConfig } from './firebase-config';
import {Studentcard} from './Student-card';

// Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);
//getUIElements
//textfields
const username = document.getElementById("username");
const codeStd = document.getElementById("codeStd");
const courseStd = document.getElementById("courseStd");
//buttons
const registraBtn = document.getElementById("registrar_btn");

//lists
const noBonusStudentsList = document.getElementById("no_bonus_stud_list");
const silverBonusStudentsList = document.getElementById("silver_stud_list");
const goldBonusStudentsList = document.getElementById("gold_stud_list");
//functions


function registrarUsuario(student){
    // Obtener la base datos
    const db = getDatabase();
    const newStudRef = push(ref(db, 'students'));
    student["id"] = newStudRef.key;

    //const dbRef = ref(db, 'students/' + student.nombre);
    
    // escribir un nuevo usuario
    set(newStudRef, student);
}

const registroEvento = (e, event) => {
    const student = {
        nombre: username.value,
        codeS: codeStd.value,
        courseS: courseStd.value,
        participation: 0
    }
    console.log(student);
    registrarUsuario(student);
}

function getStudents(){
    const db = getDatabase();
    const dbRef = ref(db, 'students');
    const dbRefS = ref(db, 'studentsS');
    const dbRefG = ref(db, 'studentsG');

    onValue(dbRef, (referenceValue)=>{
        const data = referenceValue.val();
        if(data){
            console.log(data);
            updateStudentsList(data);
        }
       
    });

    onValue(dbRefS, (referenceValue)=>{
        const data = referenceValue.val();
        if(data){
            console.log(data);
            updateStudentsListS(data);
        }
       
    });

    onValue(dbRefG, (referenceValue)=>{
        const data = referenceValue.val();
        if(data){
            console.log(data);
            updateStudentsListG(data);
        }
       
    });
}

//no bonus
function updateStudentsList(data){
    if(data){
    noBonusStudentsList.innerHTML="";
    //returns keys from an object
    Object.keys(data).forEach((ke,v)=>{
        console.log(ke);
        const card = new Studentcard(data[ke], this)
        noBonusStudentsList.appendChild(card.render());
    })
    }else{
        noBonusStudentsList.innerHTML ="No hay estudantes en esta categoría"
    }
}

//silver bonus
function updateStudentsListS(data){
    if(data){
        silverBonusStudentsList.innerHTML="";
    //returns keys from an object
    Object.keys(data).forEach((ke,v)=>{
        console.log(ke);
        const card = new Studentcard(data[ke], this)
        silverBonusStudentsList.appendChild(card.render());
    })
    }else{
        silverBonusStudentsList.innerHTML ="No hay estudantes en esta categoría"
    }
}

//gold bonus
function updateStudentsListG(data){
    if(data){
        goldBonusStudentsList.innerHTML="";
    //returns keys from an object
    Object.keys(data).forEach((ke,v)=>{
        console.log(ke);
        const card = new Studentcard(data[ke], this)
        goldBonusStudentsList.appendChild(card.render());
    })
    }else{
        goldBonusStudentsList.innerHTML ="No hay estudantes en esta categoría"
    }
}



registraBtn.addEventListener("click", registroEvento);
getStudents();
