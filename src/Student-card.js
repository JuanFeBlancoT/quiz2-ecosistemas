import { getDatabase, ref, set, onValue, push} from 'firebase/database';
import { transferToSilver, transferToGold} from './index.js';

export class Studentcard{
    constructor(student, indexControl){
        this.student = student;
        this.indexControl = indexControl;
    }

    render(){
        let card = document.createElement("div");
        card.className = "sutd_class";
       
        let nameStudent = document.createElement("h2");
        nameStudent.className = "stud-card-studName";
        nameStudent.innerHTML = this.student.nombre;

        let studCode = document.createElement("h4");
        studCode.className = "stud-card-code";
        studCode.innerHTML =this.student.codeS;

        let studCourse = document.createElement("h4");
        studCourse.className = document.createElement("h4");
        studCourse.innerHTML = this.student.courseS;

        let sutdParticipations = document.createElement("h5");
        sutdParticipations.className = "stud-card-numParts";
        sutdParticipations.innerHTML = this.student.participation;

        //buttons
        let increaseBtn = document.createElement("button");
        increaseBtn.innerHTML = "increase";
        increaseBtn.className = "increaseBtnId";
        increaseBtn.addEventListener("click", (e, ev) =>{ 
            this.student.participation = this.student.participation+1;
            sutdParticipations.innerHTML = this.student.participation;

            const db = getDatabase();
            const studRef = ref(db, 'students/'+this.student.id);
            const studRefSilver = ref(db, 'studentsS/'+this.student.id);
            const studRefGold = ref(db, 'studentsG/'+this.student.id);

            if(this.student.participation <5){
                set(studRef, this.student);
                set(studRefSilver, null);
            }

            if(this.student.participation == 5){
                set(studRef, null);
                set(studRefSilver, this.student);

            }else if(this.student.participation == 10){
                set(studRef, null);
                set(studRefSilver, null);
                set(studRefGold, this.student);
            }
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "delete";
        deleteBtn.className = "increaseBtnId";
        deleteBtn.addEventListener("click", (e, ev) =>{

            const db = getDatabase();
            const studRef = ref(db, 'students/'+this.student.id);
            const studRefSilver = ref(db, 'studentsS/'+this.student.id);
            const studRefGold = ref(db, 'studentsG/'+this.student.id);
            set(studRef, null);
          

            if(this.student.participation <5){
                set(studRef, null);
            }

            if(this.student.participation == 5){
                set(studRef, null);
                set(studRefSilver, null);

            }else if(this.student.participation == 10){
                set(studRef, null);
                set(studRefSilver, null);
                set(studRefGold, null);
            }
        });
  

        card.appendChild(nameStudent);
        card.appendChild(studCode);
        card.appendChild(studCourse);
        card.appendChild(sutdParticipations);
        card.appendChild(increaseBtn);
        card.append(deleteBtn);
        return card;
    }
}