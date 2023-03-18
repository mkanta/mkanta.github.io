// [[file:../tutoring/Common/exercises.org::*Exercises][Exercises:5]]
Array.from(document.querySelectorAll(".questionList"),
           elt => { elt.addEventListener("click",hintListener);
                    return elt;});
// Exercises:5 ends here

// [[file:../tutoring/Common/exercises.org::*Exercises][Exercises:6]]
function hintListener(evt){
    //check if there is a request from answer-request
    if(evt.target.matches("span.answer-request")){
        //this should be the div.answer in the current li
        const ansDiv=evt.target.parentElement.querySelector("div.answer");
        if(ansDiv!==null) {
            //make the answer visible
            ansDiv.classList.toggle("hiddenContent");
            //this apparently checks if the element is obscured, see
            //https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
            if(!( ansDiv.offsetWidth || ansDiv.offsetHeight || ansDiv.getClientRects().length )){
            //and scroll it into view at the bottom
                ansDiv.scrollIntoView(false);
            }
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
        //scroll into view if below bottom, how to check? see above for the
        //answer-request
        newLi.scrollIntoView(false);//bottom of newLi matches bottom of view
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
            //and scroll it into view from the bottom
            fstHidden.scrollIntoView(false);
        }
    }
    return false;
 }
// Exercises:6 ends here

// [[file:../tutoring/Common/exercises.org::*Utilities][Utilities:1]]
//a utility function to translate numbers to their latex equivalents in the requested
//precision
function toLatexPrecision(num,prec){
    let lastChar="";
    return Array.prototype.reduce.call(num.toPrecision(prec),
                                (acc,currChar)=>{
                                    switch(currChar){
                                    case " ": 
                                    case "+": return acc;
                                    case "e": lastChar="}";
                                              return acc+"\\times 10^{";
                                    default: return acc+currChar;
                                    }
                                },"")+lastChar;
}
// Utilities:1 ends here
