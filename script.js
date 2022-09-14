

let wordMe_savedWords = [];
let wordsToLearn = [];

let char = [",", ":", ";", "-", "_", "+", ".", "|", "$", "£", "!", "*", "/", ">", "{", "}", "\n", "<", "~","[", "]", "?", "@", "#", "%", "&", "(", ")", "^", "="];

function word_check() {
    let input = document.getElementById("input_para").value;

    let check = input.split("").filter(function(el) {
        return isNaN(parseInt(el));
    });

    let without_char = [];
    for (let i = 0; i < check.length; i++) {
        for (let j = 0; j < char.length; j++) {
            if (check[i] !== char[j]) {
                without_char[i] = check[i];
            }
            else {
                check[i] = "";
            }
        }
    }

    wordMe_savedWords = check.join("").split(" ", 200);

    let arr = wordMe_savedWords.filter(uniqeu_words);

    for (let i = 0; i < arr.length; i++) {
        show_words_Generated(arr[i]);
    }
    alphabetical_ordar(arr);
    click_word();
    show_words_TOLearn();
}
document.querySelector("#generated").addEventListener("click", word_check);

function uniqeu_words(word, index) {
    return wordMe_savedWords.indexOf(word) === index;
}

function show_words_Generated(word) {
    document.querySelector("#words_generated #btn_generated").innerHTML +=
        `<button class="words_unique center" type="button" id="ch">
        <p class="hart_icon" type="button">&hearts;</p>
         <span class="text_word">
              ${word}
         </span>
         <p class="text_word"></p>
         </button> `;
}

function alphabetical_ordar(arr) {
    arr.sort();
}

function click_word() {
    let word_click = document.querySelectorAll(".text_word");
    word_click.forEach(function (word) {
        word.onclick = async function () {
            const res = await fetch("https://libretranslate.com/translate", {
                method: "POST",
                body: JSON.stringify({
                    q: `${this.textContent}`,
                    source: "en",
                    target: "ar",
                    format: "text",
                    api_key: "dccf08ec-7258-48af-b0e4-71a38560cba0"
                }),
                headers: { "Content-Type": "application/json" }
            });
            let respone = await res.json();
            let arabic = respone.translatedText;
            word.nextElementSibling.innerHTML += `${arabic}`;
            console.log(arabic);
        }
    })
}

function show_words_TOLearn() {
    let icon_click = document.querySelectorAll(".hart_icon");
    icon_click.forEach(function (icon_hart, index) {
        icon_hart.onclick = function () {
            document.querySelector("#words_to_learn #btn_words_fav").innerHTML +=
                `<button class="words_fav center">
                <span class="text_word word_pupop">${icon_hart.nextElementSibling.textContent}</span>
                <img class="bin" src="imge/dustbin.png" alt="bin"></button>`;
                icon_hart.disabled = true;
                
               /*// let word = document.getElementById("ch").childNodes[3].outerText;
               // wordsToLearn[index] = word;
                //console.log(typeof(wordsToLearn));
                //console.log(wordsToLearn);
            //let btn = document.querySelectorAll(".words_unique");
           // btn.disabled = true;*/
            click_bin_icon();
            click_word_ToLearn();
        }
    });
   
}

function Add_To_LocalStorage(click){
    let word = document.getElementById("ch").childNodes[3].outerText;
    wordsToLearn = word;
    window.localStorage.setItem("",);
}

function click_bin_icon(){
    let click_icon = document.querySelectorAll(".bin");
    click_icon.forEach(function(icon_bin){
        icon_bin.onclick = function(){
            document.querySelector(".words_fav").remove();
        }
    });
}

function click_word_ToLearn(){
    let click_word_pupop = document.querySelectorAll(".word_pupop");
    click_word_pupop.forEach(function(word){
        word.onclick = function(){
            window.open(`https://www.google.com/search?q=${this.textContent}+meaning`,"_blank","width=400, height=350, left=450, top=150");
        }
    });
}
