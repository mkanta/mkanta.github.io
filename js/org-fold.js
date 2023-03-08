// [[file:../tutoring/Common/exercises.org::*Org Fold][Org Fold:1]]
Array.from(document.querySelectorAll("div[id^='outline-container-org']"),
           itm => {itm.addEventListener("click",foldListener); return itm;});
function foldListener(evt){
    //in the current set-up for org export, the first child of a container is
    //its head. Note that children[0] has to be used rather than firstChild
    //because the latter comprises nodes as well
    //this is attached to an outline container, which always contains a head line
    //so children[0] should not be null.
    if (evt.currentTarget.children[0].contains(evt.target)){
        const target=evt.currentTarget;
        if(evt.currentTarget.classList.contains("folded")){ //unfold
            Array.from(target.children,itm => {
                if(itm.tagName==="DIV"){
                    itm.classList.add("folded");
                }
                return itm;
                });
            target.classList.remove("folded");
        } else {
            target.classList.add("folded");
        }
    }
    return false;
}
// Org Fold:1 ends here
