// [[file:../tutoring/Common/exercises.org::*Exercises][Exercises:5]]
Array.from(document.querySelectorAll(".questionList"),
           elt => { elt.addEventListener("click",hintListener);
                    return elt;});
// Exercises:5 ends here

// [[file:../tutoring/Common/exercises.org::*Exercises][Exercises:6]]
function hintListener(evt){
    //check if there is a request from answer-request
    if(evt.target.matches("span.answer-request")){
        const ansDiv=evt.currentTarget.querySelector("div.answer");
        if(ansDiv!==null) {
            ansDiv.classList.toggle("hiddenContent");
         }
        return false;
    }
    //check if there is a request from more-request
    if(evt.target.matches("span.more-request")){
        //where to get the function? from the dataset
        //add a list element to currentTarget
        const newLi=document.createElement("li");
        newLi.innerHTML=getMoreFunction(evt.target.dataset.call)();
        evt.currentTarget.appendChild(newLi);
        //run mathjax on this
        MathJax.typesetPromise([evt.currentTarget]);
        return false;
    }
    //look for the <li> where the event came from
    const target = Array.from(evt.currentTarget.children).find( c => c.contains(event.target));
    //get the hint list, first try if there is a hidden one
    const hintList=target.querySelector("ol.hiddenHintList");
    if(hintList!==null){//hide individual list elements
        const hints=hintList.querySelectorAll("li");
        Array.prototype.slice.call(hints,1).map(
            li => {li.classList.add("hiddenHint"); return li;});
        hintList.classList.add("partialHintList");
        hintList.classList.remove("hiddenHintList");
    } else {
        //no hiddenHintList, try to find a partialHintList
        const partials=target.querySelector("ol.partialHintList");
        //target may be a sublist that doesn't contain hints, do nothing
        if(partials===null) return false;
        //try to get a list element of class hiddenHint
        const fstHidden=partials.querySelector("li.hiddenHint");
        if(fstHidden===null){
            //no more hiddenHints, reset the list back to everything hidden
            partials.classList.remove("partialHintList");
            partials.classList.add("hiddenHintList");
        } else {
            //make the hint visible
            fstHidden.classList.remove("hiddenHint");
        }
    }
    return false;
 }
// Exercises:6 ends here
