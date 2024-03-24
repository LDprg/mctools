document.getElementById("page").style.border = "2px solid red";

function getnewZutat(Name, Menge, Einheit){
    document.getElementsByClassName("ingredient-group-app-bar")[0].getElementsByClassName("v-toolbar__content")[0].getElementsByClassName("v-btn")[1].click();
    setTimeout(function(){
        let Zutaten = document.getElementsByClassName("ingredient-drag-details")[0].getElementsByTagName("div")[0].getElementsByClassName("ingredient-wrapper");
        let Zutat = Zutaten[Zutaten.length-1];

        var NameTag = Zutat.querySelectorAll("div.v-select__slot")[0].getElementsByTagName("input")[0];
        NameTag.select();
        NameTag.checkFunctionIfItsTheRealFieldName = function () { return true; }
        setTimeout(function(){
            NameTag.value = Name;
            let input = NameTag;
            let lastValue = input.value;
            let event = new Event('input', { bubbles: true });
            event.simulated = true;
            let tracker = input._valueTracker;
            if (tracker) {
                tracker.setValue(lastValue);
            }
            input.dispatchEvent(event);
        }, 0);

        var MengeTag = Zutat.querySelectorAll("div.v-text-field__slot")[0].getElementsByTagName("input")[0];
        MengeTag.select();
        MengeTag.setAttribute("value", Menge);
        MengeTag.dispatchEvent(new Event("input"));

        let EinheitTag = Zutat.querySelectorAll("div.v-select__selections")[0].getElementsByTagName("input")[0];
        EinheitTag.click();

        setTimeout(function(){
            document.querySelectorAll(".v-menu__content.menuable__content__active")[0].dispatchEvent(new Event("scroll"));
            setTimeout(function(){
                var EinheitReal = document.querySelectorAll(".v-menu__content.menuable__content__active")[0].querySelectorAll("div.v-list-item");

                EinheitReal.forEach(element => {
                    var elementEinheit = element.getElementsByClassName("v-list-item__title")[0].innerText;
                    elementEinheit = elementEinheit.replace(".", "");
                    elementEinheit = elementEinheit.trim();
                    elementEinheit = elementEinheit.toUpperCase();

                    Einheit = Einheit.replace(".", "");
                    Einheit = Einheit.trim();
                    Einheit = Einheit.toUpperCase();

                    if(elementEinheit == Einheit){
                        // console.log(Einheit);
                        element.click();
                    }
                });
            }, 0);
        }, 0);
    }, 0);
}

setTimeout(function() {
    var mcTool = document.getElementById("mcToolsRow");

    if(mcTool != null)
        mcTool.remove();

    mcTool = document.getElementsByClassName("create-recipe-editor")[0];

    var row = document.createElement("div");
    row.setAttribute("class", "row");
    row.setAttribute("id", "mcToolsRow");

    var col = document.createElement("div");
    col.setAttribute("class", "col");
    row.appendChild(col);

    var mctools = document.createElement("div");
    mctools.setAttribute("class", "mctools");
    col.appendChild(mctools);

    var inputBox = document.createElement("div");
    inputBox.setAttribute("class", "v-input v-textarea v-textarea--auto-grow v-textarea--no-resize theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--solo-flat v-text-field--filled v-text-field--is-booted v-text-field--enclosed v-text-field--outlined v-text-field--placeholder");
    mctools.appendChild(inputBox);

    var inputControl = document.createElement("div");
    inputControl.setAttribute("class", "v-input__control");
    inputBox.appendChild(inputControl);

    var inputSlot = document.createElement("div");
    inputSlot.setAttribute("class", "v-input__slot");
    inputSlot.setAttribute("role", "v-combobox");
    inputSlot.setAttribute("aria-haspopup", "listbox");
    inputSlot.setAttribute("aria-expanded", "false");
    inputSlot.style.height = "120px";
    inputControl.appendChild(inputSlot);

    var fieldset = document.createElement("fieldset");
    fieldset.setAttribute("aria-hidden", "true");
    inputSlot.appendChild(fieldset);

    var legend = document.createElement("legend");
    fieldset.appendChild(legend);

    var span = document.createElement("span");
    span.setAttribute("class", "notranslate");
    span.innerHTML = "​";
    legend.appendChild(span);

    var inputSlot2 = document.createElement("div");
    inputSlot2.setAttribute("class", "v-text-field__slot");
    inputSlot.appendChild(inputSlot2);

    var input = document.createElement("textarea");
    input.setAttribute("rows", "5");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("placeholder", "Generator Text");
    input.setAttribute("id", "GenInput");
    input.style.height = "120px";
    inputSlot2.appendChild(input);

    var button = document.createElement("button");
    button.setAttribute("class", "mx-2 pa-0 v-btn v-btn--text theme--light v-btn--outlined v-size--large");
    button.setAttribute("type", "button");
    button.style.height = "120px";
    inputBox.appendChild(button);

    var buttonSpan = document.createElement("span");
    buttonSpan.setAttribute("class", "px-2");
    buttonSpan.innerHTML = "Generate";
    button.appendChild(buttonSpan);

    mcTool.insertBefore(row, mcTool.firstChild);

    button.addEventListener("click", function() {
        var texts = document.getElementById("GenInput").value;
        texts = texts.trim();
        texts = texts.split("\n");

        for (let i = 0; i < texts.length; i++){
            let text = texts[i];
            text = text.trim();

            setTimeout(function(){
                var reg = new RegExp(/[\d]*/, "gm");
                var Menge = reg.exec(text)[0];
                Menge = Menge.trim();

                reg = new RegExp(/[^\d].*/, "gm");
                var Rest = reg.exec(text)[0];
                Rest = Rest.trim();
                Rest = Rest.split(" ");
                Einheit = Rest[0];
                Einheit = Einheit.replace(".", "");
                Einheit = Einheit.trim();

                if(Einheit.toUpperCase() == "STK")
                    Einheit = "stück";

                Rest.shift();
                Rest = Rest.join(" ");

                Name = Rest;
                Name = Name.trim();

                console.log(Name + " / " + Menge + " / " + Einheit);

                getnewZutat(Name, Menge, Einheit);
            }, i*1000);
        }
    });
} , 1000);
