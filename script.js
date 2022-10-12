

let wordMe_savedWords = [];
let wordsToLearn = [];

let char = [",", ":", ";", "-", "_", "+", ".", "|", "$", "£", "!", "*", "/", ">", "{", "}", "\n", "<", "~", "[", "]", "?", "@", "#", "%", "&", "(", ")", "^", "="];

function main(){
    let input = document.getElementById("input_para").value;

    // Test if the input box is empty or not
    if (input == "" || input == " "){
        alert("Please make sure to add your paragraph");
    }
    else{
        // Returns the string without numbers
        let without_numbers = input.split("").filter((el) => isNaN(parseInt(el)) );

        // {Search algorithm} Returns the string without the characters of the array (char)
        let without_char = [];
        for (let i = 0; i < without_numbers.length; i++) {
            for (let j = 0; j < char.length; j++) {
                if (without_numbers[i] !== char[j]){
                    without_char[i] = without_numbers[i];
                }
                else {
                    without_numbers[i] = "";
                }
            }
        }
        // Combine string characters, then cut them into words, and take the first 200 words
        wordMe_savedWords = without_numbers.join("").split(" ", 200);
    }

    // Choose unique words 
    wordMe_savedWords = wordMe_savedWords.filter((word, index) => wordMe_savedWords.indexOf(word) === index ); 
    // Passing array words to the function
    for (let i = 0; i < wordMe_savedWords.length; i++){
        show_words_Generated(wordMe_savedWords[i]);
    }
    // alphabetical_ordar(arr);
    Arabic_Translation();
    Heart_Icon();
}
document.querySelector("#generated").addEventListener("click", main);

/* Show unique words in the (generated) section */
function show_words_Generated(word){
    document.querySelector("#words_generated #btn_generated").innerHTML +=
        `<button class="words_unique center" type="button">
        <i class="gg-heart hart_icon"></i>
        <span class="text_word">${word}</span>
        <p class="text_word_arabic"></p>
        </button>`;
}

function alphabetical_ordar(arr){

}

/* Translate words into Arabic when you click on then */
function Arabic_Translation(){
    let word_click = document.querySelectorAll(".text_word");
    word_click.forEach(function (word){
        // A counter to count the number of button clicks
        let CountButtonHomeClicks = 0;
        word.onclick = async function () {
             /* When you click on the word, it increases the counter.
             * if you press more then one click, it stope increasing the words.*/
            CountButtonHomeClicks += 1;
            if (CountButtonHomeClicks == 1) {
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
            else {
                word.nextElementSibling += null;
            }
        }
    })
}

/* Show words in the (words to learn) section, and add them to LocalStorage */
function Heart_Icon(){
    let icon= document.querySelectorAll(".gg-heart");
    icon.forEach(function (icon_heart, index){
        // A counter to count the number of button clicks
        let CountButtonHomeClicks = 0;
        icon_heart.onclick = function () {
            /* When you click on the Heart Icon, it increases the counter.
             * if you press more then one click, it stope increasing the words.*/
            CountButtonHomeClicks += 1;
            if (CountButtonHomeClicks == 1){
                document.querySelector("#words_to_learn #btn_words_fav").innerHTML +=
                    `<button class="words_fav center">
                    <span class="text_word word_pupop">${icon_heart.nextElementSibling.textContent}</span>
                    <img class="bin" id="p" src="imge/dustbin.png" alt="bin"></button>`;
                // Heart icon color change
                icon_heart.style.background = "#FAFA22";
                // Add the word preceding the heart icon to the array (wordsToLearn)
                wordsToLearn.push(`${document.querySelectorAll(".hart_icon")[index].nextElementSibling.textContent}`);
                // Passing the array to function (Add_To_LocalStorage)
                Add_To_LocalStorage(wordsToLearn.sort());
                Bin_Icon();
                click_word_ToLearn();
            }
        }
    });
}

/* Add the array to LocalStorage */
function Add_To_LocalStorage(Array){
    window.localStorage.setItem("word",Array);
}
/* Remove the word from LocalStorage */
function Remove_from_LocalStorage(word){
    window.localStorage.removeItem(`${word}`);
}

/* Remove the word when pressing its Bin icon */
function Bin_Icon(){
    let click_icon = document.querySelectorAll(".bin");
    click_icon.forEach(function (icon_bin, index) {
        icon_bin.onclick = function(){
            //let word = document.querySelectorAll(".bin")[index].previousElementSibling.textContent;
            //Remove_from_LocalStorage(word);

            click_icon[index].parentElement.remove();
        }
    });
}

/* Show a popup when you click on the word in the (Words to Learn) section */
function click_word_ToLearn(){
    let click_word_pupop = document.querySelectorAll(".word_pupop");
    click_word_pupop.forEach(function (word){
        word.onclick = function(){
            window.open(`https://www.google.com/search?q=${this.textContent}+meaning`, "_blank", "width=400, height=350, left=450, top=150");
        }
    });
}
