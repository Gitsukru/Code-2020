/**
 * Kelime Örenme
 * 
 * Akis
 * ====
 *  - ekranda kelime listesi olacak, (8adet)
 *  - bir tanesi secildiginde altinda 4 secenek, cevap,(kelime) olcak. 
 *  - biri dogru 3ü yanlis
 *  - kullanici birni sececek ve cevabi kayit edecek
 *  - 8 soruyu yaptiktan 
 *          - sorular bitince "netice" butonuna tilayacak ve kaç dogru kaç yanlis yaptigini görecek (puanlari yazacak)
 * 
 * Analiz
 *  - Ekrani ikiye böl ( 70% - 30%) 70i kelime listesi 30 skor olsun 
 *  - sol tarafa kelime listesi ve kelimeler tiklanabilir 
 *  - tikladiktan sonra cevapbi sec ve siradaki kelimeyi sec
 *  - sonucu butonuna tiklayinca modal acilsin ve sonuclar gosterilsin
 * 
 * ======
 */



let quizItemTemplate = "",
   quizItemContainer = document.querySelector(".quiz-item-container"),
   userSelectedAnswerContainer = document.querySelector(".result-list-box")

let quizData = [{
      questionsId: 1,
      questions: "La table",
      answer: [{
            optC: "A",
            optT: "Masa"
         },
         {
            optC: "B",
            optT: "Bardak"
         },
         {
            optC: "C",
            optT: "tekne"
         },
         {
            optC: "D",
            optT: "Kus"
         }
      ]
   },
   {
      questionsId: 2,
      questions: "La raison",
      answer: [{
            optC: "A",
            optT: "Okyanus"
         },
         {
            optC: "B",
            optT: "Hüner"
         },
         {
            optC: "C",
            optT: "Beceri"
         },
         {
            optC: "D",
            optT: "Sebep"
         }
      ]
   },
   {
      questionsId: 3,
      questions: "Le jardin",
      answer: [{
            optC: "A",
            optT: "Mutfak"
         },
         {
            optC: "B",
            optT: "Çimen"
         },
         {
            optC: "C",
            optT: "Bahçe"
         },
         {
            optC: "D",
            optT: "Dolap"
         }
      ]
   },
   {
      questionsId: 4,
      questions: "Le tapis",
      answer: [{
            optC: "A",
            optT: "Halı"
         },
         {
            optC: "B",
            optT: "Bardak"
         },
         {
            optC: "C",
            optT: "Tablo"
         },
         {
            optC: "D",
            optT: "Top"
         }
      ]
   },
   {
      questionsId: 5,
      questions: "La mode de vie",
      answer: [{
            optC: "A",
            optT: "Daga tirmanma"
         },
         {
            optC: "B",
            optT: "yasam tarzı"
         },
         {
            optC: "C",
            optT: "Merdivenden inmek"
         },
         {
            optC: "D",
            optT: "Dönme"
         }
      ]
   },
   {
      questionsId: 6,
      questions: "La secret",
      answer: [{
            optC: "A",
            optT: "Kibir"
         },
         {
            optC: "B",
            optT: "Kelepçe"
         },
         {
            optC: "C",
            optT: "Sır"
         },
         {
            optC: "D",
            optT: "Tahta"
         }
      ]
   },
   {
      questionsId: 7,
      questions: "Apprendre",
      answer: [{
            optC: "A",
            optT: "Unutmak"
         },
         {
            optC: "B",
            optT: "Sevinmek"
         },
         {
            optC: "C",
            optT: "Kesmek"
         },
         {
            optC: "D",
            optT: "Ögrenmek"
         }
      ]
   },
   {
      questionsId: 8,
      questions: "Comprendre",
      answer: [{
            optC: "A",
            optT: "anlamak "
         },
         {
            optC: "B",
            optT: "Satmak"
         },
         {
            optC: "C",
            optT: "Ölmek"
         },
         {
            optC: "D",
            optT: "Gezmek"
         }
      ]
   },
   {
      questionsId: 9,
      questions: "Aider",
      answer: [{
            optC: "A",
            optT: "yardım etmek"
         },
         {
            optC: "B",
            optT: "tanımak"
         },
         {
            optC: "C",
            optT: "Görmek"
         },
         {
            optC: "D",
            optT: "Duymak"
         }
      ]
   },
   {
      questionsId: 10,
      questions: "Le pays",
      answer: [{
            optC: "A",
            optT: "Il"
         },
         {
            optC: "B",
            optT: "Sınır"
         },
         {
            optC: "C",
            optT: "Ülke"
         },
         {
            optC: "D",
            optT: "Uzay"
         }
      ]
   }
]


let correctAnswers = [{
      questionsId: 1,
      correctAnswer: "A"
   },
   {
      questionsId: 2,
      correctAnswer: "D"
   },
   {
      questionsId: 3,
      correctAnswer: "C"
   },
   {
      questionsId: 4,
      correctAnswer: "A"
   },
   {
      questionsId: 5,
      correctAnswer: "B"
   },
   {
      questionsId: 6,
      correctAnswer: "C"
   },
   {
      questionsId: 7,
      correctAnswer: "D"
   },
   {
      questionsId: 8,
      correctAnswer: "A"
   },
   {
      questionsId: 9,
      correctAnswer: "A"
   },
   {
      questionsId: 10,
      correctAnswer: "C"
   }
]

/**
 * kullanicinin sectifgi cevaplari tutacaggimiz degisken
 */
let userSelectedAnswer = [];




quizData.map(questionsItem => {
   quizItemTemplate += `<div class="card">
   <button class="btn btn-primary btn-lg btn-block mb-3" type="button" data-toggle="collapse"
       data-target="#collapse-${questionsItem.questionsId}" aria-expanded="true" aria-controls="collapseOne">
       ${questionsItem.questions}
   </button>
   <div id="collapse-${questionsItem.questionsId}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
       <div class="card-body d-flex ">
       ${
         questionsItem.answer.map(answerOptions => `
         <div class="flex-fill">
             <input class="form-check-input" type="radio" name="exampleRadios" id="opt-${questionsItem.questionsId}-${answerOptions.optC}"
               onchange="setAnswer('${questionsItem.questionsId}', '${answerOptions.optC}', '${answerOptions.optT}')"
             >
             <label class="form-check-label btn btn-info d-block mx-2" for="opt-${questionsItem.questionsId}-${answerOptions.optC}">
                 <span class="badge badge-light mr-2">${answerOptions.optC}</span>
                 ${answerOptions.optT}
             </label>
         </div>`
          ).join("")
      }
       </div>
   </div>
</div>`
})

quizItemContainer.innerHTML = quizItemTemplate;

function setAnswer(id, sign, name) {
   let newObj = {
      questionId: parseInt(id),
      answerSign: sign,
      answerName: name
   }
   if (userSelectedAnswer.filter(item => item.questionId === parseInt(id)).length == 0) {
      userSelectedAnswer.push(newObj);
   } else {
      userSelectedAnswer.filter(item => item.questionId === newObj.questionId)[0].answerSign = sign;
      userSelectedAnswer.filter(item => item.questionId === newObj.questionId)[0].answerName = name;
   }
   
   
   console.log(userSelectedAnswer);

}